/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nconst server_1 = __importDefault(__webpack_require__(/*! ./src/server */ \"./src/server/index.ts\"));\nconst logger_1 = __webpack_require__(/*! ./src/utils/logger */ \"./src/utils/logger.ts\");\ndotenv_1.default.config();\nconst port = process.env.PORT || 8000;\nserver_1.default.listen(port, () => {\n    (0, logger_1.LogSuccess)(`[SERVER ON]: Running in http://localhost:${port}/api`);\n});\n// * Control SERVER ERROR\nserver_1.default.on('error', (error) => {\n    (0, logger_1.LogError)(`[SERVER ERROR]: ${error}`);\n});\n\n\n//# sourceURL=webpack://code-verifier-backend/./index.ts?");

/***/ }),

/***/ "./src/controller/GoodbyeController.ts":
/*!*********************************************!*\
  !*** ./src/controller/GoodbyeController.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GoodbyeController = void 0;\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./src/utils/logger.ts\");\nclass GoodbyeController {\n    getMessage(name) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const currentDate = new Date().toDateString();\n            (0, logger_1.LogSuccess)('[/api/goodbye] Get Request');\n            return {\n                message: `Goodbye ${name || \"world\"}`,\n                date: currentDate\n            };\n        });\n    }\n}\nexports.GoodbyeController = GoodbyeController;\n\n\n//# sourceURL=webpack://code-verifier-backend/./src/controller/GoodbyeController.ts?");

/***/ }),

/***/ "./src/controller/HelloController.ts":
/*!*******************************************!*\
  !*** ./src/controller/HelloController.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HelloController = void 0;\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./src/utils/logger.ts\");\nclass HelloController {\n    getMessage(name) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const currentDate = new Date().toDateString();\n            (0, logger_1.LogSuccess)('[/api/hello] Get Request');\n            return {\n                message: `Hello ${name || \"world\"}`,\n                date: currentDate\n            };\n        });\n    }\n}\nexports.HelloController = HelloController;\n\n\n//# sourceURL=webpack://code-verifier-backend/./src/controller/HelloController.ts?");

/***/ }),

/***/ "./src/routes/GoodbyeRouter.ts":
/*!*************************************!*\
  !*** ./src/routes/GoodbyeRouter.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst GoodbyeController_1 = __webpack_require__(/*! ../controller/GoodbyeController */ \"./src/controller/GoodbyeController.ts\");\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./src/utils/logger.ts\");\n// Router from express\nlet goodbyeRouter = express_1.default.Router();\n// http://localhost:8000/api/goodbye/\ngoodbyeRouter.route('/')\n    // GET:\n    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    var _a;\n    // Obtain a Query Param\n    let name = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.name;\n    (0, logger_1.LogInfo)(`Query Param: ${name}`);\n    // Controller Instance to execute method\n    const controller = new GoodbyeController_1.GoodbyeController();\n    // Obtain Response\n    const response = yield controller.getMessage(name);\n    // Send the response to the client\n    return res.send(response);\n}));\nexports[\"default\"] = goodbyeRouter;\n\n\n//# sourceURL=webpack://code-verifier-backend/./src/routes/GoodbyeRouter.ts?");

/***/ }),

/***/ "./src/routes/HelloRouter.ts":
/*!***********************************!*\
  !*** ./src/routes/HelloRouter.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst HelloController_1 = __webpack_require__(/*! ../controller/HelloController */ \"./src/controller/HelloController.ts\");\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./src/utils/logger.ts\");\n// Router from express\nlet helloRouter = express_1.default.Router();\n// http://localhost:8000/api/hello/\nhelloRouter.route('/')\n    // GET:\n    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    var _a;\n    // Obtain a Query Param\n    let name = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.name;\n    (0, logger_1.LogInfo)(`Query Param: ${name}`);\n    // Controller Instance to execute method\n    const controller = new HelloController_1.HelloController();\n    // Obtain Response\n    const response = yield controller.getMessage(name);\n    // Send the response to the client\n    return res.send(response);\n}));\nexports[\"default\"] = helloRouter;\n\n\n//# sourceURL=webpack://code-verifier-backend/./src/routes/HelloRouter.ts?");

/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\n/**\n * Root Router\n * Redirections to Routers\n */\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst HelloRouter_1 = __importDefault(__webpack_require__(/*! ./HelloRouter */ \"./src/routes/HelloRouter.ts\"));\nconst GoodbyeRouter_1 = __importDefault(__webpack_require__(/*! ./GoodbyeRouter */ \"./src/routes/GoodbyeRouter.ts\"));\nconst logger_1 = __webpack_require__(/*! ../utils/logger */ \"./src/utils/logger.ts\");\n// Server instance\nlet server = (0, express_1.default)();\n// Router instance\nlet rootRouter = express_1.default.Router();\n// Activate for requests to http://localhost:8000/api\n// GET: http://localhost:8000/api/\nrootRouter.get('/', (req, res) => {\n    (0, logger_1.LogInfo)('GET: http//localhost:8000/api/');\n    res.send('Welcome to API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose');\n});\n// Redirections to Routers & Controllers\nserver.use('/', rootRouter); // http://localhost:8000/api/\nserver.use('/hello', HelloRouter_1.default); // http://localhost:8000/api/hello\nserver.use('/goodbye', GoodbyeRouter_1.default); // http://localhost:8000/api/goodbye\n// Add more routes to the app\nexports[\"default\"] = server;\n\n\n//# sourceURL=webpack://code-verifier-backend/./src/routes/index.ts?");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\n// Security\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\n// TODO: HTTPS\n// Root Router\nconst routes_1 = __importDefault(__webpack_require__(/*! ../routes */ \"./src/routes/index.ts\"));\n// * Create Express APP\nconst server = (0, express_1.default)();\n// * Define SERVER to use \"/api\" rootRouter from 'index.ts' in routes\n// From this point: http://localhost:8000/api/...\nserver.use('/api', routes_1.default);\n// TODO: Mongoose Connection\n// * Security Config\nserver.use((0, helmet_1.default)());\nserver.use((0, cors_1.default)());\n// * Content Type Config\nserver.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));\nserver.use(express_1.default.json({ limit: '50mb' }));\n// * Redirection Config\n// http://localhost:8000/ --> http://localhost:8000/api/\nserver.get('/', (req, res) => {\n    res.redirect('/api');\n});\nexports[\"default\"] = server;\n\n\n//# sourceURL=webpack://code-verifier-backend/./src/server/index.ts?");

/***/ }),

/***/ "./src/utils/logger.ts":
/*!*****************************!*\
  !*** ./src/utils/logger.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.LogError = exports.LogWarning = exports.LogSuccess = exports.LogInfo = void 0;\nconst LogInfo = (message) => {\n    console.log(`Info: ${message}`);\n};\nexports.LogInfo = LogInfo;\nconst LogSuccess = (message) => {\n    console.log(`Success: ${message}`);\n};\nexports.LogSuccess = LogSuccess;\nconst LogWarning = (message) => {\n    console.log(`Warning: ${message}`);\n};\nexports.LogWarning = LogWarning;\nconst LogError = (message) => {\n    console.log(`Error: ${message}`);\n};\nexports.LogError = LogError;\n\n\n//# sourceURL=webpack://code-verifier-backend/./src/utils/logger.ts?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("helmet");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;