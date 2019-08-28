import axios from "axios";

export default class ChatworkApi {
  constructor(private api_token: string) {}

  /**
   * 自分自身の情報を取得
   */
  getMe(getMeParam: GetMeParam) {
    return axios.get(`/me`, {
      params: getMeParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * 自分の未読数、未読To数、未完了タスク数を返す
   */
  getMyStatus(getMyStatusParam: GetMyStatusParam) {
    return axios.get(`/my/status`, {
      params: getMyStatusParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * 自分のタスク一覧を取得する。(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  getMyTasks(getMyTasksParam: GetMyTasksParam) {
    return axios.get(`/my/tasks`, {
      params: getMyTasksParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * 自分のコンタクト一覧を取得
   */
  getContacts(getContactsParam: GetContactsParam) {
    return axios.get(`/contacts`, {
      params: getContactsParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットのメンバー一覧を取得
   */
  getRoomsWithRoomIdMembers(
    room_id: string,
    getRoomsWithRoomIdMembersParam: GetRoomsWithRoomIdMembersParam
  ) {
    return axios.get(`/rooms/${room_id}/members`, {
      params: getRoomsWithRoomIdMembersParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットのメンバーを一括変更
   */
  putRoomsWithRoomIdMembers(
    room_id: string,
    putRoomsWithRoomIdMembersParam: PutRoomsWithRoomIdMembersParam
  ) {
    return axios.put(
      `/rooms/${room_id}/members`,
      putRoomsWithRoomIdMembersParam,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );
  }

  /**
   * メッセージを既読にする
   */
  putRoomsWithRoomIdMessagesRead(
    room_id: string,
    putRoomsWithRoomIdMessagesReadParam: PutRoomsWithRoomIdMessagesReadParam
  ) {
    return axios.put(
      `/rooms/${room_id}/messages/read`,
      putRoomsWithRoomIdMessagesReadParam,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );
  }

  /**
   * メッセージを未読にする
   */
  putRoomsWithRoomIdMessagesUnread(
    room_id: string,
    putRoomsWithRoomIdMessagesUnreadParam: PutRoomsWithRoomIdMessagesUnreadParam
  ) {
    return axios.put(
      `/rooms/${room_id}/messages/unread`,
      putRoomsWithRoomIdMessagesUnreadParam,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );
  }

  /**
   * メッセージ情報を取得
   */
  getRoomsWithRoomIdMessagesWithMessageId(
    room_id: string,
    message_id: string,
    getRoomsWithRoomIdMessagesWithMessageIdParam: GetRoomsWithRoomIdMessagesWithMessageIdParam
  ) {
    return axios.get(`/rooms/${room_id}/messages/${message_id}`, {
      params: getRoomsWithRoomIdMessagesWithMessageIdParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットのメッセージを更新する。
   */
  putRoomsWithRoomIdMessagesWithMessageId(
    room_id: string,
    message_id: string,
    putRoomsWithRoomIdMessagesWithMessageIdParam: PutRoomsWithRoomIdMessagesWithMessageIdParam
  ) {
    return axios.put(
      `/rooms/${room_id}/messages/${message_id}`,
      putRoomsWithRoomIdMessagesWithMessageIdParam,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );
  }

  /**
   * メッセージを削除
   */
  deleteRoomsWithRoomIdMessagesWithMessageId(
    room_id: string,
    message_id: string,
    deleteRoomsWithRoomIdMessagesWithMessageIdParam: DeleteRoomsWithRoomIdMessagesWithMessageIdParam
  ) {
    return axios.delete(`/rooms/${room_id}/messages/${message_id}`, {
      params: deleteRoomsWithRoomIdMessagesWithMessageIdParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)
   */
  getRoomsWithRoomIdMessages(
    room_id: string,
    getRoomsWithRoomIdMessagesParam: GetRoomsWithRoomIdMessagesParam
  ) {
    return axios.get(`/rooms/${room_id}/messages`, {
      params: getRoomsWithRoomIdMessagesParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットに新しいメッセージを追加
   */
  postRoomsWithRoomIdMessages(
    room_id: string,
    postRoomsWithRoomIdMessagesParam: PostRoomsWithRoomIdMessagesParam
  ) {
    return axios.post(
      `/rooms/${room_id}/messages`,
      postRoomsWithRoomIdMessagesParam,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );
  }

  /**
   * タスク完了状態を変更する
   */
  putRoomsWithRoomIdTasksWithTaskIdStatus(
    room_id: string,
    task_id: string,
    putRoomsWithRoomIdTasksWithTaskIdStatusParam: PutRoomsWithRoomIdTasksWithTaskIdStatusParam
  ) {
    return axios.put(
      `/rooms/${room_id}/tasks/${task_id}/status`,
      putRoomsWithRoomIdTasksWithTaskIdStatusParam,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );
  }

  /**
   * タスク情報を取得
   */
  getRoomsWithRoomIdTasksWithTaskId(
    room_id: string,
    task_id: string,
    getRoomsWithRoomIdTasksWithTaskIdParam: GetRoomsWithRoomIdTasksWithTaskIdParam
  ) {
    return axios.get(`/rooms/${room_id}/tasks/${task_id}`, {
      params: getRoomsWithRoomIdTasksWithTaskIdParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットのタスク一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  getRoomsWithRoomIdTasks(
    room_id: string,
    getRoomsWithRoomIdTasksParam: GetRoomsWithRoomIdTasksParam
  ) {
    return axios.get(`/rooms/${room_id}/tasks`, {
      params: getRoomsWithRoomIdTasksParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットに新しいタスクを追加
   */
  postRoomsWithRoomIdTasks(
    room_id: string,
    postRoomsWithRoomIdTasksParam: PostRoomsWithRoomIdTasksParam
  ) {
    return axios.post(
      `/rooms/${room_id}/tasks`,
      postRoomsWithRoomIdTasksParam,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );
  }

  /**
   * ファイル情報を取得
   */
  getRoomsWithRoomIdFilesWithFileId(
    room_id: string,
    file_id: string,
    getRoomsWithRoomIdFilesWithFileIdParam: GetRoomsWithRoomIdFilesWithFileIdParam
  ) {
    return axios.get(`/rooms/${room_id}/files/${file_id}`, {
      params: getRoomsWithRoomIdFilesWithFileIdParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットのファイル一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  getRoomsWithRoomIdFiles(
    room_id: string,
    getRoomsWithRoomIdFilesParam: GetRoomsWithRoomIdFilesParam
  ) {
    return axios.get(`/rooms/${room_id}/files`, {
      params: getRoomsWithRoomIdFilesParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットに新しいファイルをアップロード
   */
  postRoomsWithRoomIdFiles(
    room_id: string,
    postRoomsWithRoomIdFilesParam: PostRoomsWithRoomIdFilesParam
  ) {
    return axios.post(
      `/rooms/${room_id}/files`,
      postRoomsWithRoomIdFilesParam,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );
  }

  /**
   * 招待リンクを取得する
   */
  getRoomsWithRoomIdLink(
    room_id: string,
    getRoomsWithRoomIdLinkParam: GetRoomsWithRoomIdLinkParam
  ) {
    return axios.get(`/rooms/${room_id}/link`, {
      params: getRoomsWithRoomIdLinkParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * 招待リンクを作成する
   */
  postRoomsWithRoomIdLink(
    room_id: string,
    postRoomsWithRoomIdLinkParam: PostRoomsWithRoomIdLinkParam
  ) {
    return axios.post(`/rooms/${room_id}/link`, postRoomsWithRoomIdLinkParam, {
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * 招待リンクの情報を変更する
   */
  putRoomsWithRoomIdLink(
    room_id: string,
    putRoomsWithRoomIdLinkParam: PutRoomsWithRoomIdLinkParam
  ) {
    return axios.put(`/rooms/${room_id}/link`, putRoomsWithRoomIdLinkParam, {
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * 招待リンクを削除する
   */
  deleteRoomsWithRoomIdLink(
    room_id: string,
    deleteRoomsWithRoomIdLinkParam: DeleteRoomsWithRoomIdLinkParam
  ) {
    return axios.delete(`/rooms/${room_id}/link`, {
      params: deleteRoomsWithRoomIdLinkParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットの名前、アイコン、種類(my/direct/group)を取得
   */
  getRoomsWithRoomId(
    room_id: string,
    getRoomsWithRoomIdParam: GetRoomsWithRoomIdParam
  ) {
    return axios.get(`/rooms/${room_id}`, {
      params: getRoomsWithRoomIdParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * チャットの名前、アイコンをアップデート
   */
  putRoomsWithRoomId(
    room_id: string,
    putRoomsWithRoomIdParam: PutRoomsWithRoomIdParam
  ) {
    return axios.put(`/rooms/${room_id}`, putRoomsWithRoomIdParam, {
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * グループチャットを退席/削除する
   */
  deleteRoomsWithRoomId(
    room_id: string,
    deleteRoomsWithRoomIdParam: DeleteRoomsWithRoomIdParam
  ) {
    return axios.delete(`/rooms/${room_id}`, {
      params: deleteRoomsWithRoomIdParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * 自分のチャット一覧の取得
   */
  getRooms(getRoomsParam: GetRoomsParam) {
    return axios.get(`/rooms`, {
      params: getRoomsParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * グループチャットを新規作成
   */
  postRooms(postRoomsParam: PostRoomsParam) {
    return axios.post(`/rooms`, postRoomsParam, {
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * 自分に対するコンタクト承認依頼を承認する
   */
  putIncomingRequestsWithRequestId(
    request_id: string,
    putIncomingRequestsWithRequestIdParam: PutIncomingRequestsWithRequestIdParam
  ) {
    return axios.put(
      `/incoming_requests/${request_id}`,
      putIncomingRequestsWithRequestIdParam,
      { headers: { "X-ChatWorkToken": this.api_token } }
    );
  }

  /**
   * 自分に対するコンタクト承認依頼をキャンセルする
   */
  deleteIncomingRequestsWithRequestId(
    request_id: string,
    deleteIncomingRequestsWithRequestIdParam: DeleteIncomingRequestsWithRequestIdParam
  ) {
    return axios.delete(`/incoming_requests/${request_id}`, {
      params: deleteIncomingRequestsWithRequestIdParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
  }

  /**
   * 自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
   */
  getIncomingRequests(getIncomingRequestsParam: GetIncomingRequestsParam) {
    return axios.get(`/incoming_requests`, {
      params: getIncomingRequestsParam,
      headers: { "X-ChatWorkToken": this.api_token }
    });
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
  assigned_by_account_id: number;

  /** タスクのステータス */
  status: "open" | "done";
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
  message_id: string;
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
  force: boolean;
}

/**
 * チャットに新しいメッセージを追加
 */
export interface PostRoomsWithRoomIdMessagesParam {
  /** メッセージ本文 */
  body: string;

  /** 追加したメッセージを自分から見て未読とするか */
  self_unread: boolean;
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
  account_id: number;

  /** タスクの依頼者のアカウントID */
  assigned_by_account_id: number;

  /** タスクのステータス */
  status: "open" | "done";
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
  limit: number;

  /** タスク期限の種別 */
  limit_type: "none" | "date" | "time";
}

/**
 * ファイル情報を取得
 */
export interface GetRoomsWithRoomIdFilesWithFileIdParam {
  /** ダウンロードする為のURLを生成するか */
  create_download_url: boolean;
}

/**
 * チャットのファイル一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
 */
export interface GetRoomsWithRoomIdFilesParam {
  /** アップロードしたユーザーのアカウントID */
  account_id: number;
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
  code: string;

  /** 承認要否 */
  need_acceptance: boolean;

  /** リンク説明文 */
  description: string;
}

/**
 * 招待リンクの情報を変更する
 */
export interface PutRoomsWithRoomIdLinkParam {
  /** リンク文字列 */
  code: string;

  /** 承認要否 */
  need_acceptance: boolean;

  /** リンク説明文 */
  description: string;
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
  name: string;

  /** チャット概要 */
  description: string;
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
  description: string;

  /** 招待リンク作成 */
  link: boolean;

  /** リンク文字列 */
  link_code: string;

  /** 承認要否 */
  link_need_acceptance: boolean;
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
