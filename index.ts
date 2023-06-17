import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose');
});

app.get('/hello', (req: Request, res: Response) => {
    res.send('Welcome to GET Route: Hello');
});

app.get('/goodbye', (req: Request, res: Response) => {
    res.send({"message": "Goodbye, world"})
});

app.listen(port, () => {
    console.log(`EXPRESS SERVER: Running at http://localhost:${port}`);
});
