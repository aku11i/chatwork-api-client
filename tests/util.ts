import { execSync } from "child_process";

export async function sleep() {
  return await new Promise((resolve) => setTimeout(resolve, 500));
}

export function exec(...args: (string | number)[]) {
  const command = [
    "npx ts-node src/cli.ts",
    ...args.map((arg) => `"${arg}"`),
  ].join(" ");

  const result = execSync(command).toString();
  return JSON.parse(result);
}
