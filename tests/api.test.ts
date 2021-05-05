import ChatworkApi from "../src";
import { sleep } from "./util";
import { join } from "path";
import { readFileSync } from "fs";

describe("API Connection Test", () => {
  const api = new ChatworkApi();

  let room_id: number;

  test("GET", async () => {
    const me = await api.getMe();
    expect(me).toHaveProperty("room_id");
    room_id = me.room_id;
  });

  let message_id: string;

  test("POST", async () => {
    const message = await api.postRoomMessage(room_id, {
      body: "[info][title]chatwork-api-client[/title]test[/info]",
    });
    expect(message).toHaveProperty("message_id");
    message_id = message.message_id;

    await sleep();
  });

  test("PUT", async () => {
    const putResult = await api.putRoomMessage(room_id, message_id, {
      body: "[info][title]chatwork-api-client[/title]test(edited)[/info]",
    });
    expect(putResult).toHaveProperty("message_id");

    await sleep();
  });

  test("DELETE", async () => {
    const deleteResult = await api.deleteRoomMessage(room_id, message_id);
    expect(deleteResult).toHaveProperty("message_id");
  });

  test("File Upload", async () => {
    const postFileResult = await api.postRoomFile(room_id, {
      file: readFileSync(join(__dirname, "test.txt")),
      file_name: "testfile.txt",
    });
    expect(postFileResult).toHaveProperty("file_id");
  });
});
