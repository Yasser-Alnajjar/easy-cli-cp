import path from "node:path";
import inquirer from "inquirer";
import {
  fileExists,
  pascalCaseWithSpace,
  writeFileRecursive,
} from "../utils/utils.js";
import { pageTemplate } from "../templates/page-template.js";

export function initPage(program) {
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
          default: "src/app",
        },
      ]);

      const targetPath = path.join(basePath, name);

      if (await fileExists(targetPath)) {
        console.log(`⚠️ Page "${name}" already exists.`);
        return;
      }

      const ext = "tsx";
      const componentName = pascalCaseWithSpace(name);

      const content = pageTemplate(true, componentName);

      await writeFileRecursive(`${targetPath}/page.${ext}`, content);

      console.log(`✅ Page "${name}" created at ${targetPath}`);
    });
}
