#!/usr/bin/env node

import { createRequire } from "module";
import { Command } from "commander";
import { initPage } from "./commands/page.js";
import { initList } from "./commands/list.js";
import { initForm } from "./commands/form.js";

const localRequire = createRequire(import.meta.url);
const pkg = localRequire("./package.json");

export default async function initCLI() {
  const program = new Command();

  program
    .name("easy-cli-cp")
    .description("CLI tool to scaffold components and pages.")
    .version(pkg.version);

  initPage(program);
  initList(program);
  initForm(program);
  program.parse(process.argv);
}
initCLI();
