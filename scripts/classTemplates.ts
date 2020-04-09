import {
  getFunctionName,
  getParamTypeName,
  getResponseTypeName,
  getParamsFromUri,
  Property,
  hasProp,
  isChildrenRequired,
} from "./utils";
import { BuildData } from "./typings";

export function getClassHeader() {
  return `
    // This file was automatically generated.
    import axios from 'axios';
    import { stringify } from 'qs';

    import * as Types from './types';

    export const CHATWORK_URL = 'https://api.chatwork.com/v2';

    export type RateLimits = {
      /** 次に制限がリセットされる時間（Unix time） */
      'x-ratelimit-reset': number;
      /** 残りコール回数 */
      'x-ratelimit-remaining': number;
      /** 最大コール回数 */
      'x-ratelimit-limit': number;
    }
  `;
}

export function getClass(functions: string) {
  return `
    /**
     * Chatwork API V2
     */
    export default class ChatworkApi {
      private readonly headers: any;

      private _rateLimits?: RateLimits;

      /**
       * API制限情報
       * APIが呼び出されるとレスポンスヘッダの情報を基に更新される
       */
      get rateLimits() {
        return this._rateLimits;
      }

      constructor(private api_token?: string) {
        this.headers = {
          "X-ChatWorkToken": this.api_token,
        }
      }

      setApiToken(api_token: string) {
        this.headers["X-ChatWorkToken"] = api_token;
      }

      private checkApiToken() {
        if(!this.headers["X-ChatWorkToken"]) {
          throw new Error("Chatwork API Token is not set.")
        }
      }

      private saveRateLimits(headers: any) {
        const rateLimits = Object.entries(headers)
          .filter(([key, value]) => key.startsWith('x-ratelimit'))
          .map(([key, value]) => ([key, Number(value)]));
        this._rateLimits = Object.fromEntries(rateLimits) as RateLimits;
      }

      private async get<T>(uri: string, params: any = {}) {
        this.checkApiToken();
        const { data, headers } = await axios.get(
          CHATWORK_URL + uri,
          {
            headers: this.headers,
            params,
          }
        );

        this.saveRateLimits(headers);

        return data as T;
      }

      private async post<T>(uri: string, params: any = {}) {
        this.checkApiToken();
        const { data, headers } = await axios.post(
          CHATWORK_URL + uri,
          stringify(params),
          {
            headers: {
              ...this.headers,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        this.saveRateLimits(headers);

        return data as T;
      }

      private async delete<T>(uri: string, params: any = {}) {
        this.checkApiToken();
        const { data, headers } = await axios.delete(
          CHATWORK_URL + uri,
          {
            headers: this.headers,
            params,
          }
        );

        this.saveRateLimits(headers);

        return data as T;
      }

      private async put<T>(uri: string, params: any = {}) {
        this.checkApiToken();
        const { data, headers } = await axios.put(
          CHATWORK_URL + uri,
          stringify(params),
          {
            headers: {
              ...this.headers,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );

        this.saveRateLimits(headers);

        return data as T;
      }

      ${functions}
    }
    `;
}

export function getFunction({
  uri,
  method,
  description,
  functionName,
  paramTypeName,
  responseTypeName,
  uriParams,
  param,
}: BuildData) {
  const extraParams = (uriParams as string[])
    .map((p) => `${p}: string | number`)
    .join(", ");
  const paramExists = hasProp(param);
  const paramRequired = isChildrenRequired(param);

  const params = paramExists
    ? `${extraParams ? ", " : ""}params${
        paramRequired ? "" : "?"
      }: Types.${paramTypeName}`
    : "";

  return `

    /**
     * ${description}
     */
    async ${functionName} (${extraParams}${params}) {
      return (await this.${method.toLowerCase()}<Types.${responseTypeName}>(\`${uri}\`${
    paramExists ? ", params" : ""
  }));
    }
    `;
}
