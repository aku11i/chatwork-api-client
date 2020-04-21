import {
  Property,
  getParamTypeName,
  getResponseTypeName,
  getFunctionName,
  getCommandName,
  getParamsFromUri,
} from "./utils";

import fs = require("fs");
import path = require("path");
import prettier = require("prettier");

import EndPoints = require("./endPoints.json");

const PrettierConfig = require("../.prettierrc.json");

function log(...args: any[]) {
  console.log(
    ...args.map((v) =>
      prettier.format(JSON.stringify(v), { ...PrettierConfig, parser: "json" }),
    ),
  );
}

export function getPropertyType(type: string) {
  if (type === "integer") return "number";
  if (type === "boolean") return "0|1";
  return type;
}

export function queryParameterToProp(name: any, data: any): Property {
  return {
    name,
    description: data.displayName.trim(),
    types: getPropertyType(data.type),
    enums: data.enum,
    required: data.required,
  };
}

export function queryParametersToProp(queryParameters: any): Property {
  const properties = Object.entries(queryParameters).map(([name, data]) =>
    queryParameterToProp(name, data),
  );
  return {
    types: "object",
    children: properties,
  };
}

export function schemaPropertyToProperty(
  property: any,
  name: string,
  required = true,
): Property {
  const children =
    property.type === "object"
      ? Object.entries(property.properties).map(([name, property]) =>
          schemaPropertyToProperty(property, name),
        )
      : undefined;

  const arrayProp =
    property.type === "array"
      ? schemaPropertyToProperty(property.items[0], name)
      : undefined;

  return {
    name,
    types: getPropertyType(property.type),
    enums: property.enum,
    children,
    arrayProp,
    required,
  };
}

export function responseSchemaToObjectProp(schema: any): Property {
  const isRequired = (name: string) =>
    Array.isArray(schema.required) && schema.required.includes(name);

  const children = Object.entries(schema.properties).map(([name, property]) =>
    schemaPropertyToProperty(property, name, isRequired(name)),
  );
  return {
    types: "object",
    children,
  };
}

export function responseSchemaToArrayProp(schema: any): Property {
  return {
    types: "array",
    arrayProp: rootResponseSchemaToProp(schema.items[0]),
  };
}

export function rootResponseSchemaToProp(schema: any): Property {
  return schema.type === "array"
    ? responseSchemaToArrayProp(schema)
    : responseSchemaToObjectProp(schema);
}

export function responseExampleToProps(example: any): Property {
  const children = Object.entries(example).map(([name, value]) => ({
    name,
    description: "",
    types: typeof value,
  }));

  return {
    types: "object",
    children,
  };
}

export function responsesToProp(responses: any): Property {
  if (responses.schema) {
    return rootResponseSchemaToProp(responses.schema);
  } else if (responses.example) {
    return responseExampleToProps(responses.example);
  }
  return {
    types: "object",
  };
}

const paramTypes = EndPoints.map((endPoint) => ({
  name: getParamTypeName(endPoint.method, endPoint.uri),
  props: queryParametersToProp(
    endPoint.info["multipart/form-data"]?.formParameters ??
      endPoint.info.queryParameters,
  ),
}));

const responseTypes = EndPoints.map((endPoint) => ({
  name: getResponseTypeName(endPoint.method, endPoint.uri),
  props: responsesToProp(endPoint.info.responses),
}));

const buildData = EndPoints.map((endPoint, i) => ({
  uri: endPoint.uri,
  method: endPoint.method,
  description: endPoint.info.description,
  functionName: getFunctionName(endPoint.method, endPoint.uri),
  paramTypeName: getParamTypeName(endPoint.method, endPoint.uri),
  responseTypeName: getResponseTypeName(endPoint.method, endPoint.uri),
  commandName: getCommandName(endPoint.method, endPoint.uri),
  uriParams: getParamsFromUri(endPoint.uri),
  param: paramTypes[i].props,
  response: responseTypes[i].props,
  isMultipartFormData: Boolean(endPoint.info["multipart/form-data"]),
}));

const buildDataJson = prettier.format(JSON.stringify(buildData), {
  ...PrettierConfig,
  parser: "json",
});

fs.writeFileSync(path.join(__dirname, "buildData.json"), buildDataJson);
