import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to API Restful: Express + TS + Nodemon + Jest + Swagger + Mongoose');
});

app.get('/hello/:name?', (req: Request, res: Response) => {
    const { name } = req.params;
    if(!name) {
        res.json({"message": "Hello, anonymous"});
    } else {
        res.json({"message": `Hello, ${name}`});
    }
});

app.get('/goodbye', (req: Request, res: Response) => {
    res.send({"message": "Goodbye, world"})
});

app.listen(port, () => {
    console.log(`EXPRESS SERVER: Running at http://localhost:${port}`);
});
