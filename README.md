# Chatwork API Client

![](https://github.com/aktriver/chatwork-api-client/workflows/Publish%20NPM%20package%20and%20Docker%20container/badge.svg)

Chatwork API v2 client for TypeScript / JavaScript.<br>
CLI command `chatwork-api-client` is also provided.

## Features

- Chatwork API v2 をサポートしています。
- API メソッドは [公式の RAML](https://github.com/chatwork/api/blob/master/RAML/api-ja.raml) を基に自動生成しています。
  - 完全な型定義とコメント説明がついています。
- API 通信に [axios](https://github.com/axios/axios) を使用しています。
- コマンドラインインターフェースも用意されています。 `chatwork-api-client`
  - 動作確認 Node.js バージョン： `12 <=`

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

## Docker

```sh
docker pull docker.pkg.github.com/aktriver/chatwork-api-client/chatwork-api-client:latest
docker run --rm --env "CHATWORK_API_TOKEN=YOUR_API_TOKEN" docker.pkg.github.com/aktriver/chatwork-api-client/chatwork-api-client:latest --help
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

環境変数 `CHATWORK_API_TOKEN` に API トークンをセットしておくと、クラス・コマンドの API トークンの指定を省略できます。

## Development

### Setup

```sh
git clone https://github.com/aktriver/chatwork-api-client.git
cd chatwork-api-client

git submodule update --init

npm install
# yarn install
```

### Build

```sh
# src/*.ts の生成
npm run generate
# yarn generate

# src/*.ts のビルド
npm run build
# yarn build
```

### Test

> 「マイチャット」への投稿テストを行います。

環境変数 `CHATWORK_API_TOKEN` に Chatwork の API トークンをセットします。

```sh
npm run test
# yarn test
```

### CLI Debug

```sh
npm --silent start -- --help
# yarn --silent start --help
```
