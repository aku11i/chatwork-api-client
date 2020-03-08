import { format } from 'prettier';

export function getClass(functions: string) {
  return format(
    `
    export default class ChatworkApi {

      constructor(private api_token: string) {}

      ${functions}
    }
    `,
    { parser: 'typescript' },
  );
}

export function getFunction(
  functionName: string,
  uri: string,
  paramType: string,
  returnType: string,
) {
  return format(
    `
    export async ${functionName} (params: ${paramType}) {
      const {data} = await axios.get('https://api.chatwork.com/v2${uri}', {
        params,
        headers: { 'X-ChatWorkToken': this.api_token }
      });

      return {...data} as ${returnType};
    }
    `,
    { parser: 'typescript' },
  );
}

