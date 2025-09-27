#!/usr/bin/env node

import { createRequire } from "module";
import { Command } from "commander";
import { initPage } from "./commands/page.js";
import { initList } from "./commands/list.js";
import { initForm } from "./commands/form.js";
import { initSsrList } from "./commands/ssrlist.js";
import { getCLIConfigFile } from "./utils/generateConfig.js";
import { initSsrForm } from "./commands/ssrForm.js";
import { initModule } from "./commands/module.js";

const localRequire = createRequire(import.meta.url);
const pkg = localRequire("./package.json");

export default async function initCLI() {
  const program = new Command();

  program
    .name("easy-cli-cp")
    .description("CLI tool to scaffold components and pages.")
    .version(pkg.version);

  const config = await getCLIConfigFile();

  initModule(config, program);
  initPage(config, program);
  initList(config, program);
  initForm(config, program);
  initSsrList(config, program);
  initSsrForm(config, program);

  program.parse(process.argv);
}
initCLI();
