const { writeFileSync }: typeof import('fs') = require('fs');
const { join, resolve }: typeof import('path') = require('path');
const { format }: typeof import('prettier') = require('prettier');
const Api: typeof import('./api.json') = require('./api.json');

function write(fileName: string, data: any) {
  const path = join(__dirname, fileName);
  const json = format(JSON.stringify(data), { parser: 'json' });
  writeFileSync(path, json, { encoding: 'utf8' });
}

const traits = Api.traits.reduce((traits, trait) => {
  const [key, value] = Object.entries(trait)[0];
  return [...traits, { key, ...value }];
}, [] as any);

const queryParameters = traits
  .filter(trait => trait['queryParameters'])
  .reduce(
    (obj, queryParameter) => ({
      ...obj,
      [queryParameter.key]: queryParameter['queryParameters'],
    }),
    {},
  );

function parseSchemaJson(schema: string) {
  const jsonString = schema.replace(/^\|/, '');
  return JSON.parse(jsonString);
}

const responses = traits
  .filter(trait => trait['responses'] && trait['responses']['200'])
  .reduce(
    (obj, responses) => ({
      ...obj,
      [responses.key]: {
        schema: parseSchemaJson(
          responses['responses']['200']['body']['application/json']['schema'],
        ),
        example: JSON.parse(
          responses['responses']['200']['body']['application/json']['example'],
        ),
      },
    }),
    {},
  );

function getEndpoints(endPoint: any, uri: string) {
  const { GET, POST, PUT, DELETE, ...others } = endPoint;
  const endPoints: any[] = [];
  if (GET) endPoints.push({ method: 'GET', uri, info: GET });
  if (POST) endPoints.push({ method: 'POST', uri, info: POST });
  if (PUT) endPoints.push({ method: 'PUT', uri, info: PUT });
  if (DELETE) endPoints.push({ method: 'DELETE', uri, info: DELETE });
  const children = Object.entries(others || {})
    .filter(([key]) => key.match(/\//))
    .map(([key, child]) => getEndpoints(child, uri + key))
    .flat();
  return [...endPoints, ...(children || [])];
}

const endPoints = Object.entries(Api)
  .filter(([key]) => key.match(/\//))
  .map(([key, value]) => getEndpoints(value, key))
  .flat();

write('queryParameters.json', queryParameters);
write('responses.json', responses);
write('endPoints.json', endPoints);
