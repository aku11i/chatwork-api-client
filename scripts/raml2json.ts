const { readFileSync, writeFileSync }: typeof import('fs') = require('fs');
const { join, resolve }: typeof import('path') = require('path');
const { parse }: typeof import('yaml') = require('yaml');
const { format }: typeof import('prettier') = require('prettier');

const ROOT = resolve(__dirname, '..');

const LANG = 'ja';

const raml = readFileSync(join(ROOT, 'api', 'RAML', `api-${LANG}.raml`), {
  encoding: 'utf8',
});

const json = format(JSON.stringify(parse(raml)), { parser: 'json' });

writeFileSync(join(__dirname, 'api.json'), json);
