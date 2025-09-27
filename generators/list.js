import path from "node:path";
import fs from "fs/promises";
import { pascalCase, writeFileRecursive } from "../utils/utils.js";
import { listTemplate } from "../templates/list-template.js";

export async function generateList(name, basePath, config) {
  try {
    await fs.access(basePath);
  } catch {
    await fs.mkdir(basePath, { recursive: true });
  }

  const ext = "tsx";
  const componentName = pascalCase(name);
  const fileName = `${componentName}List.${ext}`;
  const targetFile = path.join(basePath, fileName);

  const files = await fs.readdir(basePath);
  const existing = files.find((f) => f.toLowerCase().includes("list"));

  if (existing) {
    console.log(`⚠️ A list component already exists: ${existing}`);
    return;
  }

  const baseUrl = `/${name.replace(/_/g, "-")}`;
  const namespace = name.replaceAll("-", "_") || "common";
  const content = listTemplate(
    componentName,
    baseUrl,
    namespace,
    config.modulePath
  );

  await writeFileRecursive(targetFile, content);

  console.log(`✅ List component "${componentName}" created at ${targetFile}`);
}
