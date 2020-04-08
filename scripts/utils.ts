import camelCase = require("camelcase");
import pascalCase = require("pascal-case");
import paramCase = require("param-case");

export type Property = {
  name?: string;
  description?: string;
  types: string;
  enums?: string[];
  children?: Property[];
  arrayProp?: Property;
  required?: boolean;
};

export function getParamsFromUri(uri: string) {
  return uri
    .split("/")
    .filter((str) => str.match(/^\$\{.*\}$/))
    .map((str) => str.replace("${", "").replace("}", ""));
}

export function getFunctionName(method: string, uri: string) {
  uri = uri.replace(/s\/\$\{[a-z_]*\}/g, "_").replace(/\//g, "_");

  if (method === "POST") {
    uri = uri.replace(/s$/, "");
  }

  return camelCase(`${method}_${uri}`);
}

export function getParamTypeName(method: string, uri: string) {
  return pascalCase.pascalCase(getFunctionName(method, uri) + "Param");
}

export function getResponseTypeName(method: string, uri: string) {
  return pascalCase.pascalCase(getFunctionName(method, uri) + "Response");
}

export function getCommandName(method: string, uri: string) {
  return paramCase.paramCase(getFunctionName(method, uri));
}

export function hasProp({ types, children, arrayProp }: Property) {
  if (types !== "object") return true;
  return Boolean(children?.length);
}

export function isChildrenRequired({ children }: Property) {
  return Boolean(children?.some((child) => child.required));
}
