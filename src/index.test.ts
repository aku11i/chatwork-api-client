import ChatworkApi from '.';
import * as fs from 'fs';
import * as path from 'path';

const API_TOKEN_PATH = path.resolve(__dirname, '../API_TOKEN');

const API_TOKEN = getApiToken();

test('API Token', () => {
  expect(API_TOKEN).toMatch(/^[a-z0-9]+$/);
});

test('API Connection Test (GET,POST,PUT,DELETE)', async () => {
  const api = new ChatworkApi(API_TOKEN);

  const me = await api.getMe();
  expect(me).toHaveProperty('room_id');
  const { room_id } = me;

  const message = await api.postRoomMessage(room_id, {
    body: '[info][title]chatwork-api-client[/title]test[/info]',
  });
  expect(message).toHaveProperty('message_id');
  const { message_id } = message;

  const putResult = await api.putRoomMessage(room_id, message_id, {
    body: '[info][title]chatwork-api-client[/title]test(edited)[/info]',
  });
  expect(putResult).toHaveProperty('message_id');

  const deleteResult = await api.deleteRoomMessage(room_id, message_id);
  expect(deleteResult).toHaveProperty('message_id');
});

function getApiToken() {
  if (!fs.existsSync(API_TOKEN_PATH)) {
    throw new Error(
      ['The file "API_TOKEN" is not found.', API_TOKEN_PATH].join('\n'),
    );
  }
  return fs
    .readFileSync(API_TOKEN_PATH, {
      encoding: 'utf8',
    })
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .join('')
    .trim();
}
