import inquirer from "inquirer";
import { generateList } from "../generators/list.js";
export function initList(config, program) {
  program
    .command("list <name>")
    .alias("l")
    .description("Generate a new List component with DataTable setup")
    .action(async (name) => {
      const { basePath } = await inquirer.prompt([
        {
          type: "input",
          name: "basePath",
          message: "Where do you want to create the list component?",
          default: config.componentsPath || "src/components",
        },
      ]);
      await generateList(name, basePath, config);
    });
}
