export type Property = {
  name?: string;
  description?: string;
  types: string;
  enums?: string[];
  children?: Property[];
  arrayProp?: Property;
};

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

export function getTypeString({ types, enums, children, arrayProp }: Property) {
  if (enums) {
    const enumStr = enums.map(e => `"${e}"`).join(' | ');
    return `${enumStr}`;
  }

  if (types === 'object') {
    return children
      ? `{
      ${children.map(propToType).join('\n')}
    }`
      : 'any';
  }

  if (types === 'array') {
    return arrayProp ? `${getTypeString(arrayProp)}[]` : 'any';
  }

  return `${types}`;
}

function propToType(prop: Property) {
  return `
  /** ${prop.description || ''} */
  ${prop.name}: ${getTypeString(prop)}
  `;
}

export function getType(typeName: string, props: Property | Property[]) {
  if (Array.isArray(props)) {
    return `
    export type ${typeName} = {
      ${props.map(propToType).join('\n')}
    }
    `;
  }

  return `export type ${typeName} = ${getTypeString(props)}`;
}
