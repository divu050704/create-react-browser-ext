#!/usr/bin/env node
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import chalk from "chalk";
import editManifest from "./utils/editManifest.js";
import updateNotifier from 'update-notifier';
import degit from "degit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read package.json manually
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "./package.json"), "utf-8")
);

// Notify if updates available
updateNotifier({ pkg }).notify();

// Track if we're in the middle of prompts
let isPrompting = false;

// Handle Ctrl+C gracefully with confirmation
process.on('SIGINT', async () => {
  if (!isPrompting) {
    console.log(chalk.yellow('\n\nSetup cancelled. Exiting...'));
    process.exit(0);
  }

  console.log('\n');
  try {
    const { confirmExit } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirmExit",
        message: chalk.yellow("Are you sure you want to exit?"),
        default: false,
      },
    ]);

    if (confirmExit) {
      console.log(chalk.yellow('\nSetup cancelled. Exiting...\n'));
      process.exit(0);
    } else {
      console.log(chalk.green('\nResuming setup...\n'));
      // Return to allow the process to continue
    }
  } catch (err) {
    // If Ctrl+C is pressed during confirmation, just exit
    console.log(chalk.yellow('\n\nExiting...\n'));
    process.exit(0);
  }
});

// Handle uncaught promise rejections
process.on('unhandledRejection', (err) => {
  console.error(chalk.red('\nError:'), err.message);
  process.exit(1);
});

async function main() {
  console.log(chalk.bold.cyan('\nWelcome to Chrome Extension Setup\n'));

  try {
    isPrompting = true;
    
    const answers = await inquirer.prompt([
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
        default: "Sample Chrome Extension",
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Project Description:",
        default: "A sample Chrome extension with background, content, and popup",
      },
    ]);

    isPrompting = false;

    const { template, style, projectName, projectDescription } = answers;

    const templateFolder = template === "JS (JavaScript)" ? "js" : "ts";
    const styleFolder = style === "TailwindCSS" ? "tailwind" : "normal";

    // Specify your GitHub repo
    const repoUrl = `divu050704/create-react-browser-ext-templates#chrome-react-${templateFolder}-${styleFolder}`;
    const targetDir = path.join(process.cwd(), projectName);

    console.log(chalk.blue(`\nDownloading template: chrome-react-${templateFolder}-${styleFolder}`));
    const emitter = degit(repoUrl, { cache: false, force: true });

    await emitter.clone(targetDir);
    
    await editManifest(projectName, projectDescription, targetDir);

    console.log(chalk.green.bold('\nProject setup complete!'));
    console.log(chalk.dim('\nNavigate to your project folder:'));
    console.log(chalk.cyan(`  cd ${projectName}\n`));
    console.log(chalk.dim('Next steps:'));
    console.log(chalk.white('  npm install') + chalk.dim('          # Install dependencies'));
    console.log(chalk.white('  npm run dev') + chalk.dim('          # Start development server'));
    console.log(chalk.white('  npm run build') + chalk.dim('        # Build for production\n'));
    console.log(chalk.green('Happy coding!\n'));

    // Explicitly exit after successful completion
    process.exit(0);
  } catch (err) {
    isPrompting = false;
    
    // Handle Inquirer cancellation (Ctrl+C)
    if (err.isTtyError || err.name === 'ExitPromptError') {
      console.log(chalk.yellow('\n\nSetup cancelled. Exiting...\n'));
      process.exit(0);
    }
    // Re-throw other errors
    throw err;
  }
}

main().catch((err) => {
  console.error(chalk.red('\nError:'), err.message);
  process.exit(1);
});