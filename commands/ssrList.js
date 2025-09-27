import inquirer from "inquirer";
import { generateSsrList } from "../generators/ssrList.js";

export function initSsrList(config, program) {
  program
    .command("ssr-list <name>")
    .alias("sl")
    .description("Generate a new server-side component")
    .action(async (name) => {
      const { basePath } = await inquirer.prompt([
        {
          type: "input",
          name: "basePath",
          message: "Where do you want to create the server-side component?",
          default: config.componentsPath || "src/components",
        },
      ]);
      await generateSsrList(name, basePath);
    });
}
