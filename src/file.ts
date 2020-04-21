import { readFile } from "fs";

export async function readFileAsync(path: string) {
  return await new Promise<Buffer>((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
