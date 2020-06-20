import { flatObjectProperties } from "./utils";
import { BuildData } from "./typings";
import { getTypeString } from "./typeTemplates";

function getArguments({ uriParams }: BuildData) {
  return (uriParams as string[]).map(
    (uriParam) => `.arguments("<${uriParam}>")`,
  );
}

function getOptions({ param }: BuildData) {
  return flatObjectProperties(param).map((prop) => {
    let typeString = getTypeString(prop).replace(/"/g, "");
    if (typeString === "Buffer") typeString = "string";

    if (prop.required) {
      return `.requiredOption("--${prop.name} <${prop.name}>", "<${typeString}> <required> ${prop.description}")`;
    } else {
      return `.option("--${prop.name} <${prop.name}>", "<${typeString}> ${prop.description}")`;
    }
  });
}

function getAction({ uriParams, param, functionName }: BuildData) {
  const args = [...uriParams, "cmd"].join(", ");
  const params = flatObjectProperties(param);
  const paramStr = `{ ${params.map((param) => param.name!).join(", ")} }`;

  const functionParams = uriParams.length
    ? `${uriParams.join(", ")}${params.length ? `, ${paramStr}` : ""}`
    : `${params.length ? paramStr : ""}`;

  return `.action((${args}) =>{
    const { api_token, format } = cmd;
    if(api_token) {
        api.apiToken = api_token;
    }
    if(cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const ${paramStr} = cmd;

    api.${functionName}(${functionParams}).then((response) => {
        printResult(response, format);
    }).catch((e) => {
        printError(e);
        process.exit(1);
    });
    })`;
}

export function getCliHeader() {
  return `
    import { program } from 'commander';
    import ChatworkApi from '.';
    import { readFileSync } from 'fs';

    const packageJson = require("../package.json");
    program.version(packageJson.version);

    type PrintFormat = 'table' | 'json';

    function printResult(response: any, format: PrintFormat) {
        switch(format) {
          case 'table': {
            console.table(response);
            break;
          }
          case 'json': {
            console.log(JSON.stringify(response, undefined, 2));
            break;
          }
        }
    }

    function printError(error: Error) {
        console.error('Error: ' + error.message);
    }

    const api = new ChatworkApi(process.env.CHATWORK_API_TOKEN);
    `;
}

export function getCommand(buildData: BuildData) {
  const { commandName, description } = buildData;

  const args = getArguments(buildData).join("\n");
  const options = getOptions(buildData).join("\n");
  const action = getAction(buildData);

  return `
    program.command("${commandName}")
      .description("${description}")
      .option("--api_token <api_token>", "Chatwork API Token")
      .option("--format <format>", '<table|json> Specify the result format.', "table")
      ${args}
      ${options}
      ${action}
    `;
}

export function getCliFooter() {
  return `
    program.parse(process.argv);
    `;
}
