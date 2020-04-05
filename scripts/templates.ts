import {
  getParamTypeName,
  getResponseTypeName,
  getFunctionName,
} from './convert';

export type Property = {
  name?: string;
  description?: string;
  types: string;
  enums?: string[];
  children?: Property[];
  arrayProp?: Property;
  required?: boolean;
};

function getParamsFromUri(uri: string) {
  return uri
    .split('/')
    .filter((str) => str.match(/^\$\{.*\}$/))
    .map((str) => str.replace('${', '').replace('}', ''));
}

export function getHeader() {
  return `
    // This file was automatically generated.
    import axios from 'axios';
    import { stringify } from 'qs';

    export const CHATWORK_URL = 'https://api.chatwork.com/v2';
  `;
}

export function getClass(functions: string) {
  return `
    /**
     * Chatwork API V2
     */
    export default class ChatworkApi {
      private readonly headers: any;

      constructor(private api_token: string) {
        this.headers = {
          "X-ChatWorkToken": this.api_token,
        }
      }

      private async get(uri: string, params: any = {}) {
        const {data} = await axios.get(
          CHATWORK_URL + uri,
          {
            headers: this.headers,
            params,
          }
        );

        return { ...data } as any;
      }

      private async post(uri: string, params: any = {}) {
        const {data} = await axios.post(
          CHATWORK_URL + uri,
          stringify(params),
          {
            headers: {
              ...this.headers,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        return { ...data } as any;
      }

      private async delete(uri: string, params: any = {}) {
        const {data} = await axios.delete(
          CHATWORK_URL + uri,
          {
            headers: this.headers,
            params,
          }
        );

        return { ...data } as any;
      }

      private async put(uri: string, params: any = {}) {
        const {data} = await axios.put(
          CHATWORK_URL + uri,
          stringify(params),
          {
            headers: {
              ...this.headers,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        return { ...data } as any;
      }

      ${functions}
    }
    `;
}

export function getFunction(endPoint: any) {
  const functionName = getFunctionName(endPoint);
  const uri = endPoint.uri;
  const description = endPoint.info.description;
  const paramType = getParamTypeName(endPoint);
  const returnType = getResponseTypeName(endPoint);
  const method = endPoint.method;
  const extraParams = getParamsFromUri(uri)
    .map((p) => `${p}: string | number, `)
    .join('');
  const paramRequired = endPoint.paramRequired;

  const params = `params${paramRequired ? '' : '?'}: ${paramType}`;

  return `

    /**
     * ${description}
     */
    async ${functionName} (${extraParams}${params}) {
      return (await this.${method.toLowerCase()}(\`${uri}\`, params)) as ${returnType};
    }
    `;
}

export function getTypeString({ types, enums, children, arrayProp }: Property) {
  if (enums) {
    const enumStr = enums.map((e) => `"${e}"`).join(' | ');
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
  ${prop.name}${prop.required ? '' : '?'}: ${getTypeString(prop)}
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
