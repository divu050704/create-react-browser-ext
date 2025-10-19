#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import editManifest from "./utils/editManifest.js";
import updateNotifier from 'update-notifier';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json manually
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./package.json"), "utf-8")
);

// Notify if updates available
updateNotifier({ pkg }).notify();

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
          default: true,
        },
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
      choices: ["JS (JavaScript)", "TS (TypeScript)"],
    },
    {
      type: "list",
      name: "style",
      message: "Choose a styling setup:",
      choices: ["Normal CSS", "TailwindCSS"],
    },
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-chrome-extension",
    },
    {
      type: "input",
      name: "projectDescription",
      message: "Project Description:",
      default: "My Chrome Extension",
    },
  ]);

  const { template, style, projectName, projectDescription } = answers;

  const templateFolder = template === "JS (JavaScript)" ? "js" : "ts";
  const styleFolder = style === "TailwindCSS" ? "tailwindcss" : "normalcss";

  const templateDir = path.join(
    __dirname,
    "./templates",
    templateFolder,
    styleFolder
  );
  const targetDir = path.join(process.cwd(), projectName);

  await fs.copy(templateDir, targetDir);
  editManifest(projectName, projectDescription, targetDir);

  console.log(`\n✅ Project setup complete!`);
  console.log(`📂 Navigate to your project folder:`);
  console.log(`   cd ${projectName}\n`);
  console.log(`💡 Next steps:`);
  console.log(`   npm install          # Install dependencies`);
  console.log(`   npm run dev          # Start development server`);
  console.log(`   npm run build        # Build for production\n`);
  console.log(`🚀 Happy coding!\n`);
}

main().catch(console.error);
