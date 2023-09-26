#!/usr/bin/env node

import fs from "fs";
import path from "path";
import takeAShot from "./index.js";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

async function main() {
  let userPrompt = argv._[0] || argv.prompt || argv.p || argv._.join(" ")

  if (!userPrompt) return usage();

  // Is prompt a filename? If so, read it.
  const userPromptFile = path.join(process.cwd(), userPrompt);
  if (fs.existsSync(userPromptFile)) {
    userPrompt = fs.readFileSync(userPromptFile, "utf-8");
  }

  const html = await takeAShot({
    userPrompt,
    model: argv.model,
    logInputs: true,
  });

  process.stdout.write(html);
}

function usage() {
  process.stderr.write(`
✨🏀✨ swish: Use language models to write single-page apps with one shot. ✨🏀✨


Usage: Provide a string or filename as the first argument.

Examples:

  $ swish "make a geocities style homepage" > index.html

  $ swish my-long-prompt.txt > index.html

  $ swish my-long-prompt.txt --model=replicate/llama-2-70b-chat > index.html && open index.html
`);
  process.exit();
}


main();
