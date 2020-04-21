import * as path from "path";
import * as fs from "fs";

const API_TOKEN_PATH = path.resolve(__dirname, "../API_TOKEN");

export function getApiToken() {
  if (!fs.existsSync(API_TOKEN_PATH)) {
    if (process.env.CHATWORK_API_TOKEN) {
      return process.env.CHATWORK_API_TOKEN;
    }

    throw new Error(
      ['The file "API_TOKEN" is not found.', API_TOKEN_PATH].join("\n"),
    );
  }

  return fs
    .readFileSync(API_TOKEN_PATH, {
      encoding: "utf8",
    })
    .split("\n")
    .filter((line) => line && !line.startsWith("#"))
    .join("")
    .trim();
}

export async function sleep() {
  return await new Promise((resolve) => setTimeout(resolve, 500));
}
