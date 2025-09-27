import fs from "node:fs/promises";
import path from "node:path";

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function writeFileRecursive(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");
}

/**
 * Deeply merges two or more objects.
 * Similar behavior to lodash.merge
 */
function merge(target, ...sources) {
  if (!sources.length) return target;

  const source = sources.shift();
  if (source && typeof source === "object") {
    for (const key of Object.keys(source)) {
      const value = source[key];
      if (
        value &&
        typeof value === "object" &&
        !Array.isArray(value) &&
        value.constructor === Object
      ) {
        if (!target[key]) {
          target[key] = {};
        }
        merge(target[key], value);
      } else {
        target[key] = value;
      }
    }
  }

  return sources.length ? merge(target, ...sources) : target;
}

async function createFolder(basePath, name, framework, typescript, style) {
  if (!name) {
    console.error("⚠️  Component name cannot be empty!");
    return;
  }

  const componentDir = path.join(basePath, capitalize(name));

  try {
    await fs.mkdir(componentDir, { recursive: true });

    // call your generator for files
    await createFiles(basePath, name, framework, typescript, style);

    console.log(`✅ Folder created: ${componentDir}`);
  } catch (error) {
    console.error(`❌ Error creating component: ${error.message}`);
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function pascalCase(str) {
  return str
    .split(/[-_ ]+/)
    .map((s) => capitalize(s))
    .join("");
}
function pascalCaseWithSpace(str) {
  return str
    .split(/[-_ ]+/)
    .map((s) => capitalize(s))
    .join(" ");
}

function removeDash(str) {
  return str.replaceAll("-", " ");
}
function kebabCase(str) {
  return str
    .split(/[-_ ]+/)
    .map((s) => s.toLowerCase())
    .join("-");
}

export {
  pascalCase,
  pascalCaseWithSpace,
  kebabCase,
  capitalize,
  createFolder,
  fileExists,
  writeFileRecursive,
  merge,
  removeDash,
};
