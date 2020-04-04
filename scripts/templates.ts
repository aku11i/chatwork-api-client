export function getClass(functions: string) {
  return `
    export default class ChatworkApi {

      constructor(private api_token: string) {}

      ${functions}
    }
    `;
}

export function getFunction(
  functionName: string,
  uri: string,
  paramType: string,
  returnType: string,
) {
  return `
    export async ${functionName} (params: ${paramType}) {
      const {data} = await axios.get('https://api.chatwork.com/v2${uri}', {
        params,
        headers: { 'X-ChatWorkToken': this.api_token }
      });

      return {...data} as ${returnType};
    }
    `;
}

export type Property = {
  name?: string;
  description?: string;
  types: string;
  enums?: string[];
  children?: Property[];
};

function propToType({ name, description, types, enums }: Property) {
  if (enums) {
    const enumStr = enums.map(e => `"${e}"`).join(' | ');
    return `
    /** ${description || ''} */
    ${name}: ${enumStr}
    `;
  }
  return `${name}: ${types}`;
}

export function getType(typeName: string, props: Property[]) {
  return `
  export type ${typeName} = {
    ${props.map(propToType).join('\n')}
  }
  `;
}
