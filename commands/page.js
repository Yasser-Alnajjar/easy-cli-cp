import inquirer from "inquirer";
import { generatePage } from "../generators/page.js";

export function initPage(config, program) {
  program
    .command("page <name>")
    .alias("p")
    .description("Generate a new Next.js page")
    .action(async (name) => {
      const { basePath } = await inquirer.prompt([
        {
          type: "input",
          name: "basePath",
          message: "Where do you want to create the page?",
          default: config.pagesPath || "src/app",
        },
      ]);
      await generatePage(name, basePath, config);
    });
}
