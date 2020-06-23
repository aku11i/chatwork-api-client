import { execSync } from "child_process";
import { resolve, join } from "path";
import { sleep } from "./util";

const ROOT = resolve(__dirname, "..");

process.chdir(ROOT);

function exec(...args: string[]) {
  const command = [
    "npx ts-node src/cli.ts",
    ...args.map((arg) => `"${arg}"`),
  ].join(" ");

  const result = execSync(command).toString();
  return JSON.parse(result);
}

test("API Connection Test[CLI] (GET,POST,PUT,DELETE)", async () => {
  const me = exec("get-me", "--format", "json");
  expect(me).toHaveProperty("room_id");
  const { room_id } = me;

  const message = exec(
    "post-room-message",
    "--format",
    "json",
    "--body",
    "[info][title]chatwork-api-client[CLI][/title]test[/info]",
    room_id,
  );

  expect(message).toHaveProperty("message_id");
  const { message_id } = message;

  await sleep();

  const deleteResult = exec(
    "delete-room-message",
    "--format",
    "json",
    room_id,
    message_id,
  );

  expect(deleteResult).toHaveProperty("message_id");

  const filePath = join(__dirname, "test.txt");

  const postFileResult = exec(
    "post-room-file",
    "--format",
    "json",
    "--file_name",
    "testfile.cli.txt",
    "--file",
    filePath,
    room_id,
  );

  expect(postFileResult).toHaveProperty("file_id");
});
