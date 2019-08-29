# Chatwork API Client

## Features

- Chatwork API v2 をサポートしています
- JavaScript, TypeScript をサポートしています
- [公式の API 定義ファイル](https://github.com/chatwork/api/blob/master/RAML/api-ja.raml)からメソッドを自動生成しています
  - 各メソッドに型定義・コメントがついています
- 通信処理に [axios](https://github.com/axios/axios) を使用しています

## Work In Progress

- 開発中ですが、基本的に動作します
- テストが不十分です。動作確認していないメソッドがあります
- メソッドの命名規則の変更を検討しています

## Installation

```sh
npm install --save chatwork-api-client
```

## Usage

ターゲットを ESNext にしてビルドしています。<br>
ブラウザやバージョンの低い Node.js で動作させる場合は Babel や TypeScript で ES5 にトランスパイルしてください。

```typescript
import ChatworkApi from "chatwork-api-client";
// or
// const ChatworkApi = require("chatwork-api-client").default;

const api = new ChatworkApi("YOUR_API_TOKEN");
const me = await api.getMe();
```

## Development

### Setup

```sh
git clone https://github.com/akutagw/chatwork-api-client.git
cd chatwork-api-client

git submodule update --init
npm install
```

### Run

```sh
npm run generate # generate src/api.ts from RAML
npm run build
npm run test
```

## Todo

- [ ] English Support (Comment, README)
- [ ] 定義書から API レスポンスの enum 定義を反映する
