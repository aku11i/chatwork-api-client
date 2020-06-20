import ChatworkApi from "../src";
import { sleep } from "./util";
import { join } from "path";
import { readFileSync } from "fs";

test("API Connection Test (GET,POST,PUT,DELETE,File Upload)", async () => {
  const api = new ChatworkApi();

  const me = await api.getMe();
  expect(me).toHaveProperty("room_id");
  const { room_id } = me;

  const message = await api.postRoomMessage(room_id, {
    body: "[info][title]chatwork-api-client[/title]test[/info]",
  });
  expect(message).toHaveProperty("message_id");
  const { message_id } = message;

  await sleep();

  const putResult = await api.putRoomMessage(room_id, message_id, {
    body: "[info][title]chatwork-api-client[/title]test(edited)[/info]",
  });
  expect(putResult).toHaveProperty("message_id");

  await sleep();

  const deleteResult = await api.deleteRoomMessage(room_id, message_id);
  expect(deleteResult).toHaveProperty("message_id");

  const postFileResult = await api.postRoomFile(room_id, {
    file: readFileSync(join(__dirname, "test.txt")),
    file_name: "testfile.txt",
  });
  expect(postFileResult).toHaveProperty("file_id");
});
