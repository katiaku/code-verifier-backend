"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get('/', (req, res) => {
    res.send('Welcome to API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose');
});
app.get('/hello', (req, res) => {
    res.send('Welcome to GET Route: Hello');
});
app.get('/goodbye', (req, res) => {
    res.send({ "message": "Goodbye, world" });
});
app.listen(port, () => {
    console.log(`EXPRESS SERVER: Running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map