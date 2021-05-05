# Chatwork API Client

[![build](https://github.com/aktriver/chatwork-api-client/actions/workflows/build.yml/badge.svg)](https://github.com/aktriver/chatwork-api-client/actions/workflows/build.yml)
[![publish](https://github.com/aktriver/chatwork-api-client/actions/workflows/publish.yml/badge.svg)](https://github.com/aktriver/chatwork-api-client/actions/workflows/publish.yml)

Chatwork API v2 client for TypeScript and JavaScript. `chatwork-api-client` command is included.

## Features

- Supports Chatwork API v2.
- Has perfect type definitions and comments because API methods are automatically generated from the [official RAML](https://github.com/chatwork/api/blob/master/RAML/api-ja.raml).
- Includes CLI command `chatwork-api-client`.
  - Works on Node.js 12 or higher.

## API

### Installation

```sh
npm install --save chatwork-api-client
# yarn add chatwork-api-client
```

### Usage

```typescript
import ChatworkApi from "chatwork-api-client";
// const ChatworkApi = require("chatwork-api-client").default;

const api = new ChatworkApi("YOUR_API_TOKEN");
// If process.env.CHATWORK_API_TOKEN is set, API Token is automatically read.

(async () => {
  const me = await api.getMe();
  const { name, account_id } = me;
})();
```

## CLI

### Installation

```sh
npm install --global chatwork-api-client
```

### Usage

```sh
chatwork-api-client --help

# alias
# chapi --help
```

### Docker

```sh
docker pull aktriver/chatwork-api-client:latest
docker run --rm --env "CHATWORK_API_TOKEN=YOUR_API_TOKEN" aktriver/chatwork-api-client:latest --help
```

```sh
Usage: chatwork-api-client [options] [command]

Options:
  -h, --help                                            display help for command

Commands:
  get-me [options]                                      自分自身の情報を取得
  get-my-status [options]                               自分の未読数、未読To数、未完了タスク数を返す
  get-my-tasks [options]                                自分のタスク一覧を取得する。(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
  get-contacts [options]                                自分のコンタクト一覧を取得
  get-rooms [options]                                   自分のチャット一覧の取得
  post-room [options]                                   グループチャットを新規作成
  get-room [options] <room_id>                          チャットの名前、アイコン、種類(my/direct/group)を取得
  put-room [options] <room_id>                          チャットの名前、アイコンをアップデート
  delete-room [options] <room_id>                       グループチャットを退席/削除する
  get-room-members [options] <room_id>                  チャットのメンバー一覧を取得
  put-room-members [options] <room_id>                  チャットのメンバーを一括変更
  get-room-messages [options] <room_id>                 チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)
  post-room-message [options] <room_id>                 チャットに新しいメッセージを追加
  put-room-messages-read [options] <room_id>            メッセージを既読にする
  put-room-messages-unread [options] <room_id>          メッセージを未読にする
  get-room-message [options] <room_id> <message_id>     メッセージ情報を取得
  put-room-message [options] <room_id> <message_id>     チャットのメッセージを更新する。
  delete-room-message [options] <room_id> <message_id>  メッセージを削除
  get-room-tasks [options] <room_id>                    チャットのタスク一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
  post-room-task [options] <room_id>                    チャットに新しいタスクを追加
  get-room-task [options] <room_id> <task_id>           タスク情報を取得
  put-room-task-status [options] <room_id> <task_id>    タスク完了状態を変更する
  get-room-files [options] <room_id>                    チャットのファイル一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
  post-room-file [options] <room_id>                    チャットに新しいファイルをアップロード
  get-room-file [options] <room_id> <file_id>           ファイル情報を取得
  get-room-link [options] <room_id>                     招待リンクを取得する
  post-room-link [options] <room_id>                    招待リンクを作成する
  put-room-link [options] <room_id>                     招待リンクの情報を変更する
  delete-room-link [options] <room_id>                  招待リンクを削除する
  get-incoming-requests [options]                       自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
  put-incoming-request [options] <request_id>           自分に対するコンタクト承認依頼を承認する
  delete-incoming-request [options] <request_id>        自分に対するコンタクト承認依頼をキャンセルする
  help [command]                                        display help for command
```

## API Token

You can set environment variable `CHATWORK_API_TOKEN` to omit specifying the API token.

## Development

### Setup

```sh
git clone https://github.com/aktriver/chatwork-api-client.git
cd chatwork-api-client

git submodule update --init

npm install
```

### Build

```sh
# Generates src/*.ts
npm run generate

# Builds src/*.ts
npm run build
```

### Test

> This test will actually post messages and files to your own room.<br>
> To complete test successfully, set environment variable `CHATWORK_API_TOKEN`.

```sh
npm run test
```

### CLI Debug

```sh
npm --silent start -- --help
```
