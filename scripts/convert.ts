import { Property } from './templates';

const { readFileSync, writeFileSync }: typeof import('fs') = require('fs');
const { join, resolve }: typeof import('path') = require('path');
const { parse }: typeof import('yaml') = require('yaml');
const { format }: typeof import('prettier') = require('prettier');
const camelCase: typeof import('camelcase') = require('camelcase');
const { pascalCase }: typeof import('pascal-case') = require('pascal-case');

const EndPoints: typeof import('./endPoints.json') = require('./endPoints.json');

const CHATWORK_URL = 'https://api.chatwork.com/v2';

function log(...args: any[]) {
  console.log(...args.map(v => format(JSON.stringify(v), { parser: 'json' })));
}

export function getFunctionName(endPoint: any) {
  const uri = endPoint.uri.replace(/\{.*\}/g, '');
  return pascalCase(`${endPoint.method}_${uri}`);
}

export function getParamTypeName(endPoint: any) {
  return getFunctionName(endPoint) + 'Param';
}

export function getResponseTypeName(endPoint: any) {
  return getFunctionName(endPoint) + 'Response';
}

export function getPropertyType(type: string) {
  if (type === 'integer') return 'number';
  return type;
}

export function queryParameterToProp(name: any, data: any): Property {
  return {
    name,
    description: data.displayName,
    types: data.type,
    enums: data.enum,
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
): Property {
  return {
    name,
    types: getPropertyType(property.type),
    enums: property.enum,
  };
}

export function responseSchemaToObjectProps(schema: any): Property {
  const children = Object.entries(schema.properties).map(([name, property]) =>
    schemaPropertyToProperty(property, name),
  );
  return {
    types: 'object',
    children,
  };
}

export function responseSchemaToArrayProps(schema: any): Property {
  return {
    types: 'array',
    children: schema.items.map(item => rootResponseSchemaToProps(item)),
  };
}

export function rootResponseSchemaToProps(schema: any): Property {
  if (schema.type === 'array') {
    return responseSchemaToArrayProps(schema);
  }
  return responseSchemaToObjectProps(schema);
}

export function responseExampleToProps(example: any): Property {
  const children = Object.entries(example).map(([name, value]) => ({
    name,
    description: '',
    types: typeof value,
  }));

  return {
    types: 'object',
    children,
  };
}

export function responsesToProps(responses: any): Property {
  if (responses.schema) {
    return rootResponseSchemaToProps(responses.schema);
  } else if (responses.example) {
    return responseExampleToProps(responses.example);
  }
  return {
    types: 'object',
  };
}

const paramTypes = EndPoints.map(endPoint => ({
  name: getParamTypeName(endPoint),
  props: queryParametersToProps(endPoint.info.queryParameters),
}));

const responseTypes = EndPoints.map(endPoint => ({
  name: getResponseTypeName(endPoint),
  props: responsesToProps(endPoint.info.responses),
}));

log(paramTypes);
log(responseTypes);
