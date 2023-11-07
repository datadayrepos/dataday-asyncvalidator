# ts-template

TS Template is a starter template for swiftly setting up a TypeScript package with a well-defined, easy-to-use structure.

## 🚀 Features
- **TypeScript Configurations**: Pre-configured TypeScript for smooth development.
- **Eslint Setup**: Pre-configured ESLint with established rules for maintaining code quality.
- **Script Shortcuts**: Pre-defined NPM scripts for common tasks like linting, building, and publishing.
- **Version Management**: Simplifies version bumping and publishing with `bumpp` and `pnpm`.
- **Export Control**: Clearly defined export settings for various module types.
  
## 🛠 Usage

## 1. Clone & Install
Clone this template and navigate to the project directory. Use `pnpm` for installing dependencies:

```sh
git clone https://github.com/datadayrepos/ts-template.git my-new-package
cd my-new-package
pnpm install
```

## 2. Configure
Utilize placeholders for easy setup:
Replace all placeholders (__PLACEHOLDER__) in package.json with your package specifics. E.g., __PACKAGE_NAME__, __AUTHOR_NAME__, etc.

## 3. Develop
Your src directory is where your TypeScript source files reside. Transpiled files are output to the dist directory.

## 💻 Commands

Build: Transpile TypeScript to JavaScript
```sh
pnpm run build
```

Linting: Check and fix code style
```sh
pnpm run lint
pnpm run lint:fix
```

Release: Bump version and publish
```sh
pnpm run release
```

Testing: Run tests (tbd)
```sh
pnpm run test
```

Type Checking: Validate TypeScript
```sh
pnpm run typecheck
```

Publish: Publish package publicly
```sh
pnpm run pub
```


## 📦 Template Structure
```json
{
  "name": "__PACKAGE_NAME__",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "description": "__PACKAGE_DESCRIPTION__",
  ...
  "scripts": {
    "lint": "eslint --cache .",
    "lint:fix": "eslint . --fix",
    "release": "bumpp -r && pnpm -r publish",
    "test": "echo \"Error: no test specified\" && exit 1",
    "typecheck": "tsc --noEmit",
    "build": "tsc",
    "pub": "npm publish --access public"
  },
  ...
}

```

## 🗂️ File Structure
- src/: Source files written in TypeScript.
- dist/: Transpiled source files in JavaScript.

## 🔗 Links
- **Repository**: [GitHub Repository](https://github.com/datadayrepos/ts-template)
- **Issues**: [Report Bugs](https://github.com/datadayrepos/ts-template/issues)


## 📄 License
[MIT](./LICENSE) License &copy; 2023 [DataDayRepos](https://github.com/datadayrepos)
