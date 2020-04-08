import fs = require("fs");
import path = require("path");
import prettier = require("prettier");

import { getType } from "./typeTemplates";
import { getFunction, getClass, getClassHeader } from "./classTemplates";

const PrettierConfig = require("../.prettierrc.json");

import BuildDataJson = require("./buildData.json");

const paramData = BuildDataJson.map((buildData) =>
  prettier.format(getType(buildData.paramTypeName, buildData.param), {
    ...PrettierConfig,
    parser: "typescript",
  }),
).join("\n");

const responseData = BuildDataJson.map((buildData) =>
  prettier.format(getType(buildData.responseTypeName, buildData.response), {
    ...PrettierConfig,
    parser: "typescript",
  }),
).join("\n");

const functions = BuildDataJson.map((buildData) => getFunction(buildData)).join(
  "\n",
);

const classData = prettier.format(
  [getClassHeader(), getClass(functions)].join("\n"),
  {
    ...PrettierConfig,
    parser: "typescript",
  },
);

const typeData = prettier.format([paramData, responseData].join("\n"), {
  ...PrettierConfig,
  parser: "typescript",
});

const classPath = path.resolve(__dirname, "..", "src", "api.ts");
if (fs.existsSync(classPath)) fs.unlinkSync(classPath);
fs.writeFileSync(classPath, classData);

const typePath = path.resolve(__dirname, "..", "src", "types.ts");
if (fs.existsSync(typePath)) fs.unlinkSync(typePath);
fs.writeFileSync(typePath, typeData);
