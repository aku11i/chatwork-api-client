import { execSync } from "child_process";
import { resolve, join } from "path";
import { sleep } from "./util";

const ROOT = resolve(__dirname, "..");

process.chdir(ROOT);

test("API Connection Test[CLI] (GET,POST,PUT,DELETE)", async () => {
  const meJson = execSync(
    "yarn --silent start get-me --format json",
  ).toString();
  const me = JSON.parse(meJson);

  expect(me).toHaveProperty("room_id");
  const { room_id } = me;

  const messageJson = execSync(
    `yarn --silent start post-room-message --format json --body "[info][title]chatwork-api-client[CLI][/title]test[/info]" "${room_id}"`,
  ).toString();
  const message = JSON.parse(messageJson);

  expect(message).toHaveProperty("message_id");
  const { message_id } = message;

  await sleep();

  const deleteResultJson = execSync(
    `yarn --silent start delete-room-message --format json "${room_id}" "${message_id}"`,
  ).toString();
  const deleteResult = JSON.parse(deleteResultJson);

  expect(deleteResult).toHaveProperty("message_id");

  const filePath = join(__dirname, "test.txt");

  const postFileResultJson = execSync(
    `yarn --silent start post-room-file --format json --file_name "testfile.cli.txt" --file "${filePath}" "${room_id}"`,
  ).toString();
  const postFileResult = JSON.parse(postFileResultJson);

  expect(postFileResult).toHaveProperty("file_id");
});
