import path from "node:path";
import {
  fileExists,
  pascalCase,
  pascalCaseWithSpace,
  writeFileRecursive,
} from "../utils/utils.js";
import { pageTemplate } from "../templates/page-template.js";

export async function generatePage(name, basePath, config) {
  const targetPath = path.join(basePath, name);

  if (await fileExists(targetPath)) {
    console.log(`⚠️ Page "${name}" already exists.`);
    return;
  }

  const ext = "tsx";
  const componentName = pascalCaseWithSpace(name);
  const content = pageTemplate(
    true,
    componentName,
    pascalCase(`${componentName}s`),
    config.modulePath
  );

  await writeFileRecursive(`${targetPath}/page.${ext}`, content);

  console.log(`✅ Page "${name}" created at ${targetPath}`);
}
