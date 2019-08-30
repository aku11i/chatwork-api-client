# Chatwork API Client

## Features

- Supports Chatwork API v2.
- API methods are automaticaly generated from [official RAML](https://github.com/chatwork/api/blob/master/RAML/api-ja.raml).
  - Perfect type definition and comments. (Comments are currently Japanese)
- Using [axios](https://github.com/axios/axios) for API connection.

## Work In Progress

- This library is not stable yet.
- Some methods are not tested.

## Installation

```sh
npm install --save chatwork-api-client
```

## Usage

```typescript
import ChatworkApi from 'chatwork-api-client';
// or
// const ChatworkApi = require("chatwork-api-client").default;

const api = new ChatworkApi('YOUR_API_TOKEN');

(async () => {
  const me = await api.getMe();
  const { name, account_id } = me;
})();
```

Transpile if you want to run on a browser or a lower version of Node.js.

## Development

### Setup

```sh
git clone https://github.com/akutagw/chatwork-api-client.git
cd chatwork-api-client

git submodule update --init
npm install
```

### Build

```sh
npm run generate # Generates src/api.ts from RAML
npm run build
```

### Test

Create `API_TOKEN` file in the root directory.<br>
See [here](https://github.com/akutagw/chatwork-api-client/blob/master/_API_TOKEN).

```sh
npm run test
```
