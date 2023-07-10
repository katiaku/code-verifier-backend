## Node.js Project Dependencies

### Dependencies

    1. dotenv: loads environment variables from a .env file
    2. express: Node.js framework
    3. cors: Cross-Origin Resource Sharing allows to specify which domains are allowed to make requests to the server, what HTTP methods are allowed, and what headers can be sent
    4. helmet: security middleware that sets appropriate HTTP headers
    5. mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js
    6. bcrypt: a library for hashing passwords
    7. bcryptjs: a JS implementation of the bcrypt algorithm
    8. body-parser: a middleware for parsing the request body
    9. jsonwebtoken: a library for generating and verifying JSON Web Tokens used for authentication and authorization
    10. swagger-jsdoc: generates Swagger/OpenAPI specification documentation based on JSDoc comments in the code
    11. swagger-ui-express: serves the Swagger UI interface to visualize and interact with a Swagger/OpenAPI specification
    12. tsoa: generates OpenAPI specifications and routing controllers based on decorators and TypeScript annotations

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
    22. @types/cors: type definition package for the cors module in TypeScript projects

## Npm Scripts

    1. "build": "npx tsc" - invoke the TypeScript Compiler (tsc) to compile TypeScript code into JavaScript
    2. "start": "node dist/index.js" - start the Node.js runtime and run the JavaScript code in the "index.js" file located in the "dist" directory
    3. "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\"" - instruct TypeScript compiler to watch for changes in the source code, automatically recompile the TypeScript files whenever a change occurs AND start the Node.js application using nodemon, which will monitor for changes in the compiled JavaScript files and automatically restart the application whenever a change occurs SIMULTANEOUSLY
    4. "test": "jest" - run tests with Jest testing framework
    5. "serve:coverage": "npm run test && cd coverage/lcov-report && npx serve" - run the "test" script, generate the code coverage report in the "coverage/lcov-report" directory, start a web server to serve the code coverage report files

## Environment Variables

The environment variables of the app are located in .env file. These variables can include settings such as database connection strings, API keys, a specific port number.

The PORT variable is used to specify the network port on which a server or application should listen for incoming network requests.
