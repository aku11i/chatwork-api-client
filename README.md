# Chatwork API Client

[![build](https://github.com/aku11i/chatwork-api-client/actions/workflows/build.yml/badge.svg)](https://github.com/aku11i/chatwork-api-client/actions/workflows/build.yml)
[![publish](https://github.com/aku11i/chatwork-api-client/actions/workflows/publish.yml/badge.svg)](https://github.com/aku11i/chatwork-api-client/actions/workflows/publish.yml)

Chatwork API v2 用のクライアントライブラリです。<br>
CLI も用意されています。

## Features

- Chatwork API v2 の全てのエンドポイントに対応しています。
- TypeScript 向けの完全な型定義があります。<br>
  公式の[RAML](https://github.com/chatwork/api/blob/master/RAML/api-ja.raml) ファイルから生成しています。
- CLI もあります。 (`chatwork-api-client`).
- Node.js 12 以上で動作します。
- ブラウザで動作するかは確認していません。

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
// process.env.CHATWORK_API_TOKEN をセットしていればAPIトークンを渡す必要はありません。

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

https://hub.docker.com/r/aktriver/chatwork-api-client

```sh
docker pull aktriver/chatwork-api-client:latest
docker run --rm --env "CHATWORK_API_TOKEN=YOUR_API_TOKEN" aktriver/chatwork-api-client:latest --help
```

### Help

```sh
chatwork-api-client --help
```

```sh
Usage: chatwork-api-client [options] [command]

Options:
  -V, --version                                         output the version number
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

環境変数 `CHATWORK_API_TOKEN` をセットすることでソースコード内での API トークンの指定を省略できます。

## Contribution

### Setup

```sh
git clone --recursive https://github.com/aku11i/chatwork-api-client.git
cd chatwork-api-client

npm install
```

### Build

`src/*.ts` は `scripts/*.ts` によって生成されます。<br>
**`src/*.ts` を直接編集しないでください。**

```sh
# scripts/*.ts を実行し、 src/*.ts を生成します。
npm run generate

# 生成された src/*.ts をビルドします。
npm run build
```

### Test

実際に Chatwork のマイチャットへの投稿を行うことをテストとします。<br>
環境変数 `CHATWORK_API_TOKEN` をセットしてください。

```sh
npm run test
```

### CLI

CLI コマンドの実行を確認できます。

```sh
npm --silent start -- --help
```
