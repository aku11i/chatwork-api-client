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

function parseJson(text: string) {
  const jsonString = text.replace(/^\|/, '');
  return JSON.parse(jsonString);
}

function parseResponsesJson(responses: any) {
  const schema = responses?.['200']?.['body']['application/json']?.['schema'];
  const example = responses?.['200']?.['body']['application/json']?.['example'];

  return {
    schema: schema ? parseJson(schema) : undefined,
    example: example ? parseJson(example) : undefined,
  };
}

const responses = traits
  .filter(trait => trait['responses']?.['200'])
  .reduce(
    (obj, responses) => ({
      ...obj,
      [responses.key]: {
        ...parseResponsesJson(responses?.responses),
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

function mergeResponses(target: any, from: any) {
  return Object.assign(target, from);
}

function mergeQueryParameters(target: any, from: any) {
  return Object.assign(target, from);
}

endPoints.forEach(endPoint => {
  if (endPoint?.info?.responses) {
    endPoint.info.responses = parseResponsesJson(endPoint.info.responses);
  }
  if (Array.isArray(endPoint?.info?.is)) {
    const is = endPoint.info.is.filter(
      is => is !== 'unauthorized_response' && is !== 'nocontent_response',
    );
    endPoint.info.is = is.length ? is : undefined;
  }
  if (!endPoint?.info?.queryParameters) {
    endPoint.info.queryParameters = {};
  }
  if (!endPoint?.info?.responses) {
    endPoint.info.responses = {};
  }
  if (Array.isArray(endPoint?.info?.is)) {
    endPoint.info.is.forEach(is => {
      mergeQueryParameters(endPoint.info.queryParameters, queryParameters[is]);
      mergeResponses(endPoint.info.responses, responses[is]);
    });
  }

  delete endPoint?.info?.is;
  delete endPoint?.info?.securedBy;
});

write('endPoints.json', endPoints);
