import { Property } from './templates';

const { readFileSync, writeFileSync }: typeof import('fs') = require('fs');
const { join, resolve }: typeof import('path') = require('path');
const { parse }: typeof import('yaml') = require('yaml');
const { format }: typeof import('prettier') = require('prettier');
const camelCase: typeof import('camelcase') = require('camelcase');
const { pascalCase }: typeof import('pascal-case') = require('pascal-case');

const EndPoints: typeof import('./endPoints.json') = require('./endPoints.json');

const CHATWORK_URL = 'https://api.chatwork.com/v2';

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

export function responseSchemaToProps(schema: any): Property[] {
  return [];
}

export function responseExampleToProps(example: any): Property[] {
  return Object.entries(example).map(([name, value]) => ({
    name,
    description: '',
    types: typeof value,
  }));
}

export function responsesToProps(responses: any): Property[] {
  if (responses.schema) {
    return responseSchemaToProps(responses.schema);
  } else if (responses.example) {
    return responseExampleToProps(responses.example);
  }
  return [];
}

const paramTypes = EndPoints.map(endPoint => ({
  name: getParamTypeName(endPoint),
  props: queryParametersToProps(endPoint.info.queryParameters),
}));

const responseTypes = EndPoints.map(endPoint => ({
  name: getResponseTypeName(endPoint),
  props: responsesToProps(endPoint.info.responses),
}));

console.log(paramTypes);
console.log(responseTypes);
