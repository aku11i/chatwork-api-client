const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const ejs = require("ejs");
const camelCase = require("camelcase");
const pascalCase = require("pascal-case");
const prettier = require("prettier");
const { json2ts } = require("json-ts");

const LANG = "ja";
const CHATWORK_URL = "https://api.chatwork.com/v2";

const ramlStr = fs.readFileSync(
  path.join(__dirname, "api", "RAML", `api-${LANG}.raml`),
  { encoding: "utf8" }
);

const ramlData = yaml.safeLoad(prettier.format(ramlStr, { parser: "yaml" }));

const generateInterfaceName = (method, uri) => {
  return pascalCase(
    [method, uri.replace(/{/g, "_with_").replace(/}/g, "")].join("_")
  );
};

const getQueryParameters = (queryParameters = {}) => {
  return Object.keys(queryParameters).map(name => ({
    ...queryParameters[name],
    name
  }));
};

const getResponses = (responses = {}) => {
  if (!responses["200"]) return;
  const example = responses["200"]["body"]["application/json"]["example"];
  return example ? example.replace(/^\|/, "") : undefined;
};

const parseMethod = (method, api, uri) => {
  const { description, queryParameters, responses, is } = api;
  const name = generateInterfaceName(method, uri);
  const funcName = camelCase(name);
  const funcParams = [];
  if (uri.includes("{room_id}")) funcParams.push("room_id");
  if (uri.includes("{message_id}")) funcParams.push("message_id");
  if (uri.includes("{task_id}")) funcParams.push("task_id");
  if (uri.includes("{file_id}")) funcParams.push("file_id");
  if (uri.includes("{request_id}")) funcParams.push("request_id");
  const funcParamsWithTypes = funcParams.map(p => p + ": string");

  const funcParam = funcName + "Param";
  const funcParamWithTypes = funcName + "Param: " + name + "Param";

  const params = getQueryParameters(queryParameters);
  params.forEach(param => {
    if (param.type === "integer") param.type = "number";
    if (param.enum) param.type = `'${param.enum.join(`'|'`)}'`;
    if (param.displayName) {
      param.displayName = param.displayName.replace(/\n/g, "");
    }
  });

  const res = getResponses(responses);

  return {
    method,
    name,
    funcName,
    funcParams,
    funcParamsWithTypes,
    funcParam,
    funcParamWithTypes,
    api,
    uri,
    params,
    res,
    description: description
      ? description.replace(/^\|\s+/, "").replace(/\n/g, "")
      : ""
  };
};

const parseEndpoint = (api, uri) => {
  return Object.keys(api)
    .filter(method => method.match(/GET|POST|PUT|DELETE/))
    .map(method => parseMethod(method, api[method], uri));
};

const parseApi = (ramlData, prefix = "") => {
  return Object.keys(ramlData)
    .filter(key => key.match(/^\//))
    .map(uri => {
      const api = ramlData[uri];
      return [
        ...parseApi(api, prefix + uri),
        ...parseEndpoint(api, prefix + uri)
      ];
    })
    .reduce((pre, cur) => [...pre, ...cur], []);
};

const data = parseApi(ramlData);
// console.log(data);

const responseInterfaces = data
  .filter(d => d.res)
  .map(d =>
    json2ts(d.res, {
      rootName: d.name + "Response",
      prefix: ""
    })
  );

const paramInterfaces = ejs.render(
  `
<% data.forEach(d => { %>
/**
 * <%- d.description %>
 */
interface <%- d.name %>Param {
  <% d.params.forEach(param => { %>
  /** <%- param.displayName %> */
  <%- param.name %>: <%- param.type %>
  <% }); %>
}
<% }); %>
  `,
  { data: data.filter(d => d.params) }
);

const apiFunctions = ejs.render(
  `
export default class ChatworkApi {

  constructor(private api_token: string){}


  <% data.forEach(d => { %>
  /**
   * <%- d.description %>
   */
  async <%- d.funcName %>(<%- [...d.funcParamsWithTypes, d.funcParamWithTypes].join(', '); %>) {
    <% if(d.method === 'GET' || d.method === 'DELETE') { %>
    const {data} = await axios.<%- d.method.toLowerCase() %>(\`${CHATWORK_URL}<%- d.uri.replace(/{/g, '\${') %>\`, { params: <%- d.funcParam %>, headers: { 'X-ChatWorkToken': this.api_token }});
    <% } else if(d.method === 'POST' || d.method === 'PUT') { %>
    const {data} = await axios.<%- d.method.toLowerCase() %>(\`${CHATWORK_URL}<%- d.uri.replace(/{/g, '\${') %>\`, <%- d.funcParam %>, { headers: { 'X-ChatWorkToken': this.api_token }});
    <% } %>
    return data;
  }
  <% }); %>
}
`,
  { data }
);

const importData = `
import axios from 'axios';
`;

const tsData = (
  importData +
  apiFunctions +
  paramInterfaces +
  responseInterfaces.join("\n")
)
  .replace(/interface/g, "export interface")
  .replace(/function/g, "export function");

const prettifiedTsData = prettier.format(tsData, {
  parser: "typescript"
});

// console.log(prettifiedTsData);

fs.writeFileSync(path.join(__dirname, "src", "api.ts"), prettifiedTsData);
