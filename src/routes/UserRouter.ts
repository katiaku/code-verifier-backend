import express, { Request, Response } from "express";
import { UserController } from "../controller/UserController";
import { LogInfo } from "../utils/logger";
import bodyParser from 'body-parser';

let jsonParser = bodyParser.json();

// BCRYPT for passwords
import bcrypt from 'bcrypt';

import { isNumberObject } from "util/types";
import { verifyToken } from "src/middlewares/verifyToken.middleware";

// Router from express
let userRouter = express.Router();

// http://localhost:8000/api/users?id=...
userRouter.route('/')

    // GET:
    .get(verifyToken, async(req: Request, res: Response) => {
        // Obtain a query param (ID)
        let id: any = req?.query?.id;

        // Pagination
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;

        LogInfo(`Query param: ${id}`);
        // Controller instance to execute method
        const controller: UserController = new UserController();
        // Obtain response
        const response: any = await controller.getUsers(page, limit, id);
        // Send the response to the client
        return res.status(200).send(response);
    })

    // DELETE:
    .delete(verifyToken, async (req: Request, res: Response) => {
        // Obtain a query param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);
        // Controller instance to execute method
        const controller: UserController = new UserController();
        // Obtain response
        const response: any = await controller.deleteUser(id);
        // Send the response to the client
        return res.status(200).send(response);
    })

    // PUT:
    .put(verifyToken, async (req: Request, res: Response) => {
        // Obtain a query param (ID)
        let id: any = req?.query?.id;
        let name: any = req?.query?.name;
        let email: any = req?.query?.email;
        let age: any = req?.query?.age;
        LogInfo(`Query param: ${id}, ${name}, ${age}, ${email}`);
        // Controller instance to execute method
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
    });

// http://localhost:8000/api/users?id=6253dc47f30baed4c6de7f99
// userRouter.route('/katas')
//     .get(verifyToken, async (req: Request, res: Response) => {
//         // Obtain a query param (ID)
//         let id: any = req?.query?.id;
//         // Controller instance to excute method
//         const controller: UserController = new UserController();
//         // Obtain reponse
//         const response: any = await controller.getKatas(id);
//         // Send to the client the response
//         return res.status(200).send(response);

//     });

export default userRouter;

/**
 * 
 * Get Documents => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (Entity) / 204 (No return)
 * Update of Documents => 200 (Entity) / 204 (No return)
 * 
 */
