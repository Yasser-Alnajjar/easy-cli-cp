import path from "node:path";
import inquirer from "inquirer";
import fs from "fs/promises";
import { pascalCase, writeFileRecursive } from "../utils/utils.js";
import { listTemplate } from "../templates/list-template.js";

export function initList(program) {
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
          default: "src/components",
        },
      ]);

      // تأكد من وجود الـ folder، لو مش موجود اعمله
      try {
        await fs.access(basePath);
      } catch {
        await fs.mkdir(basePath, { recursive: true });
      }

      const ext = "tsx";
      const componentName = pascalCase(name);
      const fileName = `${componentName}List.${ext}`;
      const targetFile = path.join(basePath, fileName);

      // check if any file with "List" exists in the basePath
      const files = await fs.readdir(basePath);
      const existing = files.find((f) => f.toLowerCase().includes("list"));

      if (existing) {
        console.log(`⚠️ A list component already exists: ${existing}`);
        return;
      }

      const baseUrl = `/${name.replace(/_/g, "-")}`;
      const namespace = name.replaceAll("-", "_") || "common";
      const content = listTemplate(componentName, baseUrl, namespace);

      await writeFileRecursive(targetFile, content);

      console.log(
        `✅ List component "${componentName}" created at ${targetFile}`
      );
    });
}
