import path from "node:path";
import { ssrListTemplate } from "../templates/ssrList-template.js";
import { fileExists, pascalCase, writeFileRecursive } from "../utils/utils.js";

export async function generateSsrList(name, basePath) {
  const ext = "tsx";
  const componentName = pascalCase(name);
  const fileName = `${componentName}s.${ext}`;
  const targetFile = path.join(basePath, fileName);

  if (await fileExists(targetFile)) {
    console.log(`⚠️ Component "${name}" already exists.`);
    return;
  }

  const content = ssrListTemplate(`${componentName}s`, componentName);
  await writeFileRecursive(targetFile, content);

  console.log(`✅ Component "${name}" created at ${targetFile}`);
}
