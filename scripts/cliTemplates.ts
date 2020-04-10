import { flatObjectProperties } from "./utils";
import { BuildData } from "./typings";

function getArguments({ uriParams }: BuildData) {
  return (uriParams as string[]).map(
    (uriParam) => `.arguments("<${uriParam}>")`,
  );
}

function getOptions({ param }: BuildData) {
  return flatObjectProperties(param).map((prop) =>
    prop.required
      ? `.requiredOption("--${prop.name} <${prop.name}>", "<${prop.types}> <required> ${prop.description}")`
      : `.option("--${prop.name} <${prop.name}>", "<${prop.types}> ${prop.description}")`,
  );
}

function getAction({ uriParams, param, functionName }: BuildData) {
  const args = [...uriParams, "cmd"].join(", ");
  const params = flatObjectProperties(param);
  const paramStr = `{ ${params.map((param) => param.name!).join(", ")} }`;

  const functionParams = uriParams.length
    ? `${uriParams.join(", ")}${params.length ? `, ${paramStr}` : ""}`
    : `${params.length ? paramStr : ""}`;

  return `.action((${args}) =>{
    const ${paramStr} = cmd;
    const { api_token } = cmd;
    if(api_token) {
        api.apiToken = api_token;
    }
    api.${functionName}(${functionParams}).then((response) => {
        printResult(response, "json");
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

    type PrintType = 'json';

    function printResult(response: any, printType: PrintType) {
        console.log(JSON.stringify(response, undefined, 2));
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
