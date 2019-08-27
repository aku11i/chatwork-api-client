const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const ejs = require("ejs");
const pascalCase = require("pascal-case");
const prettier = require("prettier");
const { json2ts } = require("json-ts");

const lang = "ja";

const ramlStr = fs.readFileSync(
  path.join(__dirname, "api", "RAML", `api-${lang}.raml`),
  { encoding: "utf8" }
);

const ramlData = yaml.safeLoad(prettier.format(ramlStr, { parser: "yaml" }));

const generateMethodName = (method, uri) => {
  return pascalCase([method, uri.replace(/\/{.*_id}/, "")].join("_"));
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
  const name = generateMethodName(method, uri);

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

const interfaces = prettier.format(
  paramInterfaces + responseInterfaces.join("\n"),
  {
    parser: "typescript"
  }
);

console.log(interfaces);

fs.writeFileSync(path.join(__dirname, "src", "interfaces.ts"), interfaces);
