import path from "node:path";
import inquirer from "inquirer";
import fs from "fs/promises";
import { pascalCase, writeFileRecursive } from "../utils/utils.js";
import { formTemplate } from "../templates/form-template.js";

export function initForm(config, program) {
  program
    .command("form <name>")
    .alias("f")
    .description("Generate a new Form component")
    .action(async (name) => {
      const { basePath } = await inquirer.prompt([
        {
          type: "input",
          name: "basePath",
          message: "Where do you want to create the form component?",
          default: config.componentsPath || "src/components",
        },
      ]);

      try {
        await fs.access(basePath);
      } catch {
        await fs.mkdir(basePath, { recursive: true });
      }

      const ext = "tsx";
      const componentName = pascalCase(name);
      const fileName = `${componentName}Form.${ext}`;
      const targetFile = path.join(basePath, fileName);

      const files = await fs.readdir(basePath);
      const existing = files.find((f) => f.toLowerCase().includes("form"));

      if (existing) {
        console.log(`⚠️ A form component already exists: ${existing}`);
        return;
      }

      const namespace = name.replaceAll("-", "_") || "common";
      const content = formTemplate(componentName, namespace, config.modulePath);

      await writeFileRecursive(targetFile, content);

      console.log(
        `✅ Form component "${componentName}" created at ${targetFile}`
      );
    });
}
