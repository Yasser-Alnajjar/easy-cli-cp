import inquirer from "inquirer";
import { generateSsrForm } from "../generators/ssrForm.js";

export function initSsrForm(config, program) {
  program
    .command("ssr-form <name>")
    .alias("sf")
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
      await generateSsrForm(name, basePath);
    });
}
