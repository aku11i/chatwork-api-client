import ChatworkApi from ".";
import * as fs from "fs";
import * as path from "path";

const API_TOKEN_PATH = path.resolve(__dirname, "../API_TOKEN");

const API_TOKEN = getApiToken();

const api = new ChatworkApi(API_TOKEN);

(async () => {
  const me = await api.getMe();
  console.log(me);
})();

function getApiToken() {
  if (!fs.existsSync(API_TOKEN_PATH)) {
    throw new Error(`API_TOKEN file is not found. ${API_TOKEN_PATH}`);
  }
  return fs
    .readFileSync(API_TOKEN_PATH, {
      encoding: "utf8"
    })
    .split("\n")
    .filter(line => line && !line.startsWith("#"))
    .join("");
}
