import path from "node:path";
import inquirer from "inquirer";
import { generateSsrForm } from "../generators/ssrForm.js";
import { generatePage } from "../generators/page.js";
import { generateForm } from "../generators/form.js";
import { generateList } from "../generators/list.js";
import { generateSsrList } from "../generators/ssrList.js";
import { pascalCase, writeFileRecursive } from "../utils/utils.js";
import { generateFormPage } from "../generators/form-page.js";

export function initModule(config, program) {
  program
    .command("module <name>")
    .alias("m")
    .description("Generate a full module (page, ssr form, etc.)")
    .action(async (name) => {
      const { basePath } = await inquirer.prompt([
        {
          type: "input",
          name: "basePath",
          message: "Base path for module components?",
          default: config.componentsPath || "src/modules",
        },
      ]);

      const moduleBase = path.join(basePath, name);
      const csrPath = path.join(moduleBase, "csr");
      const ssrPath = path.join(moduleBase, "ssr");
      const componentName = pascalCase(name);

      // generate files
      await generatePage(name, config.pagesPath || "src/app", config);
      await generateFormPage(name, config.pagesPath || "src/app", config);
      await generateForm(name, csrPath, config);
      await generateList(name, csrPath, config);
      await generateSsrForm(name, ssrPath);
      await generateSsrList(name, ssrPath);

      const csrIndexContent = `
export {  ${componentName}Form } from "./${componentName}Form";
export {  ${componentName}List } from "./${componentName}List";
`;
      await writeFileRecursive(path.join(csrPath, "index.ts"), csrIndexContent);

      const ssrIndexContent = `
export { ${componentName} } from "./${componentName}";
export { ${componentName}s } from "./${componentName}s";
`;
      await writeFileRecursive(path.join(ssrPath, "index.ts"), ssrIndexContent);

      const rootIndexContent = `export * from "./ssr";`;

      await writeFileRecursive(
        path.join(moduleBase, "index.ts"),
        rootIndexContent
      );

      console.log(`\n🚀 Module "${name}" generated successfully!`);
    });
}
