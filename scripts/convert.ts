import {
  Property,
  getType,
  getFunction,
  getClass,
  getHeader,
} from "./templates";

import fs = require("fs");
import path = require("path");
import yaml = require("yaml");
import prettier = require("prettier");
import camelCase = require("camelcase");
import pascalCase = require("pascal-case");

import EndPoints = require("./endPoints.json");

const PrettierConfig = require("../.prettierrc.json");

function log(...args: any[]) {
  console.log(
    ...args.map((v) =>
      prettier.format(JSON.stringify(v), { ...PrettierConfig, parser: "json" }),
    ),
  );
}

export function getFunctionName(endPoint: any) {
  let uri = endPoint.uri.replace(/s\/\$\{[a-z_]*\}/g, "_").replace(/\//g, "_");

  if (endPoint.method === "POST") {
    uri = uri.replace(/s$/, "");
  }

  return camelCase(`${endPoint.method}_${uri}`);
}

export function getParamTypeName(endPoint: any) {
  return pascalCase.pascalCase(getFunctionName(endPoint) + "Param");
}

export function getResponseTypeName(endPoint: any) {
  return pascalCase.pascalCase(getFunctionName(endPoint) + "Response");
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

export function queryParametersToProps(queryParameters: any): Property[] {
  return Object.entries(queryParameters).map(([name, data]) =>
    queryParameterToProp(name, data),
  );
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
  if (schema.type === "array") {
    return responseSchemaToArrayProp(schema);
  }
  return responseSchemaToObjectProp(schema);
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
  name: getParamTypeName(endPoint),
  props: queryParametersToProps(endPoint.info.queryParameters),
}));

const responseTypes = EndPoints.map((endPoint) => ({
  name: getResponseTypeName(endPoint),
  props: responsesToProp(endPoint.info.responses),
}));

const paramData = paramTypes
  .map((paramType) =>
    prettier.format(getType(paramType.name, paramType.props), {
      ...PrettierConfig,
      parser: "typescript",
    }),
  )
  .join("\n");

const responseData = responseTypes
  .map((responseType) =>
    prettier.format(getType(responseType.name, responseType.props), {
      ...PrettierConfig,
      parser: "typescript",
    }),
  )
  .join("\n");

const functions = EndPoints.map((endPoint) => getFunction(endPoint)).join("\n");

const classData = prettier.format(getClass(functions), {
  ...PrettierConfig,
  parser: "typescript",
});

const headerData = getHeader();

const data = prettier.format(
  [headerData, paramData, responseData, classData].join("\n"),
  {
    ...PrettierConfig,
    parser: "typescript",
  },
);

const writePath = path.resolve(__dirname, "..", "src", "api.ts");
if (fs.existsSync(writePath)) fs.unlinkSync(writePath);
fs.writeFileSync(writePath, data);
