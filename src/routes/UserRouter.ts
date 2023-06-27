import express, { Request, Response } from "express";
import { UserController } from "../controller/UserController";
import { LogInfo } from "../utils/logger";

// Body Parser to read BODY from requests
import bodyParser from 'body-parser';

let jsonParser = bodyParser.json();

// BCRYPT for passwords
import bcrypt from 'bcrypt';
import { isNumberObject } from "util/types";

// Router from express
let userRouter = express.Router();

// http://localhost:8000/api/users?id=...
userRouter.route('/')

    // GET:
    .get(async(req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        // Controller Instance to execute method
        const controller: UserController = new UserController();
        // Obtain Response
        const response: any = await controller.getUsers(id);
        // Send the response to the client
        return res.status(200).send(response);
    })

    // DELETE:
    .delete(async (req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        // Controller Instance to execute method
        const controller: UserController = new UserController();
        // Obtain Response
        const response: any = await controller.deleteUser(id);
        // Send the response to the client
        return res.status(200).send(response);
    })

    // PUT:
    .put(async (req: Request, res: Response) => {
        // Obtain a Query Param (ID)
        let id: any = req?.query?.id;
        let name: any = req?.query?.name;
        let email: any = req?.query?.email;
        let age: any = req?.query?.age;
        LogInfo(`Query Param: ${id}, ${name}, ${age}, ${email}`);
        // Controller Instance to execute method
        const controller: UserController = new UserController();
        let user = {
            name: name || 'default',
            email: email || 'default email',
            age: age || 18
        }
        // Obtain Response
        const response: any = await controller.updateUser(id, user);
        // Send the response to the client
        return res.status(200).send(response);
    })

export default userRouter;

/**
 * 
 * Get Documents => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (Entity) / 204 (No return)
 * Update of Documents => 200 (Entity) / 204 (No return)
 * 
 */
