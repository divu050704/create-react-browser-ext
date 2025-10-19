
# Create React Browser Extension CLI

A powerful command-line tool to **generate Chrome extension boilerplates** with optional **TailwindCSS** or **Normal CSS** setups — for both **JavaScript** and **TypeScript**.

---

## Features

✅ Interactive CLI prompts (template + style + project name + description)  
✅ Supports **JS** and **TS** boilerplates  
✅ Choose between **Normal CSS** and **TailwindCSS** setups  
✅ Automatically edits your `manifest.json` with project details  
✅ Clean exit confirmation when pressing **Ctrl + C**  
✅ Built using modern ES Modules (`type: module`)

---

## Installation

```bash
npm install -g create-react-browser-ext
````

Or for local development:

```bash
git clone https://github.com/yourusername/create-react-browser-ext
cd create-react-browser-ext
npm install
npm link
```

---

## Usage

Run the CLI anywhere in your terminal:

```bash
create-react-browser-ext
```

You’ll be guided through a series of prompts:

```
? Choose a template: (Use arrow keys)
> JS (JavaScript)
  TS (TypeScript)

? Choose a styling setup:
> Normal CSS
  TailwindCSS

? Project name: my-chrome-extension
? Project Description: My Chrome Extension
```

---

## Folder Structure

```
create-react-browser-ext/
├── bin/
│   └── index.js               # CLI entry point
├── utils/
│   └── editManifest.js        # Manifest update utility
├── templates/
│   ├── js/
│   │   ├── normalcss/
│   │   │   └── extension/
│   │   │       └── manifest.json
│   │   └── tailwindcss/
│   │       ├── extension/
│   │       │   └── manifest.json
│   │       └── tailwind.config.js
│   └── ts/
│       ├── normalcss/
│       └── tailwindcss/
├── package.json
└── README.md
```

---

## How It Works

1. **Prompts User Input** using [Inquirer.js](https://www.npmjs.com/package/inquirer)
2. **Selects a Template Folder** from `/templates/<js|ts>/<style>/`
3. **Copies Template Files** to your target directory using [fs-extra](https://www.npmjs.com/package/fs-extra)
4. **Edits `manifest.json`** placeholders (`EXTENSION_NAME`, `EXTENSION_DESCRIPTION`)
5. **Handles Ctrl + C Gracefully** — asks confirmation before exiting

---

## Example Manifest Placeholders

Each template should include a `manifest.json` like this:

```json
{
  "manifest_version": 3,
  "name": "EXTENSION_NAME",
  "description": "EXTENSION_DESCRIPTION",
  "version": "1.0.0"
}
```

The CLI automatically replaces those placeholders with your inputs.

---

## Exit Confirmation

If you press **Ctrl + C** during setup, the CLI will ask:

```
⚠️  Do you really want to exit?
? Exit setup? (Y/n)
```

This ensures you don’t accidentally cancel your setup halfway.

---

## Development

To modify the CLI while testing locally:

```bash
npm link
```

Now you can run the CLI globally with:

```bash
create-react-browser-ext
```

When you’re done testing, unlink it:

```bash
npm unlink -g create-react-browser-ext
```

---

## Adding New Templates

To add your own template:

1. Create a folder under `/templates/js/` or `/templates/ts/`
2. Inside that, create a subfolder:

   * `/normalcss/`
   * `/tailwindcss/`
3. Add files (`manifest.json`, `index.js`, etc.)
4. Use `EXTENSION_NAME` and `EXTENSION_DESCRIPTION` placeholders where appropriate


## Future Ideas

* Add support for **React + Vite** boilerplates
* Support **Firefox** extension manifest formats
* Add **custom template registry** (user-defined templates)
* Auto-install dependencies for Tailwind or React

