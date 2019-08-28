import axios from "axios";

export default class ChatworkApi {
  constructor(private api_token: string) {}

  /**
   * 自分自身の情報を取得
   */
  async getMe(getMeParam: GetMeParam = {}) {
    const { data } = await axios.get(`https://api.chatwork.com/v2/me`, {
      params: getMeParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });

    return data;
  }

  /**
   * 自分の未読数、未読To数、未完了タスク数を返す
   */
  async getMyStatus(getMyStatusParam: GetMyStatusParam = {}) {
    const { data } = await axios.get(`https://api.chatwork.com/v2/my/status`, {
      params: getMyStatusParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });

    return data as GetMyStatusResponse;
  }

  /**
   * 自分のタスク一覧を取得する。(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  async getMyTasks(getMyTasksParam: GetMyTasksParam) {
    const { data } = await axios.get(`https://api.chatwork.com/v2/my/tasks`, {
      params: getMyTasksParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });

    return data;
  }

  /**
   * 自分のコンタクト一覧を取得
   */
  async getContacts(getContactsParam: GetContactsParam = {}) {
    const { data } = await axios.get(`https://api.chatwork.com/v2/contacts`, {
      params: getContactsParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });

    return data;
  }

  /**
   * チャットのメンバー一覧を取得
   */
  async getRoomsWithRoomIdMembers(
    room_id: string,
    getRoomsWithRoomIdMembersParam: GetRoomsWithRoomIdMembersParam = {}
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/rooms/${room_id}/members`,
      {
        params: getRoomsWithRoomIdMembersParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * チャットのメンバーを一括変更
   */
  async putRoomsWithRoomIdMembers(
    room_id: string,
    putRoomsWithRoomIdMembersParam: PutRoomsWithRoomIdMembersParam = {}
  ) {
    const params = new URLSearchParams();
    Object.entries(putRoomsWithRoomIdMembersParam).forEach(([key, value]) =>
      params.set(key, value)
    );
    const { data } = await axios.put(
      `https://api.chatwork.com/v2/rooms/${room_id}/members`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PutRoomsWithRoomIdMembersResponse;
  }

  /**
   * メッセージを既読にする
   */
  async putRoomsWithRoomIdMessagesRead(
    room_id: string,
    putRoomsWithRoomIdMessagesReadParam: PutRoomsWithRoomIdMessagesReadParam
  ) {
    const params = new URLSearchParams();
    Object.entries(putRoomsWithRoomIdMessagesReadParam).forEach(
      ([key, value]) => params.set(key, value)
    );
    const { data } = await axios.put(
      `https://api.chatwork.com/v2/rooms/${room_id}/messages/read`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PutRoomsWithRoomIdMessagesReadResponse;
  }

  /**
   * メッセージを未読にする
   */
  async putRoomsWithRoomIdMessagesUnread(
    room_id: string,
    putRoomsWithRoomIdMessagesUnreadParam: PutRoomsWithRoomIdMessagesUnreadParam
  ) {
    const params = new URLSearchParams();
    Object.entries(putRoomsWithRoomIdMessagesUnreadParam).forEach(
      ([key, value]) => params.set(key, value)
    );
    const { data } = await axios.put(
      `https://api.chatwork.com/v2/rooms/${room_id}/messages/unread`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PutRoomsWithRoomIdMessagesUnreadResponse;
  }

  /**
   * メッセージ情報を取得
   */
  async getRoomsWithRoomIdMessagesWithMessageId(
    room_id: string,
    message_id: string,
    getRoomsWithRoomIdMessagesWithMessageIdParam: GetRoomsWithRoomIdMessagesWithMessageIdParam = {}
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/rooms/${room_id}/messages/${message_id}`,
      {
        params: getRoomsWithRoomIdMessagesWithMessageIdParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * チャットのメッセージを更新する。
   */
  async putRoomsWithRoomIdMessagesWithMessageId(
    room_id: string,
    message_id: string,
    putRoomsWithRoomIdMessagesWithMessageIdParam: PutRoomsWithRoomIdMessagesWithMessageIdParam
  ) {
    const params = new URLSearchParams();
    Object.entries(putRoomsWithRoomIdMessagesWithMessageIdParam).forEach(
      ([key, value]) => params.set(key, value)
    );
    const { data } = await axios.put(
      `https://api.chatwork.com/v2/rooms/${room_id}/messages/${message_id}`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PutRoomsWithRoomIdMessagesWithMessageIdResponse;
  }

  /**
   * メッセージを削除
   */
  async deleteRoomsWithRoomIdMessagesWithMessageId(
    room_id: string,
    message_id: string,
    deleteRoomsWithRoomIdMessagesWithMessageIdParam: DeleteRoomsWithRoomIdMessagesWithMessageIdParam = {}
  ) {
    const { data } = await axios.delete(
      `https://api.chatwork.com/v2/rooms/${room_id}/messages/${message_id}`,
      {
        params: deleteRoomsWithRoomIdMessagesWithMessageIdParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data as DeleteRoomsWithRoomIdMessagesWithMessageIdResponse;
  }

  /**
   * チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)
   */
  async getRoomsWithRoomIdMessages(
    room_id: string,
    getRoomsWithRoomIdMessagesParam: GetRoomsWithRoomIdMessagesParam
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/rooms/${room_id}/messages`,
      {
        params: getRoomsWithRoomIdMessagesParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * チャットに新しいメッセージを追加
   */
  async postRoomsWithRoomIdMessages(
    room_id: string,
    postRoomsWithRoomIdMessagesParam: PostRoomsWithRoomIdMessagesParam
  ) {
    const params = new URLSearchParams();
    Object.entries(postRoomsWithRoomIdMessagesParam).forEach(([key, value]) =>
      params.set(key, value)
    );
    const { data } = await axios.post(
      `https://api.chatwork.com/v2/rooms/${room_id}/messages`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PostRoomsWithRoomIdMessagesResponse;
  }

  /**
   * タスク完了状態を変更する
   */
  async putRoomsWithRoomIdTasksWithTaskIdStatus(
    room_id: string,
    task_id: string,
    putRoomsWithRoomIdTasksWithTaskIdStatusParam: PutRoomsWithRoomIdTasksWithTaskIdStatusParam
  ) {
    const params = new URLSearchParams();
    Object.entries(putRoomsWithRoomIdTasksWithTaskIdStatusParam).forEach(
      ([key, value]) => params.set(key, value)
    );
    const { data } = await axios.put(
      `https://api.chatwork.com/v2/rooms/${room_id}/tasks/${task_id}/status`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PutRoomsWithRoomIdTasksWithTaskIdStatusResponse;
  }

  /**
   * タスク情報を取得
   */
  async getRoomsWithRoomIdTasksWithTaskId(
    room_id: string,
    task_id: string,
    getRoomsWithRoomIdTasksWithTaskIdParam: GetRoomsWithRoomIdTasksWithTaskIdParam = {}
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/rooms/${room_id}/tasks/${task_id}`,
      {
        params: getRoomsWithRoomIdTasksWithTaskIdParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * チャットのタスク一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  async getRoomsWithRoomIdTasks(
    room_id: string,
    getRoomsWithRoomIdTasksParam: GetRoomsWithRoomIdTasksParam
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/rooms/${room_id}/tasks`,
      {
        params: getRoomsWithRoomIdTasksParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * チャットに新しいタスクを追加
   */
  async postRoomsWithRoomIdTasks(
    room_id: string,
    postRoomsWithRoomIdTasksParam: PostRoomsWithRoomIdTasksParam
  ) {
    const params = new URLSearchParams();
    Object.entries(postRoomsWithRoomIdTasksParam).forEach(([key, value]) =>
      params.set(key, value)
    );
    const { data } = await axios.post(
      `https://api.chatwork.com/v2/rooms/${room_id}/tasks`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PostRoomsWithRoomIdTasksResponse;
  }

  /**
   * ファイル情報を取得
   */
  async getRoomsWithRoomIdFilesWithFileId(
    room_id: string,
    file_id: string,
    getRoomsWithRoomIdFilesWithFileIdParam: GetRoomsWithRoomIdFilesWithFileIdParam
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/rooms/${room_id}/files/${file_id}`,
      {
        params: getRoomsWithRoomIdFilesWithFileIdParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * チャットのファイル一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  async getRoomsWithRoomIdFiles(
    room_id: string,
    getRoomsWithRoomIdFilesParam: GetRoomsWithRoomIdFilesParam
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/rooms/${room_id}/files`,
      {
        params: getRoomsWithRoomIdFilesParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * チャットに新しいファイルをアップロード
   */
  async postRoomsWithRoomIdFiles(
    room_id: string,
    postRoomsWithRoomIdFilesParam: PostRoomsWithRoomIdFilesParam = {}
  ) {
    const params = new URLSearchParams();
    Object.entries(postRoomsWithRoomIdFilesParam).forEach(([key, value]) =>
      params.set(key, value)
    );
    const { data } = await axios.post(
      `https://api.chatwork.com/v2/rooms/${room_id}/files`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PostRoomsWithRoomIdFilesResponse;
  }

  /**
   * 招待リンクを取得する
   */
  async getRoomsWithRoomIdLink(
    room_id: string,
    getRoomsWithRoomIdLinkParam: GetRoomsWithRoomIdLinkParam = {}
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/rooms/${room_id}/link`,
      {
        params: getRoomsWithRoomIdLinkParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * 招待リンクを作成する
   */
  async postRoomsWithRoomIdLink(
    room_id: string,
    postRoomsWithRoomIdLinkParam: PostRoomsWithRoomIdLinkParam
  ) {
    const params = new URLSearchParams();
    Object.entries(postRoomsWithRoomIdLinkParam).forEach(([key, value]) =>
      params.set(key, value)
    );
    const { data } = await axios.post(
      `https://api.chatwork.com/v2/rooms/${room_id}/link`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PostRoomsWithRoomIdLinkResponse;
  }

  /**
   * 招待リンクの情報を変更する
   */
  async putRoomsWithRoomIdLink(
    room_id: string,
    putRoomsWithRoomIdLinkParam: PutRoomsWithRoomIdLinkParam
  ) {
    const params = new URLSearchParams();
    Object.entries(putRoomsWithRoomIdLinkParam).forEach(([key, value]) =>
      params.set(key, value)
    );
    const { data } = await axios.put(
      `https://api.chatwork.com/v2/rooms/${room_id}/link`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PutRoomsWithRoomIdLinkResponse;
  }

  /**
   * 招待リンクを削除する
   */
  async deleteRoomsWithRoomIdLink(
    room_id: string,
    deleteRoomsWithRoomIdLinkParam: DeleteRoomsWithRoomIdLinkParam = {}
  ) {
    const { data } = await axios.delete(
      `https://api.chatwork.com/v2/rooms/${room_id}/link`,
      {
        params: deleteRoomsWithRoomIdLinkParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data as DeleteRoomsWithRoomIdLinkResponse;
  }

  /**
   * チャットの名前、アイコン、種類(my/direct/group)を取得
   */
  async getRoomsWithRoomId(
    room_id: string,
    getRoomsWithRoomIdParam: GetRoomsWithRoomIdParam = {}
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/rooms/${room_id}`,
      {
        params: getRoomsWithRoomIdParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * チャットの名前、アイコンをアップデート
   */
  async putRoomsWithRoomId(
    room_id: string,
    putRoomsWithRoomIdParam: PutRoomsWithRoomIdParam
  ) {
    const params = new URLSearchParams();
    Object.entries(putRoomsWithRoomIdParam).forEach(([key, value]) =>
      params.set(key, value)
    );
    const { data } = await axios.put(
      `https://api.chatwork.com/v2/rooms/${room_id}`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PutRoomsWithRoomIdResponse;
  }

  /**
   * グループチャットを退席/削除する
   */
  async deleteRoomsWithRoomId(
    room_id: string,
    deleteRoomsWithRoomIdParam: DeleteRoomsWithRoomIdParam
  ) {
    const { data } = await axios.delete(
      `https://api.chatwork.com/v2/rooms/${room_id}`,
      {
        params: deleteRoomsWithRoomIdParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * 自分のチャット一覧の取得
   */
  async getRooms(getRoomsParam: GetRoomsParam = {}) {
    const { data } = await axios.get(`https://api.chatwork.com/v2/rooms`, {
      params: getRoomsParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });

    return data;
  }

  /**
   * グループチャットを新規作成
   */
  async postRooms(postRoomsParam: PostRoomsParam) {
    const params = new URLSearchParams();
    Object.entries(postRoomsParam).forEach(([key, value]) =>
      params.set(key, value)
    );
    const { data } = await axios.post(
      `https://api.chatwork.com/v2/rooms`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data as PostRoomsResponse;
  }

  /**
   * 自分に対するコンタクト承認依頼を承認する
   */
  async putIncomingRequestsWithRequestId(
    request_id: string,
    putIncomingRequestsWithRequestIdParam: PutIncomingRequestsWithRequestIdParam = {}
  ) {
    const params = new URLSearchParams();
    Object.entries(putIncomingRequestsWithRequestIdParam).forEach(
      ([key, value]) => params.set(key, value)
    );
    const { data } = await axios.put(
      `https://api.chatwork.com/v2/incoming_requests/${request_id}`,
      params,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );

    return data;
  }

  /**
   * 自分に対するコンタクト承認依頼をキャンセルする
   */
  async deleteIncomingRequestsWithRequestId(
    request_id: string,
    deleteIncomingRequestsWithRequestIdParam: DeleteIncomingRequestsWithRequestIdParam = {}
  ) {
    const { data } = await axios.delete(
      `https://api.chatwork.com/v2/incoming_requests/${request_id}`,
      {
        params: deleteIncomingRequestsWithRequestIdParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }

  /**
   * 自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  async getIncomingRequests(
    getIncomingRequestsParam: GetIncomingRequestsParam = {}
  ) {
    const { data } = await axios.get(
      `https://api.chatwork.com/v2/incoming_requests`,
      {
        params: getIncomingRequestsParam,
        headers: { "X-ChatWorkToken": this.api_token }
      }
    );

    return data;
  }
}

/**
 * 自分自身の情報を取得
 */
export interface GetMeParam {}

/**
 * 自分の未読数、未読To数、未完了タスク数を返す
 */
export interface GetMyStatusParam {}

/**
 * 自分のタスク一覧を取得する。(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
 */
export interface GetMyTasksParam {
  /** タスクの依頼者のアカウントID */
  assigned_by_account_id?: number;

  /** タスクのステータス */
  status?: "open" | "done";
}

/**
 * 自分のコンタクト一覧を取得
 */
export interface GetContactsParam {}

/**
 * チャットのメンバー一覧を取得
 */
export interface GetRoomsWithRoomIdMembersParam {}

/**
 * チャットのメンバーを一括変更
 */
export interface PutRoomsWithRoomIdMembersParam {}

/**
 * メッセージを既読にする
 */
export interface PutRoomsWithRoomIdMessagesReadParam {
  /** ここで指定するIDのメッセージまでを既読にする。すでに既読済みの場合はエラー(400) */
  message_id?: string;
}

/**
 * メッセージを未読にする
 */
export interface PutRoomsWithRoomIdMessagesUnreadParam {
  /** ここで指定するIDのメッセージ以降を未読にする */
  message_id: string;
}

/**
 * メッセージ情報を取得
 */
export interface GetRoomsWithRoomIdMessagesWithMessageIdParam {}

/**
 * チャットのメッセージを更新する。
 */
export interface PutRoomsWithRoomIdMessagesWithMessageIdParam {
  /** 更新するメッセージ本文 */
  body: string;
}

/**
 * メッセージを削除
 */
export interface DeleteRoomsWithRoomIdMessagesWithMessageIdParam {}

/**
 * チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)
 */
export interface GetRoomsWithRoomIdMessagesParam {
  /** 未取得にかかわらず最新の100件を取得するか */
  force?: 0 | 1;
}

/**
 * チャットに新しいメッセージを追加
 */
export interface PostRoomsWithRoomIdMessagesParam {
  /** メッセージ本文 */
  body: string;

  /** 追加したメッセージを自分から見て未読とするか */
  self_unread?: 0 | 1;
}

/**
 * タスク完了状態を変更する
 */
export interface PutRoomsWithRoomIdTasksWithTaskIdStatusParam {
  /** タスク完了状態 */
  body: "open" | "done";
}

/**
 * タスク情報を取得
 */
export interface GetRoomsWithRoomIdTasksWithTaskIdParam {}

/**
 * チャットのタスク一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
 */
export interface GetRoomsWithRoomIdTasksParam {
  /** タスクの担当者のアカウントID */
  account_id?: number;

  /** タスクの依頼者のアカウントID */
  assigned_by_account_id?: number;

  /** タスクのステータス */
  status?: "open" | "done";
}

/**
 * チャットに新しいタスクを追加
 */
export interface PostRoomsWithRoomIdTasksParam {
  /** タスクの内容 */
  body: string;

  /** 担当者のアカウントID */
  to_ids: string;

  /** タスクの期限 */
  limit?: number;

  /** タスク期限の種別 */
  limit_type?: "none" | "date" | "time";
}

/**
 * ファイル情報を取得
 */
export interface GetRoomsWithRoomIdFilesWithFileIdParam {
  /** ダウンロードする為のURLを生成するか */
  create_download_url?: 0 | 1;
}

/**
 * チャットのファイル一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
 */
export interface GetRoomsWithRoomIdFilesParam {
  /** アップロードしたユーザーのアカウントID */
  account_id?: number;
}

/**
 * チャットに新しいファイルをアップロード
 */
export interface PostRoomsWithRoomIdFilesParam {}

/**
 * 招待リンクを取得する
 */
export interface GetRoomsWithRoomIdLinkParam {}

/**
 * 招待リンクを作成する
 */
export interface PostRoomsWithRoomIdLinkParam {
  /** リンク文字列 */
  code?: string;

  /** 承認要否 */
  need_acceptance?: 0 | 1;

  /** リンク説明文 */
  description?: string;
}

/**
 * 招待リンクの情報を変更する
 */
export interface PutRoomsWithRoomIdLinkParam {
  /** リンク文字列 */
  code?: string;

  /** 承認要否 */
  need_acceptance?: 0 | 1;

  /** リンク説明文 */
  description?: string;
}

/**
 * 招待リンクを削除する
 */
export interface DeleteRoomsWithRoomIdLinkParam {}

/**
 * チャットの名前、アイコン、種類(my/direct/group)を取得
 */
export interface GetRoomsWithRoomIdParam {}

/**
 * チャットの名前、アイコンをアップデート
 */
export interface PutRoomsWithRoomIdParam {
  /** グループチャット名 */
  name?: string;

  /** チャット概要 */
  description?: string;
}

/**
 * グループチャットを退席/削除する
 */
export interface DeleteRoomsWithRoomIdParam {
  /** 退席するか、削除するか */
  action_type: "leave" | "delete";
}

/**
 * 自分のチャット一覧の取得
 */
export interface GetRoomsParam {}

/**
 * グループチャットを新規作成
 */
export interface PostRoomsParam {
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
}

/**
 * 自分に対するコンタクト承認依頼を承認する
 */
export interface PutIncomingRequestsWithRequestIdParam {}

/**
 * 自分に対するコンタクト承認依頼をキャンセルする
 */
export interface DeleteIncomingRequestsWithRequestIdParam {}

/**
 * 自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
 */
export interface GetIncomingRequestsParam {}

export interface GetMyStatusResponse {
  unread_room_num: number;
  mention_room_num: number;
  mytask_room_num: number;
  unread_num: number;
  mention_num: number;
  mytask_num: number;
}

export interface PutRoomsWithRoomIdMembersResponse {
  admin: number[];
  member: number[];
  readonly: number[];
}

export interface PutRoomsWithRoomIdMessagesReadResponse {
  unread_num: number;
  mention_num: number;
}

export interface PutRoomsWithRoomIdMessagesUnreadResponse {
  unread_num: number;
  mention_num: number;
}

export interface PutRoomsWithRoomIdMessagesWithMessageIdResponse {
  message_id: string;
}

export interface DeleteRoomsWithRoomIdMessagesWithMessageIdResponse {
  message_id: string;
}

export interface PostRoomsWithRoomIdMessagesResponse {
  message_id: string;
}

export interface PutRoomsWithRoomIdTasksWithTaskIdStatusResponse {
  task_id: number;
}

export interface PostRoomsWithRoomIdTasksResponse {
  task_ids: number[];
}

export interface PostRoomsWithRoomIdFilesResponse {
  file_id: number;
}

export interface PostRoomsWithRoomIdLinkResponse {
  public: boolean;
  url: string;
  need_acceptance: boolean;
  description: string;
}

export interface PutRoomsWithRoomIdLinkResponse {
  public: boolean;
  url: string;
  need_acceptance: boolean;
  description: string;
}

export interface DeleteRoomsWithRoomIdLinkResponse {
  public: boolean;
}

export interface PutRoomsWithRoomIdResponse {
  room_id: number;
}

export interface PostRoomsResponse {
  room_id: number;
}
