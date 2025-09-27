import path from "node:path";
import { fileExists, pascalCase, writeFileRecursive } from "../utils/utils.js";
import { ssrFormTemplate } from "../templates/ssrForm-template.js";

export async function generateSsrForm(name, basePath) {
  const ext = "tsx";
  const componentName = pascalCase(name);
  const fileName = `${componentName}.${ext}`;
  const targetFile = path.join(basePath, fileName);

  if (await fileExists(targetFile)) {
    console.log(`⚠️ Page "${name}" already exists.`);
    return;
  }

  const content = ssrFormTemplate(componentName);
  await writeFileRecursive(targetFile, content);

  console.log(`✅ SSR Form "${name}" created at ${targetFile}`);
}
