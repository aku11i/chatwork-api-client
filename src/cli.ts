import { program } from "commander";
import ChatworkApi from ".";

type PrintType = "json";

function printResult(response: any, printType: PrintType) {
  console.log(response);
}

function printError(error: Error) {
  console.error("Error: " + error.message);
}

const api = new ChatworkApi();

program
  .command("get-me")
  .description("自分自身の情報を取得")
  .option("--api_token <api_token>", "Chatwork API Token")

  .action((cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getMe()
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-my-status")
  .description("自分の未読数、未読To数、未完了タスク数を返す")
  .option("--api_token <api_token>", "Chatwork API Token")

  .action((cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getMyStatus()
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-my-tasks")
  .description(
    "自分のタスク一覧を取得する。(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)",
  )
  .option("--api_token <api_token>", "Chatwork API Token")

  .option(
    "--assigned_by_account_id <assigned_by_account_id>",
    "<number> タスクの依頼者のアカウントID",
  )
  .option("--status <status>", "<string> タスクのステータス")
  .action((cmd) => {
    const { assigned_by_account_id, status } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getMyTasks({ assigned_by_account_id, status })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-contacts")
  .description("自分のコンタクト一覧を取得")
  .option("--api_token <api_token>", "Chatwork API Token")

  .action((cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getContacts()
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-rooms")
  .description("自分のチャット一覧の取得")
  .option("--api_token <api_token>", "Chatwork API Token")

  .action((cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRooms()
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room")
  .description("グループチャットを新規作成")
  .option("--api_token <api_token>", "Chatwork API Token")

  .requiredOption("--name <name>", "<string> <required> グループチャット名")
  .option("--description <description>", "<string> チャット概要")
  .option("--link <link>", "<0|1> 招待リンク作成")
  .option("--link_code <link_code>", "<string> リンク文字列")
  .option("--link_need_acceptance <link_need_acceptance>", "<0|1> 承認要否")
  .requiredOption(
    "--members_admin_ids <members_admin_ids>",
    "<string> <required> 管理者権限のユーザー",
  )
  .option(
    "--members_member_ids <members_member_ids>",
    "<string> メンバー権限のユーザー",
  )
  .option(
    "--members_readonly_ids <members_readonly_ids>",
    "<string> 閲覧のみ権限のユーザー",
  )
  .option("--icon_preset <icon_preset>", "<string> アイコン種類")
  .action((cmd) => {
    const {
      name,
      description,
      link,
      link_code,
      link_need_acceptance,
      members_admin_ids,
      members_member_ids,
      members_readonly_ids,
      icon_preset,
    } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .postRoom({
        name,
        description,
        link,
        link_code,
        link_need_acceptance,
        members_admin_ids,
        members_member_ids,
        members_readonly_ids,
        icon_preset,
      })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room")
  .description("チャットの名前、アイコン、種類(my/direct/group)を取得")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")

  .action((room_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRoom(room_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room")
  .description("チャットの名前、アイコンをアップデート")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .option("--name <name>", "<string> グループチャット名")
  .option("--description <description>", "<string> チャット概要")
  .option("--icon_preset <icon_preset>", "<string> アイコン種類")
  .action((room_id, cmd) => {
    const { name, description, icon_preset } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .putRoom(room_id, { name, description, icon_preset })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("delete-room")
  .description("グループチャットを退席/削除する")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .requiredOption(
    "--action_type <action_type>",
    "<string> <required> 退席するか、削除するか",
  )
  .action((room_id, cmd) => {
    const { action_type } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .deleteRoom(room_id, { action_type })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-members")
  .description("チャットのメンバー一覧を取得")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")

  .action((room_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRoomMembers(room_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-members")
  .description("チャットのメンバーを一括変更")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .requiredOption(
    "--members_admin_ids <members_admin_ids>",
    "<string> <required> 管理者権限のユーザー",
  )
  .option(
    "--members_member_ids <members_member_ids>",
    "<string> メンバー権限のユーザー",
  )
  .option(
    "--members_readonly_ids <members_readonly_ids>",
    "<string> 閲覧のみ権限のユーザー",
  )
  .action((room_id, cmd) => {
    const { members_admin_ids, members_member_ids, members_readonly_ids } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .putRoomMembers(room_id, {
        members_admin_ids,
        members_member_ids,
        members_readonly_ids,
      })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-messages")
  .description(
    "チャットのメッセージ一覧を取得。パラメータ未指定だと前回取得分からの差分のみを返します。(最大100件まで取得)",
  )
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .option("--force <force>", "<0|1> 未取得にかかわらず最新の100件を取得するか")
  .action((room_id, cmd) => {
    const { force } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRoomMessages(room_id, { force })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room-message")
  .description("チャットに新しいメッセージを追加")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .requiredOption("--body <body>", "<string> <required> メッセージ本文")
  .option(
    "--self_unread <self_unread>",
    "<0|1> 追加したメッセージを自分から見て未読とするか",
  )
  .action((room_id, cmd) => {
    const { body, self_unread } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .postRoomMessage(room_id, { body, self_unread })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-messages-read")
  .description("メッセージを既読にする")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .option(
    "--message_id <message_id>",
    "<string> ここで指定するIDのメッセージまでを既読にする。すでに既読済みの場合はエラー(400)",
  )
  .action((room_id, cmd) => {
    const { message_id } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .putRoomMessagesRead(room_id, { message_id })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-messages-unread")
  .description("メッセージを未読にする")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .requiredOption(
    "--message_id <message_id>",
    "<string> <required> ここで指定するIDのメッセージ以降を未読にする",
  )
  .action((room_id, cmd) => {
    const { message_id } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .putRoomMessagesUnread(room_id, { message_id })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-message")
  .description("メッセージ情報を取得")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .arguments("<message_id>")

  .action((room_id, message_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRoomMessage(room_id, message_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-message")
  .description("チャットのメッセージを更新する。")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .arguments("<message_id>")
  .requiredOption("--body <body>", "<string> <required> 更新するメッセージ本文")
  .action((room_id, message_id, cmd) => {
    const { body } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .putRoomMessage(room_id, message_id, { body })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("delete-room-message")
  .description("メッセージを削除")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .arguments("<message_id>")

  .action((room_id, message_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .deleteRoomMessage(room_id, message_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-tasks")
  .description(
    "チャットのタスク一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)",
  )
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .option("--account_id <account_id>", "<number> タスクの担当者のアカウントID")
  .option(
    "--assigned_by_account_id <assigned_by_account_id>",
    "<number> タスクの依頼者のアカウントID",
  )
  .option("--status <status>", "<string> タスクのステータス")
  .action((room_id, cmd) => {
    const { account_id, assigned_by_account_id, status } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRoomTasks(room_id, { account_id, assigned_by_account_id, status })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room-task")
  .description("チャットに新しいタスクを追加")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .requiredOption("--body <body>", "<string> <required> タスクの内容")
  .requiredOption(
    "--to_ids <to_ids>",
    "<string> <required> 担当者のアカウントID",
  )
  .option("--limit <limit>", "<number> タスクの期限")
  .option("--limit_type <limit_type>", "<string> タスク期限の種別")
  .action((room_id, cmd) => {
    const { body, to_ids, limit, limit_type } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .postRoomTask(room_id, { body, to_ids, limit, limit_type })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-task")
  .description("タスク情報を取得")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .arguments("<task_id>")

  .action((room_id, task_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRoomTask(room_id, task_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-task-status")
  .description("タスク完了状態を変更する")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .arguments("<task_id>")
  .requiredOption("--body <body>", "<string> <required> タスク完了状態")
  .action((room_id, task_id, cmd) => {
    const { body } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .putRoomTaskStatus(room_id, task_id, { body })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-files")
  .description(
    "チャットのファイル一覧を取得 (※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)",
  )
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .option(
    "--account_id <account_id>",
    "<number> アップロードしたユーザーのアカウントID",
  )
  .action((room_id, cmd) => {
    const { account_id } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRoomFiles(room_id, { account_id })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room-file")
  .description("チャットに新しいファイルをアップロード")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")

  .action((room_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .postRoomFile(room_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-file")
  .description("ファイル情報を取得")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .arguments("<file_id>")
  .option(
    "--create_download_url <create_download_url>",
    "<0|1> ダウンロードする為のURLを生成するか",
  )
  .action((room_id, file_id, cmd) => {
    const { create_download_url } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRoomFile(room_id, file_id, { create_download_url })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-link")
  .description("招待リンクを取得する")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")

  .action((room_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getRoomLink(room_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room-link")
  .description("招待リンクを作成する")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .option("--code <code>", "<string> リンク文字列")
  .option("--need_acceptance <need_acceptance>", "<0|1> 承認要否")
  .option("--description <description>", "<string> リンク説明文")
  .action((room_id, cmd) => {
    const { code, need_acceptance, description } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .postRoomLink(room_id, { code, need_acceptance, description })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-link")
  .description("招待リンクの情報を変更する")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")
  .option("--code <code>", "<string> リンク文字列")
  .option("--need_acceptance <need_acceptance>", "<0|1> 承認要否")
  .option("--description <description>", "<string> リンク説明文")
  .action((room_id, cmd) => {
    const { code, need_acceptance, description } = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .putRoomLink(room_id, { code, need_acceptance, description })
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("delete-room-link")
  .description("招待リンクを削除する")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<room_id>")

  .action((room_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .deleteRoomLink(room_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-incoming-requests")
  .description(
    "自分に対するコンタクト承認依頼一覧を取得する(※100件まで取得可能。今後、より多くのデータを取得する為のページネーションの仕組みを提供予定)",
  )
  .option("--api_token <api_token>", "Chatwork API Token")

  .action((cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .getIncomingRequests()
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-incoming-request")
  .description("自分に対するコンタクト承認依頼を承認する")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<request_id>")

  .action((request_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .putIncomingRequest(request_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("delete-incoming-request")
  .description("自分に対するコンタクト承認依頼をキャンセルする")
  .option("--api_token <api_token>", "Chatwork API Token")
  .arguments("<request_id>")

  .action((request_id, cmd) => {
    const {} = cmd;
    const { api_token } = cmd;
    if (api_token) {
      api.setApiToken(api_token);
    }
    api
      .deleteIncomingRequest(request_id)
      .then((response) => {
        printResult(response, "json");
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program.parse(process.argv);
