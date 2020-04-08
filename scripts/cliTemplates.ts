import { Property, getCommandName } from "./utils";
import { BuildData } from "./typings";

export function getCliHeader() {
  return `
    import { program } from 'commander';
    `;
}

export function getCommand({ commandName, description }: BuildData) {
  return `
    program.command("${commandName}")
      .description("${description}")
      .action(() => {
        console.log("${commandName}");
      });
    `;
}

export function getCliFooter() {
  return `
    program.parse(process.argv);
    `;
}
