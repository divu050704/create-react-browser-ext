

# Create React Browser Extension CLI

A powerful command-line tool to generate a modern **React + Vite Chrome Extension boilerplate**, supporting both **JavaScript** and **TypeScript**, with optional **TailwindCSS** integration and built-in live reload for development.



## Features

* Interactive CLI prompts for template, styling, and project info
* Supports **JS** and **TS** boilerplates
* Optional **TailwindCSS** setup
* Automatically updates `manifest.json` with project details
* Live reload for background, content, and popup scripts
* **Vite-powered** development and builds
* Includes custom reload server and plugins
* Graceful Ctrl+C exit with confirmation
* Built using modern **ES Modules**



## Installation

Global installation:

```bash
npm install -g create-react-browser-ext
```

Or run directly without installation:

```bash
npx create-react-browser-ext
```

For local development:

```bash
git clone https://github.com/divu050704/create-react-browser-ext
cd create-react-browser-ext
npm install
npm link
```



## Usage

Run the CLI anywhere in your terminal:

```bash
create-react-browser-ext
```

You’ll be guided through setup prompts:

```
Welcome to Chrome Extension Setup

? Choose a template: (Use arrow keys)
> JS (JavaScript)
  TS (TypeScript)

? Choose a styling setup:
> Normal CSS
  TailwindCSS

? Project name: my-chrome-extension
? Project Description: My Chrome Extension
```

Once completed, you’ll see:

```
Downloading template: chrome-react-ts-tailwind
manifest.json updated successfully

Project setup complete!

Next steps:
  cd my-chrome-extension
  npm install
  npm run dev
```



## Project Structure

After running the CLI, your generated project will look like this:

```
my-chrome-extension/
│   .gitignore
│   eslint.config.js
│   index.html
│   package-lock.json
│   package.json
│   README.md
│   reload-server.js
│   tsconfig.app.json
│   tsconfig.json
│   tsconfig.node.json
│   vite.config.ts
│
├───extension
│       icon.png
│       manifest.json
│
├───plugins
│       cleanMainFile.js
│       reloadExtensionPlugin.js
│       updatePopupPlugin.js
│
├───public
│       vite.svg
│
└───src
    │   App.css
    │   App.tsx
    │   chrome.d.ts
    │   index.css
    │   main.tsx
    │   reload.js
    │
    ├───assets
    │       react.svg
    │
    ├───background
    │       background.js
    │       handleReload.js
    │
    └───content
            content.js
            handleReload.js
```

### Folder Overview

| Folder/File          | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| **extension/**       | Contains the Chrome extension’s `manifest.json` and icons.            |
| **src/**             | Contains the main React source files and extension scripts.           |
| **src/background/**  | Background service scripts (reload logic, events).                    |
| **src/content/**     | Content scripts injected into webpages.                               |
| **plugins/**         | Custom Vite plugins for extension reload and build cleanup.           |
| **reload-server.js** | Node server for handling live-reload WebSocket events.                |
| **vite.config.ts**   | Main Vite configuration file for building and bundling the extension. |
| **tsconfig*.json**   | TypeScript configuration files.                                       |
| **public/**          | Static assets copied directly to the build folder.                    |

---

## Development

To start the development server with live reload:

```bash
npm run dev
```

Then, open Chrome and go to:

```
chrome://extensions/
```

Click **“Load unpacked”** and select your project’s `/dev` or `/build` directory (depending on your setup).

### Live Reload Triggers

The extension reloads automatically when you modify:

* Files inside `extension/`
* Background scripts
* Content scripts
* React popup or UI code (`src/`)

---

## Production Build

When you’re ready to publish your extension:

```bash
npm run build
```

Then, load the `/build` folder as an unpacked extension in Chrome:

```
chrome://extensions/
```

---

## How It Works

1. **Interactive CLI Prompts** via [Inquirer.js](https://www.npmjs.com/package/inquirer)
2. **Template Download** using [degit](https://www.npmjs.com/package/degit)
3. **Manifest Update** — replaces placeholders in `manifest.json`
4. **Live Reload System** — integrates `reload-server.js` and Vite plugins
5. **Clean Plugin System** — ensures efficient hot reload and clean builds

---

## Templates Repository

Templates are hosted at: [create-react-browser-ext-templates](https://github.com/divu050704/create-react-browser-ext-templates)

Available branches:

* `chrome-react-js-normal`
* `chrome-react-js-tailwind`
* `chrome-react-ts-normal`
* `chrome-react-ts-tailwind`

---

## Dependencies

**Runtime:**

* `inquirer` – Interactive CLI prompts
* `chalk` – Colored terminal output
* `fs-extra` – File system utilities
* `degit` – Fast template downloader
* `update-notifier` – Version update alerts

**Dev:**

* `vite`
* `typescript`
* `eslint`

---

## Future Enhancements

* Firefox extension manifest support
* Custom template registry
* Support for Vue / Svelte
* One-command publishing
* Pre-configured CI/CD setups

---

## Contributing

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a PR


