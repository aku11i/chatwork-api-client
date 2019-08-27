/**
 * 自分自身の情報を取得
 */
interface GetMeParam {}

/**
 * 自分の未読数、未読To数、未完了タスク数を返す
 */
interface GetMyStatusParam {}

/**
 * 自分のタスク一覧を取得する。(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
 */
interface GetMyTasksParam {
  /** タスクの依頼者のアカウントID */
  assigned_by_account_id: number;

  /** タスクのステータス */
  status: "open" | "done";
}

/**
 * 自分のコンタクト一覧を取得
 */
interface GetContactsParam {}

/**
 * チャットのメンバー一覧を取得
 */
interface GetRoomsMembersParam {}

/**
 * チャットのメンバーを一括変更
 */
interface PutRoomsMembersParam {}

/**
 * メッセージを既読にする
 */
interface PutRoomsMessagesReadParam {
  /** ここで指定するIDのメッセージまでを既読にする。すでに既読済みの場合はエラー(400) */
  message_id: string;
}

/**
 * メッセージを未読にする
 */
interface PutRoomsMessagesUnreadParam {
  /** ここで指定するIDのメッセージ以降を未読にする */
  message_id: string;
}

/**
 * メッセージ情報を取得
 */
interface GetRoomsParam {}

/**
 * チャットのメッセージを更新する。
 */
interface PutRoomsParam {
  /** 更新するメッセージ本文 */
  body: string;
}

/**
 * メッセージを削除
 */
interface DeleteRoomsParam {}

/**
 * チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)
 */
interface GetRoomsMessagesParam {
  /** 未取得にかかわらず最新の100件を取得するか */
  force: boolean;
}

/**
 * チャットに新しいメッセージを追加
 */
interface PostRoomsMessagesParam {
  /** メッセージ本文 */
  body: string;

  /** 追加したメッセージを自分から見て未読とするか */
  self_unread: boolean;
}

/**
 * タスク完了状態を変更する
 */
interface PutRoomsStatusParam {
  /** タスク完了状態 */
  body: "open" | "done";
}

/**
 * タスク情報を取得
 */
interface GetRoomsParam {}

/**
 * チャットのタスク一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
 */
interface GetRoomsTasksParam {
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
interface PostRoomsTasksParam {
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
interface GetRoomsParam {
  /** ダウンロードする為のURLを生成するか */
  create_download_url: boolean;
}

/**
 * チャットのファイル一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
 */
interface GetRoomsFilesParam {
  /** アップロードしたユーザーのアカウントID */
  account_id: number;
}

/**
 * チャットに新しいファイルをアップロード
 */
interface PostRoomsFilesParam {}

/**
 * 招待リンクを取得する
 */
interface GetRoomsLinkParam {}

/**
 * 招待リンクを作成する
 */
interface PostRoomsLinkParam {
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
interface PutRoomsLinkParam {
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
interface DeleteRoomsLinkParam {}

/**
 * チャットの名前、アイコン、種類(my/direct/group)を取得
 */
interface GetRoomsParam {}

/**
 * チャットの名前、アイコンをアップデート
 */
interface PutRoomsParam {
  /** グループチャット名 */
  name: string;

  /** チャット概要 */
  description: string;
}

/**
 * グループチャットを退席/削除する
 */
interface DeleteRoomsParam {
  /** 退席するか、削除するか */
  action_type: "leave" | "delete";
}

/**
 * 自分のチャット一覧の取得
 */
interface GetRoomsParam {}

/**
 * グループチャットを新規作成
 */
interface PostRoomsParam {
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
interface PutIncomingRequestsParam {}

/**
 * 自分に対するコンタクト承認依頼をキャンセルする
 */
interface DeleteIncomingRequestsParam {}

/**
 * 自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)
 */
interface GetIncomingRequestsParam {}

interface GetMyStatusResponse {
  unread_room_num: number;
  mention_room_num: number;
  mytask_room_num: number;
  unread_num: number;
  mention_num: number;
  mytask_num: number;
}

interface PutRoomsMembersResponse {
  admin: number[];
  member: number[];
  readonly: number[];
}

interface PutRoomsMessagesReadResponse {
  unread_num: number;
  mention_num: number;
}

interface PutRoomsMessagesUnreadResponse {
  unread_num: number;
  mention_num: number;
}

interface PutRoomsResponse {
  message_id: string;
}

interface DeleteRoomsResponse {
  message_id: string;
}

interface PostRoomsMessagesResponse {
  message_id: string;
}

interface PutRoomsStatusResponse {
  task_id: number;
}

interface PostRoomsTasksResponse {
  task_ids: number[];
}

interface PostRoomsFilesResponse {
  file_id: number;
}

interface PostRoomsLinkResponse {
  public: boolean;
  url: string;
  need_acceptance: boolean;
  description: string;
}

interface PutRoomsLinkResponse {
  public: boolean;
  url: string;
  need_acceptance: boolean;
  description: string;
}

interface DeleteRoomsLinkResponse {
  public: boolean;
}

interface PutRoomsResponse {
  room_id: number;
}

interface PostRoomsResponse {
  room_id: number;
}
