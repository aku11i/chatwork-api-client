import fs = require('fs');
import path = require('path');
import yaml = require('yaml');
import prettier = require('prettier');

const ROOT = path.resolve(__dirname, '..');

const LANG = 'ja';

const raml = fs.readFileSync(
  path.join(ROOT, 'api', 'RAML', `api-${LANG}.raml`),
  {
    encoding: 'utf8',
  },
);

const json = prettier.format(JSON.stringify(yaml.parse(raml)), {
  parser: 'json',
});

fs.writeFileSync(path.join(__dirname, 'api.json'), json);
