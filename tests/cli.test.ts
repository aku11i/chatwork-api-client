import { resolve, join } from "path";
import { exec } from "./util";

const ROOT = resolve(__dirname, "..");

process.chdir(ROOT);

describe("API Connection Test[CLI]", () => {
  let room_id: number;

  test("Normal request", async () => {
    const me = exec("get-me", "--format", "json");
    expect(me).toHaveProperty("room_id");
    room_id = me.room_id;
  });

  test("File upload", async () => {
    const filePath = join(__dirname, "test.txt");

    const postFileResult = exec(
      "post-room-file",
      "--format",
      "json",
      "--file_name",
      "testfile.cli.txt",
      "--file",
      filePath,
      room_id,
    );

    expect(postFileResult).toHaveProperty("file_id");
  });
});
