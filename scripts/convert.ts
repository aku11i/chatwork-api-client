import { Property, getType } from './templates';

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
  if (type === 'boolean') return '0|1';
  return type;
}

export function queryParameterToProp(name: any, data: any): Property {
  return {
    name,
    description: data.displayName,
    types: getPropertyType(data.type),
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
  const children =
    property.type === 'object'
      ? Object.entries(property.properties).map(([name, property]) =>
          schemaPropertyToProperty(property, name),
        )
      : undefined;

  const arrayProp =
    property.type === 'array'
      ? schemaPropertyToProperty(property.items[0], name)
      : undefined;

  return {
    name,
    types: getPropertyType(property.type),
    enums: property.enum,
    children,
    arrayProp,
  };
}

export function responseSchemaToObjectProp(schema: any): Property {
  const children = Object.entries(schema.properties).map(([name, property]) =>
    schemaPropertyToProperty(property, name),
  );
  return {
    types: 'object',
    children,
  };
}

export function responseSchemaToArrayProp(schema: any): Property {
  return {
    types: 'array',
    arrayProp: rootResponseSchemaToProp(schema.items[0]),
  };
}

export function rootResponseSchemaToProp(schema: any): Property {
  if (schema.type === 'array') {
    return responseSchemaToArrayProp(schema);
  }
  return responseSchemaToObjectProp(schema);
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

export function responsesToProp(responses: any): Property {
  if (responses.schema) {
    return rootResponseSchemaToProp(responses.schema);
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
  props: responsesToProp(endPoint.info.responses),
}));

log(EndPoints);
log(paramTypes);
log(responseTypes);

paramTypes.forEach(paramType => {
  const types = format(getType(paramType.name, paramType.props), {
    parser: 'typescript',
  });
  console.log(types);
});

responseTypes.forEach(responseType => {
  const types = format(getType(responseType.name, responseType.props), {
    parser: 'typescript',
  });
  console.log(types);
});
