import path from "node:path";
import fs from "fs/promises";
import {
  pascalCase,
  pascalCaseWithSpace,
  writeFileRecursive,
} from "../utils/utils.js";
import { formPageTemplate } from "../templates/form-page-template.js";

export async function generateFormPage(name, basePath, config) {
  const targetPath = path.join(basePath, name, "form");

  await fs.mkdir(targetPath, { recursive: true });

  const ext = "tsx";
  const componentName = pascalCase(name);
  const title = pascalCaseWithSpace(name);

  const content = formPageTemplate(
    true,
    `New ${title}`,
    componentName,
    config.modulePath
  );

  await writeFileRecursive(path.join(targetPath, `page.${ext}`), content);

  console.log(`✅ Form Page "${name}" created at ${targetPath}/page.${ext}`);
}
