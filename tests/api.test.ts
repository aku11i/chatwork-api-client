import ChatworkApi from "../src";
import { getApiToken } from "./util";

const API_TOKEN = getApiToken();

test("API Token", () => {
  expect(API_TOKEN).toMatch(/^[a-z0-9]+$/);
});

test("API Connection Test (GET,POST,PUT,DELETE)", async () => {
  const api = new ChatworkApi(API_TOKEN);

  const me = await api.getMe();
  expect(me).toHaveProperty("room_id");
  const { room_id } = me;

  const message = await api.postRoomMessage(room_id, {
    body: "[info][title]chatwork-api-client[/title]test[/info]",
  });
  expect(message).toHaveProperty("message_id");
  const { message_id } = message;

  const putResult = await api.putRoomMessage(room_id, message_id, {
    body: "[info][title]chatwork-api-client[/title]test(edited)[/info]",
  });
  expect(putResult).toHaveProperty("message_id");

  const deleteResult = await api.deleteRoomMessage(room_id, message_id);
  expect(deleteResult).toHaveProperty("message_id");
});
