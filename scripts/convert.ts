const { readFileSync, writeFileSync }: typeof import('fs') = require('fs');
const { join, resolve }: typeof import('path') = require('path');
const { parse }: typeof import('yaml') = require('yaml');
const { format }: typeof import('prettier') = require('prettier');
const camelCase = require('camelcase');
const pascalCase = require('pascal-case');

const EndPoints: typeof import('./endPoints.json') = require('./endPoints.json');
const QueryParameters: typeof import('./queryParameters.json') = require('./queryParameters.json');
const Responses: typeof import('./responses.json') = require('./responses.json');

const CHATWORK_URL = 'https://api.chatwork.com/v2';
