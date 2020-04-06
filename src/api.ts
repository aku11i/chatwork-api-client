// This file was automatically generated.
import axios from "axios";
import { stringify } from "qs";

export const CHATWORK_URL = "https://api.chatwork.com/v2";

export type RateLimits = {
  /** 次に制限がリセットされる時間（Unix time） */
  "x-ratelimit-reset": string;
  /** 残りコール回数 */
  "x-ratelimit-remaining": string;
  /** 最大コール回数 */
  "x-ratelimit-limit": string;
};

export type GetMeParam = {};

export type GetMyStatusParam = {};

export type GetMyTasksParam = {
  /** タスクの依頼者のアカウントID */
  assigned_by_account_id?: number;

  /** タスクのステータス */
  status?: "open" | "done";
};

export type GetContactsParam = {};

export type GetRoomsParam = {};

export type PostRoomParam = {
  /** グループチャット名 */
  name: string;

  /** チャット概要 */
  description?: string;

  /** 招待リンク作成 */
  link?: 0 | 1;

  /** リンク文字列 */
  link_code?: string;

  /** 承認要否 */
  link_need_acceptance?: 0 | 1;

  /** 管理者権限のユーザー */
  members_admin_ids: string;

  /** メンバー権限のユーザー */
  members_member_ids?: string;

  /** 閲覧のみ権限のユーザー */
  members_readonly_ids?: string;

  /** アイコン種類 */
  icon_preset?:
    | "group"
    | "check"
    | "document"
    | "meeting"
    | "event"
    | "project"
    | "business"
    | "study"
    | "security"
    | "star"
    | "idea"
    | "heart"
    | "magcup"
    | "beer"
    | "music"
    | "sports"
    | "travel";
};

export type GetRoomParam = {};

export type PutRoomParam = {
  /** グループチャット名 */
  name?: string;

  /** チャット概要 */
  description?: string;

  /** アイコン種類 */
  icon_preset?:
    | "group"
    | "check"
    | "document"
    | "meeting"
    | "event"
    | "project"
    | "business"
    | "study"
    | "security"
    | "star"
    | "idea"
    | "heart"
    | "magcup"
    | "beer"
    | "music"
    | "sports"
    | "travel";
};

export type DeleteRoomParam = {
  /** 退席するか、削除するか */
  action_type: "leave" | "delete";
};

export type GetRoomMembersParam = {};

export type PutRoomMembersParam = {
  /** 管理者権限のユーザー */
  members_admin_ids: string;

  /** メンバー権限のユーザー */
  members_member_ids?: string;

  /** 閲覧のみ権限のユーザー */
  members_readonly_ids?: string;
};

export type GetRoomMessagesParam = {
  /** 未取得にかかわらず最新の100件を取得するか */
  force?: 0 | 1;
};

export type PostRoomMessageParam = {
  /** メッセージ本文 */
  body: string;

  /** 追加したメッセージを自分から見て未読とするか */
  self_unread?: 0 | 1;
};

export type PutRoomMessagesReadParam = {
  /** ここで指定するIDのメッセージまでを既読にする。すでに既読済みの場合はエラー(400) */
  message_id?: string;
};

export type PutRoomMessagesUnreadParam = {
  /** ここで指定するIDのメッセージ以降を未読にする */
  message_id: string;
};

export type GetRoomMessageParam = {};

export type PutRoomMessageParam = {
  /** 更新するメッセージ本文 */
  body: string;
};

export type DeleteRoomMessageParam = {};

export type GetRoomTasksParam = {
  /** タスクの担当者のアカウントID */
  account_id?: number;

  /** タスクの依頼者のアカウントID */
  assigned_by_account_id?: number;

  /** タスクのステータス */
  status?: "open" | "done";
};

export type PostRoomTaskParam = {
  /** タスクの内容 */
  body: string;

  /** 担当者のアカウントID */
  to_ids: string;

  /** タスクの期限 */
  limit?: number;

  /** タスク期限の種別 */
  limit_type?: "none" | "date" | "time";
};

export type GetRoomTaskParam = {};

export type PutRoomTaskStatusParam = {
  /** タスク完了状態 */
  body: "open" | "done";
};

export type GetRoomFilesParam = {
  /** アップロードしたユーザーのアカウントID */
  account_id?: number;
};

export type PostRoomFileParam = {};

export type GetRoomFileParam = {
  /** ダウンロードする為のURLを生成するか */
  create_download_url?: 0 | 1;
};

export type GetRoomLinkParam = {};

export type PostRoomLinkParam = {
  /** リンク文字列 */
  code?: string;

  /** 承認要否 */
  need_acceptance?: 0 | 1;

  /** リンク説明文 */
  description?: string;
};

export type PutRoomLinkParam = {
  /** リンク文字列 */
  code?: string;

  /** 承認要否 */
  need_acceptance?: 0 | 1;

  /** リンク説明文 */
  description?: string;
};

export type DeleteRoomLinkParam = {};

export type GetIncomingRequestsParam = {};

export type PutIncomingRequestParam = {};

export type DeleteIncomingRequestParam = {};

export type GetMeResponse = {
  /**  */
  account_id: number;

  /**  */
  room_id: number;

  /**  */
  name: string;

  /**  */
  chatwork_id: string;

  /**  */
  organization_id: number;

  /**  */
  organization_name: string;

  /**  */
  department: string;

  /**  */
  title: string;

  /**  */
  url: string;

  /**  */
  introduction: string;

  /**  */
  mail: string;

  /**  */
  tel_organization: string;

  /**  */
  tel_extension: string;

  /**  */
  tel_mobile: string;

  /**  */
  skype: string;

  /**  */
  facebook: string;

  /**  */
  twitter: string;

  /**  */
  avatar_image_url: string;

  /**  */
  login_mail: string;
};

export type GetMyStatusResponse = {
  /**  */
  unread_room_num: number;

  /**  */
  mention_room_num: number;

  /**  */
  mytask_room_num: number;

  /**  */
  unread_num: number;

  /**  */
  mention_num: number;

  /**  */
  mytask_num: number;
};

export type GetMyTasksResponse = {
  /**  */
  task_id: number;

  /**  */
  room: {
    /**  */
    room_id: number;

    /**  */
    name: string;

    /**  */
    icon_path: string;
  };

  /**  */
  assigned_by_account: {
    /**  */
    account_id: number;

    /**  */
    name: string;

    /**  */
    avatar_image_url: string;
  };

  /**  */
  message_id: string;

  /**  */
  body: string;

  /**  */
  limit_time: number;

  /**  */
  status: "open" | "done";

  /**  */
  limit_type: "none" | "date" | "time";
}[];

export type GetContactsResponse = {
  /**  */
  account_id?: number;

  /**  */
  room_id?: number;

  /**  */
  name?: string;

  /**  */
  chatwork_id?: string;

  /**  */
  organization_id?: number;

  /**  */
  organization_name?: string;

  /**  */
  department?: string;

  /**  */
  avatar_image_url?: string;
}[];

export type GetRoomsResponse = {
  /**  */
  room_id: number;

  /**  */
  name: string;

  /**  */
  type: "my" | "direct" | "group";

  /**  */
  role: "admin" | "member" | "readonly";

  /**  */
  sticky: 0 | 1;

  /**  */
  unread_num: number;

  /**  */
  mention_num: number;

  /**  */
  mytask_num: number;

  /**  */
  message_num: number;

  /**  */
  file_num: number;

  /**  */
  task_num: number;

  /**  */
  icon_path: string;

  /**  */
  last_update_time: number;
}[];

export type PostRoomResponse = {
  /**  */
  room_id: number;
};

export type GetRoomResponse = {
  /**  */
  room_id: number;

  /**  */
  name: string;

  /**  */
  type: "my" | "direct" | "group";

  /**  */
  role: "admin" | "member" | "readonly";

  /**  */
  sticky: 0 | 1;

  /**  */
  unread_num: number;

  /**  */
  mention_num: number;

  /**  */
  mytask_num: number;

  /**  */
  message_num: number;

  /**  */
  file_num: number;

  /**  */
  task_num: number;

  /**  */
  icon_path: string;

  /**  */
  last_update_time: number;

  /**  */
  description: string;
};

export type PutRoomResponse = {
  /**  */
  room_id: number;
};

export type DeleteRoomResponse = any;

export type GetRoomMembersResponse = {
  /**  */
  account_id: number;

  /**  */
  role: "admin" | "member" | "readonly";

  /**  */
  name: string;

  /**  */
  chatwork_id: string;

  /**  */
  organization_id: number;

  /**  */
  organization_name: string;

  /**  */
  department: string;

  /**  */
  avatar_image_url: string;
}[];

export type PutRoomMembersResponse = {
  /**  */
  admin: number[];

  /**  */
  member: number[];

  /**  */
  readonly: number[];
};

export type GetRoomMessagesResponse = {
  /**  */
  message_id: string;

  /**  */
  account: {
    /**  */
    account_id: number;

    /**  */
    name: string;

    /**  */
    avatar_image_url: string;
  };

  /**  */
  body: string;

  /**  */
  send_time: number;

  /**  */
  update_time: number;
}[];

export type PostRoomMessageResponse = {
  /**  */
  message_id: string;
};

export type PutRoomMessagesReadResponse = {
  /**  */
  unread_num: number;

  /**  */
  mention_num: number;
};

export type PutRoomMessagesUnreadResponse = {
  /**  */
  unread_num: number;

  /**  */
  mention_num: number;
};

export type GetRoomMessageResponse = {
  /**  */
  message_id: string;

  /**  */
  account: {
    /**  */
    account_id: number;

    /**  */
    name: string;

    /**  */
    avatar_image_url: string;
  };

  /**  */
  body: string;

  /**  */
  send_time: number;

  /**  */
  update_time: number;
};

export type PutRoomMessageResponse = {
  /**  */
  message_id: string;
};

export type DeleteRoomMessageResponse = {
  /**  */
  message_id: string;
};

export type GetRoomTasksResponse = {
  /**  */
  task_id: number;

  /**  */
  account: {
    /**  */
    account_id: number;

    /**  */
    name: string;

    /**  */
    avatar_image_url: string;
  };

  /**  */
  assigned_by_account: {
    /**  */
    account_id: number;

    /**  */
    name: string;

    /**  */
    avatar_image_url: string;
  };

  /**  */
  message_id: string;

  /**  */
  body: string;

  /**  */
  limit_time: number;

  /**  */
  status: "open" | "done";

  /**  */
  limit_type: "none" | "date" | "time";
}[];

export type PostRoomTaskResponse = {
  /**  */
  task_ids: number[];
};

export type GetRoomTaskResponse = {
  /**  */
  task_id: number;

  /**  */
  account: {
    /**  */
    account_id: number;

    /**  */
    name: string;

    /**  */
    avatar_image_url: string;
  };

  /**  */
  assigned_by_account: {
    /**  */
    account_id: number;

    /**  */
    name: string;

    /**  */
    avatar_image_url: string;
  };

  /**  */
  message_id: string;

  /**  */
  body: string;

  /**  */
  limit_time: number;

  /**  */
  status: "open" | "done";

  /**  */
  limit_type: "none" | "date" | "time";
};

export type PutRoomTaskStatusResponse = {
  /**  */
  task_id: number;
};

export type GetRoomFilesResponse = {
  /**  */
  file_id: number;

  /**  */
  account: {
    /**  */
    account_id: number;

    /**  */
    name: string;

    /**  */
    avatar_image_url: string;
  };

  /**  */
  message_id: string;

  /**  */
  filename: string;

  /**  */
  filesize: number;

  /**  */
  upload_time: number;
}[];

export type PostRoomFileResponse = {
  /**  */
  file_id?: number;
};

export type GetRoomFileResponse = {
  /**  */
  file_id: number;

  /**  */
  account: {
    /**  */
    account_id: number;

    /**  */
    name: string;

    /**  */
    avatar_image_url: string;
  };

  /**  */
  message_id: string;

  /**  */
  filename: string;

  /**  */
  filesize: number;

  /**  */
  upload_time: number;

  /**  */
  download_url?: string;
};

export type GetRoomLinkResponse = {
  /**  */
  public: 0 | 1;

  /**  */
  url?: string;

  /**  */
  need_acceptance?: 0 | 1;

  /**  */
  description?: string;
};

export type PostRoomLinkResponse = {
  /**  */
  public: 0 | 1;

  /**  */
  url?: string;

  /**  */
  need_acceptance?: 0 | 1;

  /**  */
  description?: string;
};

export type PutRoomLinkResponse = {
  /**  */
  public: 0 | 1;

  /**  */
  url?: string;

  /**  */
  need_acceptance?: 0 | 1;

  /**  */
  description?: string;
};

export type DeleteRoomLinkResponse = {
  /**  */
  public: 0 | 1;

  /**  */
  url?: string;

  /**  */
  need_acceptance?: 0 | 1;

  /**  */
  description?: string;
};

export type GetIncomingRequestsResponse = {
  /**  */
  request_id: number;

  /**  */
  account_id: number;

  /**  */
  message: string;

  /**  */
  name: string;

  /**  */
  chatwork_id: string;

  /**  */
  organization_id: number;

  /**  */
  organization_name: string;

  /**  */
  department: string;

  /**  */
  avatar_image_url: string;
}[];

export type PutIncomingRequestResponse = {
  /**  */
  account_id: number;

  /**  */
  room_id: number;

  /**  */
  name: string;

  /**  */
  chatwork_id: string;

  /**  */
  organization_id: number;

  /**  */
  organization_name: string;

  /**  */
  department: string;

  /**  */
  avatar_image_url: string;
};

export type DeleteIncomingRequestResponse = any;

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

  constructor(private api_token: string) {
    this.headers = {
      "X-ChatWorkToken": this.api_token,
    };
  }

  private saveRateLimits(headers: any) {
    const rateLimits = Object.entries(headers).filter(([key, value]) =>
      key.startsWith("x-ratelimit"),
    );
    this._rateLimits = Object.fromEntries(rateLimits) as RateLimits;
  }

  private async get<T>(uri: string, params: any = {}) {
    const { data, headers } = await axios.get(CHATWORK_URL + uri, {
      headers: this.headers,
      params,
    });

    this.saveRateLimits(headers);

    return data as T;
  }

  private async post<T>(uri: string, params: any = {}) {
    const { data, headers } = await axios.post(
      CHATWORK_URL + uri,
      stringify(params),
      {
        headers: {
          ...this.headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    this.saveRateLimits(headers);

    return data as T;
  }

  private async delete<T>(uri: string, params: any = {}) {
    const { data, headers } = await axios.delete(CHATWORK_URL + uri, {
      headers: this.headers,
      params,
    });

    this.saveRateLimits(headers);

    return data as T;
  }

  private async put<T>(uri: string, params: any = {}) {
    const { data, headers } = await axios.put(
      CHATWORK_URL + uri,
      stringify(params),
      {
        headers: {
          ...this.headers,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    this.saveRateLimits(headers);

    return data as T;
  }

  /**
   * 自分自身の情報を取得
   */
  async getMe(params?: GetMeParam) {
    return await this.get<GetMeResponse>(`/me`, params);
  }

  /**
   * 自分の未読数、未読To数、未完了タスク数を返す
   */
  async getMyStatus(params?: GetMyStatusParam) {
    return await this.get<GetMyStatusResponse>(`/my/status`, params);
  }

  /**
   * 自分のタスク一覧を取得する。(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  async getMyTasks(params?: GetMyTasksParam) {
    return await this.get<GetMyTasksResponse>(`/my/tasks`, params);
  }

  /**
   * 自分のコンタクト一覧を取得
   */
  async getContacts(params?: GetContactsParam) {
    return await this.get<GetContactsResponse>(`/contacts`, params);
  }

  /**
   * 自分のチャット一覧の取得
   */
  async getRooms(params?: GetRoomsParam) {
    return await this.get<GetRoomsResponse>(`/rooms`, params);
  }

  /**
   * グループチャットを新規作成
   */
  async postRoom(params?: PostRoomParam) {
    return await this.post<PostRoomResponse>(`/rooms`, params);
  }

  /**
   * チャットの名前、アイコン、種類(my/direct/group)を取得
   */
  async getRoom(room_id: string | number, params?: GetRoomParam) {
    return await this.get<GetRoomResponse>(`/rooms/${room_id}`, params);
  }

  /**
   * チャットの名前、アイコンをアップデート
   */
  async putRoom(room_id: string | number, params?: PutRoomParam) {
    return await this.put<PutRoomResponse>(`/rooms/${room_id}`, params);
  }

  /**
   * グループチャットを退席/削除する
   */
  async deleteRoom(room_id: string | number, params?: DeleteRoomParam) {
    return await this.delete<DeleteRoomResponse>(`/rooms/${room_id}`, params);
  }

  /**
   * チャットのメンバー一覧を取得
   */
  async getRoomMembers(room_id: string | number, params?: GetRoomMembersParam) {
    return await this.get<GetRoomMembersResponse>(
      `/rooms/${room_id}/members`,
      params,
    );
  }

  /**
   * チャットのメンバーを一括変更
   */
  async putRoomMembers(room_id: string | number, params?: PutRoomMembersParam) {
    return await this.put<PutRoomMembersResponse>(
      `/rooms/${room_id}/members`,
      params,
    );
  }

  /**
   * チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)
   */
  async getRoomMessages(
    room_id: string | number,
    params?: GetRoomMessagesParam,
  ) {
    return await this.get<GetRoomMessagesResponse>(
      `/rooms/${room_id}/messages`,
      params,
    );
  }

  /**
   * チャットに新しいメッセージを追加
   */
  async postRoomMessage(
    room_id: string | number,
    params?: PostRoomMessageParam,
  ) {
    return await this.post<PostRoomMessageResponse>(
      `/rooms/${room_id}/messages`,
      params,
    );
  }

  /**
   * メッセージを既読にする
   */
  async putRoomMessagesRead(
    room_id: string | number,
    params?: PutRoomMessagesReadParam,
  ) {
    return await this.put<PutRoomMessagesReadResponse>(
      `/rooms/${room_id}/messages/read`,
      params,
    );
  }

  /**
   * メッセージを未読にする
   */
  async putRoomMessagesUnread(
    room_id: string | number,
    params?: PutRoomMessagesUnreadParam,
  ) {
    return await this.put<PutRoomMessagesUnreadResponse>(
      `/rooms/${room_id}/messages/unread`,
      params,
    );
  }

  /**
   * メッセージ情報を取得
   */
  async getRoomMessage(
    room_id: string | number,
    message_id: string | number,
    params?: GetRoomMessageParam,
  ) {
    return await this.get<GetRoomMessageResponse>(
      `/rooms/${room_id}/messages/${message_id}`,
      params,
    );
  }

  /**
   * チャットのメッセージを更新する。
   */
  async putRoomMessage(
    room_id: string | number,
    message_id: string | number,
    params?: PutRoomMessageParam,
  ) {
    return await this.put<PutRoomMessageResponse>(
      `/rooms/${room_id}/messages/${message_id}`,
      params,
    );
  }

  /**
   * メッセージを削除
   */
  async deleteRoomMessage(
    room_id: string | number,
    message_id: string | number,
    params?: DeleteRoomMessageParam,
  ) {
    return await this.delete<DeleteRoomMessageResponse>(
      `/rooms/${room_id}/messages/${message_id}`,
      params,
    );
  }

  /**
   * チャットのタスク一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  async getRoomTasks(room_id: string | number, params?: GetRoomTasksParam) {
    return await this.get<GetRoomTasksResponse>(
      `/rooms/${room_id}/tasks`,
      params,
    );
  }

  /**
   * チャットに新しいタスクを追加
   */
  async postRoomTask(room_id: string | number, params?: PostRoomTaskParam) {
    return await this.post<PostRoomTaskResponse>(
      `/rooms/${room_id}/tasks`,
      params,
    );
  }

  /**
   * タスク情報を取得
   */
  async getRoomTask(
    room_id: string | number,
    task_id: string | number,
    params?: GetRoomTaskParam,
  ) {
    return await this.get<GetRoomTaskResponse>(
      `/rooms/${room_id}/tasks/${task_id}`,
      params,
    );
  }

  /**
   * タスク完了状態を変更する
   */
  async putRoomTaskStatus(
    room_id: string | number,
    task_id: string | number,
    params?: PutRoomTaskStatusParam,
  ) {
    return await this.put<PutRoomTaskStatusResponse>(
      `/rooms/${room_id}/tasks/${task_id}/status`,
      params,
    );
  }

  /**
   * チャットのファイル一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  async getRoomFiles(room_id: string | number, params?: GetRoomFilesParam) {
    return await this.get<GetRoomFilesResponse>(
      `/rooms/${room_id}/files`,
      params,
    );
  }

  /**
   * チャットに新しいファイルをアップロード
   */
  async postRoomFile(room_id: string | number, params?: PostRoomFileParam) {
    return await this.post<PostRoomFileResponse>(
      `/rooms/${room_id}/files`,
      params,
    );
  }

  /**
   * ファイル情報を取得
   */
  async getRoomFile(
    room_id: string | number,
    file_id: string | number,
    params?: GetRoomFileParam,
  ) {
    return await this.get<GetRoomFileResponse>(
      `/rooms/${room_id}/files/${file_id}`,
      params,
    );
  }

  /**
   * 招待リンクを取得する
   */
  async getRoomLink(room_id: string | number, params?: GetRoomLinkParam) {
    return await this.get<GetRoomLinkResponse>(
      `/rooms/${room_id}/link`,
      params,
    );
  }

  /**
   * 招待リンクを作成する
   */
  async postRoomLink(room_id: string | number, params?: PostRoomLinkParam) {
    return await this.post<PostRoomLinkResponse>(
      `/rooms/${room_id}/link`,
      params,
    );
  }

  /**
   * 招待リンクの情報を変更する
   */
  async putRoomLink(room_id: string | number, params?: PutRoomLinkParam) {
    return await this.put<PutRoomLinkResponse>(
      `/rooms/${room_id}/link`,
      params,
    );
  }

  /**
   * 招待リンクを削除する
   */
  async deleteRoomLink(room_id: string | number, params?: DeleteRoomLinkParam) {
    return await this.delete<DeleteRoomLinkResponse>(
      `/rooms/${room_id}/link`,
      params,
    );
  }

  /**
   * 自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  async getIncomingRequests(params?: GetIncomingRequestsParam) {
    return await this.get<GetIncomingRequestsResponse>(
      `/incoming_requests`,
      params,
    );
  }

  /**
   * 自分に対するコンタクト承認依頼を承認する
   */
  async putIncomingRequest(
    request_id: string | number,
    params?: PutIncomingRequestParam,
  ) {
    return await this.put<PutIncomingRequestResponse>(
      `/incoming_requests/${request_id}`,
      params,
    );
  }

  /**
   * 自分に対するコンタクト承認依頼をキャンセルする
   */
  async deleteIncomingRequest(
    request_id: string | number,
    params?: DeleteIncomingRequestParam,
  ) {
    return await this.delete<DeleteIncomingRequestResponse>(
      `/incoming_requests/${request_id}`,
      params,
    );
  }
}
