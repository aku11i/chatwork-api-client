import { program } from "commander";

program
  .command("get-me")
  .description("自分自身の情報を取得")
  .action(() => {
    console.log("get-me");
  });

program
  .command("get-my-status")
  .description("自分の未読数、未読To数、未完了タスク数を返す")
  .action(() => {
    console.log("get-my-status");
  });

program
  .command("get-my-tasks")
  .description(
    "自分のタスク一覧を取得する。(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)",
  )
  .action(() => {
    console.log("get-my-tasks");
  });

program
  .command("get-contacts")
  .description("自分のコンタクト一覧を取得")
  .action(() => {
    console.log("get-contacts");
  });

program
  .command("get-rooms")
  .description("自分のチャット一覧の取得")
  .action(() => {
    console.log("get-rooms");
  });

program
  .command("post-room")
  .description("グループチャットを新規作成")
  .action(() => {
    console.log("post-room");
  });

program
  .command("get-room")
  .description("チャットの名前、アイコン、種類(my/direct/group)を取得")
  .action(() => {
    console.log("get-room");
  });

program
  .command("put-room")
  .description("チャットの名前、アイコンをアップデート")
  .action(() => {
    console.log("put-room");
  });

program
  .command("delete-room")
  .description("グループチャットを退席/削除する")
  .action(() => {
    console.log("delete-room");
  });

program
  .command("get-room-members")
  .description("チャットのメンバー一覧を取得")
  .action(() => {
    console.log("get-room-members");
  });

program
  .command("put-room-members")
  .description("チャットのメンバーを一括変更")
  .action(() => {
    console.log("put-room-members");
  });

program
  .command("get-room-messages")
  .description(
    "チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)",
  )
  .action(() => {
    console.log("get-room-messages");
  });

program
  .command("post-room-message")
  .description("チャットに新しいメッセージを追加")
  .action(() => {
    console.log("post-room-message");
  });

program
  .command("put-room-messages-read")
  .description("メッセージを既読にする")
  .action(() => {
    console.log("put-room-messages-read");
  });

program
  .command("put-room-messages-unread")
  .description("メッセージを未読にする")
  .action(() => {
    console.log("put-room-messages-unread");
  });

program
  .command("get-room-message")
  .description("メッセージ情報を取得")
  .action(() => {
    console.log("get-room-message");
  });

program
  .command("put-room-message")
  .description("チャットのメッセージを更新する。")
  .action(() => {
    console.log("put-room-message");
  });

program
  .command("delete-room-message")
  .description("メッセージを削除")
  .action(() => {
    console.log("delete-room-message");
  });

program
  .command("get-room-tasks")
  .description(
    "チャットのタスク一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)",
  )
  .action(() => {
    console.log("get-room-tasks");
  });

program
  .command("post-room-task")
  .description("チャットに新しいタスクを追加")
  .action(() => {
    console.log("post-room-task");
  });

program
  .command("get-room-task")
  .description("タスク情報を取得")
  .action(() => {
    console.log("get-room-task");
  });

program
  .command("put-room-task-status")
  .description("タスク完了状態を変更する")
  .action(() => {
    console.log("put-room-task-status");
  });

program
  .command("get-room-files")
  .description(
    "チャットのファイル一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)",
  )
  .action(() => {
    console.log("get-room-files");
  });

program
  .command("post-room-file")
  .description("チャットに新しいファイルをアップロード")
  .action(() => {
    console.log("post-room-file");
  });

program
  .command("get-room-file")
  .description("ファイル情報を取得")
  .action(() => {
    console.log("get-room-file");
  });

program
  .command("get-room-link")
  .description("招待リンクを取得する")
  .action(() => {
    console.log("get-room-link");
  });

program
  .command("post-room-link")
  .description("招待リンクを作成する")
  .action(() => {
    console.log("post-room-link");
  });

program
  .command("put-room-link")
  .description("招待リンクの情報を変更する")
  .action(() => {
    console.log("put-room-link");
  });

program
  .command("delete-room-link")
  .description("招待リンクを削除する")
  .action(() => {
    console.log("delete-room-link");
  });

program
  .command("get-incoming-requests")
  .description(
    "自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)",
  )
  .action(() => {
    console.log("get-incoming-requests");
  });

program
  .command("put-incoming-request")
  .description("自分に対するコンタクト承認依頼を承認する")
  .action(() => {
    console.log("put-incoming-request");
  });

program
  .command("delete-incoming-request")
  .description("自分に対するコンタクト承認依頼をキャンセルする")
  .action(() => {
    console.log("delete-incoming-request");
  });

program.parse(process.argv);
