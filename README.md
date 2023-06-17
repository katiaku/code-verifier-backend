## Node.js project dependencies

### Dependencies

    1. dotenv: loads environment variables from a .env file
    2. express: Node.js framework

### DevDependencies (development purposes only)

    1. @types/express: TypeScript type definitions for the Express framework
    2. @types/jest: TypeScript type definitions for the Jest testing framework
    3. @types/node: TypeScript type definitions for Node.js
    4. @typescript-eslint/eslint-plugin: a plugin that provides TypeScript-specific linting rules for ESLint
    5. concurrently: a utility to run multiple commands concurrently
    6. eslint: a tool for identifying and reporting on patterns found in JavaScript/TypeScript code
    7. eslint-config-standard-with-typescript: a set of ESLint rules that enforce the Standard style guide with TypeScript support
    8. eslint-plugin-import: ESLint plugin that provides linting rules for importing and exporting modules
    9. eslint-plugin-n: ESLint plugin that enforces consistent naming conventions
    10. eslint-plugin-promise: ESLint plugin that provides linting rules for promises
    11. jest: a JavaScript testing framework
    12. nodemon: a utility that monitors changes in the source code and automatically restarts the server
    13. serve: a static file server middleware for Express
    14. supertest: a library for testing HTTP servers
    15. ts-jest: a TypeScript preprocessor for Jest that allows running tests written in TypeScript
    16. ts-node: TypeScript execution and REPL for Node.js
    17. typescript: TypeScript compiler and language server
    18. webpack: a module bundler that takes modules with dependencies and generates optimized bundles
    19. webpack-cli: command-line interface for Webpack
    20. webpack-node-externals: a Webpack plugin that allows excluding Node.js modules from the bundled output
    21. webpack-shell-plugin: a Webpack plugin to run shell commands before or after the build process

## npm scripts

    1. "build": "npx tsc" - invoke the TypeScript Compiler (tsc) to compile TypeScript code into JavaScript
    2. "start": "node dist/index.js" - start the Node.js runtime and run the JavaScript code in the "index.js" file located in the "dist" directory
    3. "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\"" - instruct TypeScript compiler to watch for changes in the source code, automatically recompile the TypeScript files whenever a change occurs AND start the Node.js application using nodemon, which will monitor for changes in the compiled JavaScript files and automatically restart the application whenever a change occurs SIMULTANEOUSLY
    4. "test": "jest" - run tests with Jest testing framework
    5. "serve:coverage": "npm run test && cd coverage/lcov-report && npx serve" - run the "test" script, generate the code coverage report in the "coverage/lcov-report" directory, start a web server to serve the code coverage report files
