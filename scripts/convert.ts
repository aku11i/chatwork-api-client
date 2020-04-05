import {
  Property,
  getType,
  getFunction,
  getClass,
  getHeader,
} from './templates';

const {
  readFileSync,
  writeFileSync,
  unlinkSync,
  existsSync,
}: typeof import('fs') = require('fs');
const { join, resolve }: typeof import('path') = require('path');
const { parse }: typeof import('yaml') = require('yaml');
const { format }: typeof import('prettier') = require('prettier');
const camelCase: typeof import('camelcase') = require('camelcase');
const { pascalCase }: typeof import('pascal-case') = require('pascal-case');

const EndPoints: typeof import('./endPoints.json') = require('./endPoints.json');

function log(...args: any[]) {
  console.log(
    ...args.map((v) => format(JSON.stringify(v), { parser: 'json' })),
  );
}

export function getFunctionName(endPoint: any) {
  let uri = endPoint.uri.replace(/s\/\$\{[a-z_]*\}/g, '_').replace(/\//g, '_');

  if (endPoint.method === 'POST') {
    uri = uri.replace(/s$/, '');
  }

  return camelCase(`${endPoint.method}_${uri}`);
}

export function getParamTypeName(endPoint: any) {
  return pascalCase(getFunctionName(endPoint) + 'Param');
}

export function getResponseTypeName(endPoint: any) {
  return pascalCase(getFunctionName(endPoint) + 'Response');
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
    format(getType(paramType.name, paramType.props), {
      parser: 'typescript',
    }),
  )
  .join('\n');

const responseData = responseTypes
  .map((responseType) =>
    format(getType(responseType.name, responseType.props), {
      parser: 'typescript',
    }),
  )
  .join('\n');

const functions = EndPoints.map((endPoint) => getFunction(endPoint)).join('\n');

const classData = format(getClass(functions), { parser: 'typescript' });

const headerData = getHeader();

const data = format(
  [headerData, paramData, responseData, classData].join('\n'),
  {
    parser: 'typescript',
  },
);

const writePath = resolve(__dirname, '..', 'src', 'api.ts');
if (existsSync(writePath)) unlinkSync(writePath);
writeFileSync(writePath, data);
