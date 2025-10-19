#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import editManifest from "./utils/editManifest.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Safe wrapper for Inquirer to handle Ctrl+C gracefully
async function safePrompt(questions) {
  try {
    const answers = await inquirer.prompt(questions);
    return answers;
  } catch (err) {
    // If user pressed Ctrl+C inside a prompt
    if (err.isTtyError || err.name === "ExitPromptError") {
      console.log("\nDo you really want to exit?");
      const { confirmExit } = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirmExit",
          message: "Exit setup?",
          default: true
        }
      ]);
      if (confirmExit) {
        console.log("Exiting...");
        process.exit(0);
      } else {
        console.log("Resuming setup...\n");
        return safePrompt(questions); // re-run the same prompt
      }
    } else {
      throw err;
    }
  }
}

async function main() {
  const answers = await safePrompt([
    {
      type: "list",
      name: "template",
      message: "Choose a template:",
      choices: ["JS (JavaScript)", "TS (TypeScript)"]
    },
    {
      type: "list",
      name: "style",
      message: "Choose a styling setup:",
      choices: ["Normal CSS", "TailwindCSS"]
    },
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-chrome-extension"
    },
    {
      type: "input",
      name: "projectDescription",
      message: "Project Description:",
      default: "My Chrome Extension"
    }
  ]);

  const { template, style, projectName, projectDescription } = answers;

  const templateFolder =
    template === "JS (JavaScript)" ? "js" : "ts";
  const styleFolder =
    style === "TailwindCSS" ? "tailwindcss" : "normalcss";

  const templateDir = path.join(__dirname, "./templates", templateFolder, styleFolder);
  const targetDir = path.join(process.cwd(), projectName);

  console.log(`\nCreating project "${projectName}" from "${templateFolder}/${styleFolder}" template...`);

  await fs.copy(templateDir, targetDir);
  editManifest(projectName, projectDescription, targetDir);

  console.log(`Done! Navigate to ./${projectName}\n`);
}

main().catch(console.error);
