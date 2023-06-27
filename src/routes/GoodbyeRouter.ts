import express, { Request, Response } from "express";
import { GoodbyeController } from "../controller/GoodbyeController";
import { LogInfo } from "../utils/logger";
import { BasicResponse } from "src/controller/types";

// Router from express
let goodbyeRouter = express.Router();

// http://localhost:8000/api/goodbye/
goodbyeRouter.route('/')
    // GET:
    .get(async(req: Request, res: Response) => {
        // Obtain a query param
        let name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`);
        // Controller instance to execute method
        const controller: GoodbyeController = new GoodbyeController();
        // Obtain response
        const response: BasicResponse = await controller.getMessage(name);
        // Send the response to the client
        return res.send(response);
    });

export default goodbyeRouter;
