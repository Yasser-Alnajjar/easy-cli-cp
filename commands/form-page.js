import inquirer from "inquirer";
import { generateFormPage } from "../generators/form-page.js";

export function initFormPage(config, program) {
  program
    .command("form-page <name>")
    .alias("fp")
    .description("Generate a new Next.js page")
    .action(async (name) => {
      const { basePath } = await inquirer.prompt([
        {
          type: "input",
          name: "basePath",
          message: "Where do you want to create the form page?",
          default: config.pagesPath || "src/app",
        },
      ]);
      await generateFormPage(name, basePath, config);
    });
}
``;
