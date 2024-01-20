#!/usr/bin/env node
const { program } = require("commander");
const packageJson = require("../package.json");

program
  .version(packageJson.version)
  .command("key", "Manage Api Key -- coinapi.io")
  .command("check", "Check Coin Info")
  .parse(process.argv);
