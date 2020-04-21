import { execSync } from "child_process";
import { resolve, join } from "path";
import { getApiToken, sleep } from "./util";

const API_TOKEN = getApiToken();

const ROOT = resolve(__dirname, "..");

process.chdir(ROOT);

test("API Token", () => {
  expect(API_TOKEN).toMatch(/^[a-z0-9]+$/);
  process.env.CHATWORK_API_TOKEN = API_TOKEN;
});

test("API Connection Test[CLI] (GET,POST,PUT,DELETE)", async () => {
  const meJson = execSync("yarn --silent start get-me").toString();
  const me = JSON.parse(meJson);

  expect(me).toHaveProperty("room_id");
  const { room_id } = me;

  const messageJson = execSync(
    `yarn --silent start post-room-message --body "[info][title]chatwork-api-client[CLI][/title]test[/info]" "${room_id}"`,
  ).toString();
  const message = JSON.parse(messageJson);

  expect(message).toHaveProperty("message_id");
  const { message_id } = message;

  await sleep();

  const putResultJson = execSync(
    `yarn --silent start put-room-message --body "[info][title]chatwork-api-client[CLI][/title]test(edited)[/info]" "${room_id}" "${message_id}"`,
  ).toString();
  const putResult = JSON.parse(putResultJson);

  expect(putResult).toHaveProperty("message_id");

  await sleep();

  const deleteResultJson = execSync(
    `yarn --silent start delete-room-message "${room_id}" "${message_id}"`,
  ).toString();
  const deleteResult = JSON.parse(deleteResultJson);

  expect(deleteResult).toHaveProperty("message_id");

  const postFileResultJson = execSync(
    `yarn --silent start post-room-file --file "${join(
      __dirname,
      "test.txt",
    )}" "${room_id}"`,
  ).toString();
  const postFileResult = JSON.parse(postFileResultJson);

  expect(postFileResult).toHaveProperty("file_id");
});
