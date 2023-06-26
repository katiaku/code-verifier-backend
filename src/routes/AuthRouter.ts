import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../domain/interfaces/IUser.interface"
import { IAuth } from "../domain/interfaces/IAuth.interface";

// BCRYPT for passwords
import bcrypt from 'bcrypt';

// Router from express
let authRouter = express.Router();

authRouter.route('/auth/register')
    .post (async (req: Request, res: Response) => {

        let { name, email, password, age } = req.body;
        let hashedPassword = '';

        if(name && password && email && age) {
            // Obtain the password in request and cypher
            hashedPassword = bcrypt.hashSync(password, 8);

            let newUser: IUser = {
                name,
                email,
                password: hashedPassword,
                age
            }

            // Controller Instance to execute method
            const controller: AuthController = new AuthController();
            
            // Obtain Response
            const response: any = await controller.registerUser(newUser);
            // Send the response to the client
            return res.status(200).send(response);
        }
    })

authRouter.route('/auth/login')
    .post (async (req: Request, res: Response) => {

        let { email, password } = req.body;

        if(email && password) {

            // Controller Instance to execute method
            const controller: AuthController = new AuthController();

            let auth: IAuth = {
                email: email,
                password: password
            }
            
            // Obtain Response
            const response: any = await controller.loginUser(auth);
            // Send the response to the client (includes the JWT to authorize requests)
            return res.status(200).send(response);
        }
    });

    export default authRouter;
