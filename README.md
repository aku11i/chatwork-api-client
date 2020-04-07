# Chatwork API Client

Chatwork API v2 client for TypeScript.

## Features

- Chatwork API v2 をサポートしています。
- API メソッドは [公式の RAML](https://github.com/chatwork/api/blob/master/RAML/api-ja.raml) を基に自動生成しています。
  - 完全な型定義とコメント説明がついています。
- API 通信に [axios](https://github.com/axios/axios) を使用しています。

## Work In Progress

- 動作確認が十分に取れていません。
- ファイルを添付するメソッドなどはまだ動作しません。
  - `postRoomFile` など

## Installation

```sh
npm install --save chatwork-api-client
```

or

```sh
yarn add chatwork-api-client
```

## Usage

```typescript
import ChatworkApi from "chatwork-api-client";
// or
// const ChatworkApi = require("chatwork-api-client").default;

const api = new ChatworkApi("YOUR_API_TOKEN");

(async () => {
  const me = await api.getMe();
  const { name, account_id } = me;
})();
```

ブラウザやバージョンの低い Node.js で動作させる場合はトランスパイルしてください。

## Development

### Setup

```sh
git clone https://github.com/ShuAkt/chatwork-api-client.git
cd chatwork-api-client

git submodule update --init
npm install
```

### Build

```sh
npm run generate # src/api.ts の生成が行われます
npm run build
```

### Test

`API_TOKEN` ファイルを作成してください。<br>
参照： [./\_API_TOKEN](./_API_TOKEN)

```sh
npm run test
```
