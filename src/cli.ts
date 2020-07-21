import { program } from "commander";
import ChatworkApi from ".";
import { readFileSync } from "fs";

const packageJson = require("../package.json");
program.version(packageJson.version);

type PrintFormat = "table" | "json";

function printResult(response: any, format: PrintFormat) {
  switch (format) {
    case "table": {
      console.table(response);
      break;
    }
    case "json": {
      console.log(JSON.stringify(response, undefined, 2));
      break;
    }
  }
}

function printError(error: Error) {
  console.error("Error: " + error.message);
}

const api = new ChatworkApi(process.env.CHATWORK_API_TOKEN);

program
  .command("get-me")
  .description("自分自身の情報を取得")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )

  .action((cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getMe()
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-my-status")
  .description("自分の未読数、未読To数、未完了タスク数を返す")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )

  .action((cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getMyStatus()
      .then((response) => {
        printResult(response, format);
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
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )

  .option(
    "--assigned_by_account_id <assigned_by_account_id>",
    "<number> タスクの依頼者のアカウントID",
  )
  .option("--status <status>", "<open|done> タスクのステータス")
  .action((cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { assigned_by_account_id, status } = cmd;

    api
      .getMyTasks({ assigned_by_account_id, status })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-contacts")
  .description("自分のコンタクト一覧を取得")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )

  .action((cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getContacts()
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-rooms")
  .description("自分のチャット一覧の取得")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )

  .action((cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getRooms()
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room")
  .description("グループチャットを新規作成")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )

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
  .option(
    "--icon_preset <icon_preset>",
    "<group|check|document|meeting|event|project|business|study|security|star|idea|heart|magcup|beer|music|sports|travel> アイコン種類",
  )
  .action((cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

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
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room")
  .description("チャットの名前、アイコン、種類(my/direct/group)を取得")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")

  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getRoom(room_id)
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room")
  .description("チャットの名前、アイコンをアップデート")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .option("--name <name>", "<string> グループチャット名")
  .option("--description <description>", "<string> チャット概要")
  .option(
    "--icon_preset <icon_preset>",
    "<group|check|document|meeting|event|project|business|study|security|star|idea|heart|magcup|beer|music|sports|travel> アイコン種類",
  )
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { name, description, icon_preset } = cmd;

    api
      .putRoom(room_id, { name, description, icon_preset })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("delete-room")
  .description("グループチャットを退席/削除する")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .requiredOption(
    "--action_type <action_type>",
    "<leave|delete> <required> 退席するか、削除するか",
  )
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { action_type } = cmd;

    api
      .deleteRoom(room_id, { action_type })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-members")
  .description("チャットのメンバー一覧を取得")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")

  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getRoomMembers(room_id)
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-members")
  .description("チャットのメンバーを一括変更")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
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
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { members_admin_ids, members_member_ids, members_readonly_ids } = cmd;

    api
      .putRoomMembers(room_id, {
        members_admin_ids,
        members_member_ids,
        members_readonly_ids,
      })
      .then((response) => {
        printResult(response, format);
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
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .option("--force <force>", "<0|1> 未取得にかかわらず最新の100件を取得するか")
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { force } = cmd;

    api
      .getRoomMessages(room_id, { force })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room-message")
  .description("チャットに新しいメッセージを追加")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .requiredOption("--body <body>", "<string> <required> メッセージ本文")
  .option(
    "--self_unread <self_unread>",
    "<0|1> 追加したメッセージを自分から見て未読とするか",
  )
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { body, self_unread } = cmd;

    api
      .postRoomMessage(room_id, { body, self_unread })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-messages-read")
  .description("メッセージを既読にする")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .option(
    "--message_id <message_id>",
    "<string> ここで指定するIDのメッセージまでを既読にする。すでに既読済みの場合はエラー(400)",
  )
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { message_id } = cmd;

    api
      .putRoomMessagesRead(room_id, { message_id })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-messages-unread")
  .description("メッセージを未読にする")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .requiredOption(
    "--message_id <message_id>",
    "<string> <required> ここで指定するIDのメッセージ以降を未読にする",
  )
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { message_id } = cmd;

    api
      .putRoomMessagesUnread(room_id, { message_id })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-message")
  .description("メッセージ情報を取得")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .arguments("<message_id>")

  .action((room_id, message_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getRoomMessage(room_id, message_id)
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-message")
  .description("チャットのメッセージを更新する。")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .arguments("<message_id>")
  .requiredOption("--body <body>", "<string> <required> 更新するメッセージ本文")
  .action((room_id, message_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { body } = cmd;

    api
      .putRoomMessage(room_id, message_id, { body })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("delete-room-message")
  .description("メッセージを削除")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .arguments("<message_id>")

  .action((room_id, message_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .deleteRoomMessage(room_id, message_id)
      .then((response) => {
        printResult(response, format);
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
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .option("--account_id <account_id>", "<number> タスクの担当者のアカウントID")
  .option(
    "--assigned_by_account_id <assigned_by_account_id>",
    "<number> タスクの依頼者のアカウントID",
  )
  .option("--status <status>", "<open|done> タスクのステータス")
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { account_id, assigned_by_account_id, status } = cmd;

    api
      .getRoomTasks(room_id, { account_id, assigned_by_account_id, status })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room-task")
  .description("チャットに新しいタスクを追加")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .requiredOption("--body <body>", "<string> <required> タスクの内容")
  .requiredOption(
    "--to_ids <to_ids>",
    "<string> <required> 担当者のアカウントID",
  )
  .option("--limit <limit>", "<number> タスクの期限")
  .option("--limit_type <limit_type>", "<none|date|time> タスク期限の種別")
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { body, to_ids, limit, limit_type } = cmd;

    api
      .postRoomTask(room_id, { body, to_ids, limit, limit_type })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-task")
  .description("タスク情報を取得")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .arguments("<task_id>")

  .action((room_id, task_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getRoomTask(room_id, task_id)
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-task-status")
  .description("タスク完了状態を変更する")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .arguments("<task_id>")
  .requiredOption("--body <body>", "<open|done> <required> タスク完了状態")
  .action((room_id, task_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { body } = cmd;

    api
      .putRoomTaskStatus(room_id, task_id, { body })
      .then((response) => {
        printResult(response, format);
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
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .option(
    "--account_id <account_id>",
    "<number> アップロードしたユーザーのアカウントID",
  )
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { account_id } = cmd;

    api
      .getRoomFiles(room_id, { account_id })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room-file")
  .description("チャットに新しいファイルをアップロード")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .requiredOption(
    "--file <file>",
    "<string> <required> アップロードするファイル（上限：5MB）",
  )
  .option(
    "--message <message>",
    "<string> ファイルと一緒に投稿するメッセージの本文",
  )
  .requiredOption("--file_name <file_name>", "<string> <required> ファイル名")
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { file, message, file_name } = cmd;

    api
      .postRoomFile(room_id, { file, message, file_name })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-file")
  .description("ファイル情報を取得")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .arguments("<file_id>")
  .option(
    "--create_download_url <create_download_url>",
    "<0|1> ダウンロードする為のURLを生成するか",
  )
  .action((room_id, file_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { create_download_url } = cmd;

    api
      .getRoomFile(room_id, file_id, { create_download_url })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("get-room-link")
  .description("招待リンクを取得する")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")

  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getRoomLink(room_id)
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("post-room-link")
  .description("招待リンクを作成する")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .option("--code <code>", "<string> リンク文字列")
  .option("--need_acceptance <need_acceptance>", "<0|1> 承認要否")
  .option("--description <description>", "<string> リンク説明文")
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { code, need_acceptance, description } = cmd;

    api
      .postRoomLink(room_id, { code, need_acceptance, description })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-room-link")
  .description("招待リンクの情報を変更する")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")
  .option("--code <code>", "<string> リンク文字列")
  .option("--need_acceptance <need_acceptance>", "<0|1> 承認要否")
  .option("--description <description>", "<string> リンク説明文")
  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const { code, need_acceptance, description } = cmd;

    api
      .putRoomLink(room_id, { code, need_acceptance, description })
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("delete-room-link")
  .description("招待リンクを削除する")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<room_id>")

  .action((room_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .deleteRoomLink(room_id)
      .then((response) => {
        printResult(response, format);
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
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )

  .action((cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .getIncomingRequests()
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("put-incoming-request")
  .description("自分に対するコンタクト承認依頼を承認する")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<request_id>")

  .action((request_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .putIncomingRequest(request_id)
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program
  .command("delete-incoming-request")
  .description("自分に対するコンタクト承認依頼をキャンセルする")
  .storeOptionsAsProperties(true)
  .option("--api_token <api_token>", "Chatwork API Token")
  .option(
    "--format <format>",
    "<table|json> Specify the result format.",
    "table",
  )
  .arguments("<request_id>")

  .action((request_id, cmd) => {
    const { api_token, format } = cmd;
    if (api_token) {
      api.apiToken = api_token;
    }
    if (cmd.file) {
      // CLIの場合はファイルパスを指定されるのでBufferに変換する
      cmd.file = readFileSync(cmd.file);
    }

    const {} = cmd;

    api
      .deleteIncomingRequest(request_id)
      .then((response) => {
        printResult(response, format);
      })
      .catch((e) => {
        printError(e);
        process.exit(1);
      });
  });

program.parse(process.argv);
