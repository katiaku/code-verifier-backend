import express, { Request, Response } from "express";
import { HelloController } from "../controller/HelloController";
import { LogInfo } from "../utils/logger";
import { BasicResponse } from "src/controller/types";

// Router from express
let helloRouter = express.Router();

// http://localhost:8000/api/hello/
helloRouter.route('/')
    // GET:
    .get(async(req: Request, res: Response) => {
        // Obtain a query param
        let name: any = req?.query?.name;
        LogInfo(`Query Param: ${name}`);
        // Controller instance to execute method
        const controller: HelloController = new HelloController();
        // Obtain response
        const response: BasicResponse = await controller.getMessage(name);
        // Send the response to the client
        return res.send(response);
    });

export default helloRouter;
