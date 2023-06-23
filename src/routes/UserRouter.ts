import express, { Request, Response } from "express";
import { UserController } from "../controller/UserController";
import { LogInfo } from "src/utils/logger";

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
        return res.send(response);
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
        return res.send(response);
    })
    // POST:
    .post(async (req: Request, res: Response) => {
        let name: any = req?.query?.name;
        let age: any = req?.query?.age;
        let email: any = req?.query?.email;
        // Controller Instance to execute method
        const controller: UserController = new UserController();
        let user = {
            name: name || 'default',
            email: email || 'default email',
            age: age || 18
        }
        // Obtain Response
        const response: any = await controller.createUser(user);
        // Send the response to the client
        return res.send(response);
    })

export default userRouter;
