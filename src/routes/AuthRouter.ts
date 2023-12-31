import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { IUser } from "../domain/interfaces/IUser.interface"
import { IAuth } from "../domain/interfaces/IAuth.interface";

// BCRYPT for passwords
import bcrypt from 'bcrypt';

// Middleware
import { verifyToken } from '../middlewares/verifyToken.middleware';

// Body Parser (read JSON from body in requests)
import bodyParser from 'body-parser';

// Middleware to read JSON in Body
let jsonParser = bodyParser.json();

// Router from express
let authRouter = express.Router();

authRouter.route('/register')
    .post (jsonParser, async (req: Request, res: Response) => {

        let { name, email, password, age } = req?.body;
        let hashedPassword = '';

        if(name && password && email && age) {
            // Obtain the password in request and cypher
            hashedPassword = bcrypt.hashSync(password, 8);

            let newUser: IUser = {
                name,
                email,
                password: hashedPassword,
                age,
                katas: []
            }

            // Controller instance to execute method
            const controller: AuthController = new AuthController();
            
            // Obtain response
            const response: any = await controller.registerUser(newUser);

            // Send the response to the client
            return res.status(200).send(response);
        } else {
            return res.status(400).send({
                message: '[ERROR User data missing]: No user can be registered'
            });
        }
    })

authRouter.route('/login')
    .post (jsonParser, async (req: Request, res: Response) => {

        let { email, password } = req?.body;

        if(email && password) {

            // Controller Instance to execute method
            const controller: AuthController = new AuthController();

            let auth: IAuth = {
                email: email,
                password: password
            }
            
            // Obtain response
            const response: any = await controller.loginUser(auth);

            // Send the response to the client (includes the JWT to authorize requests)
            return res.status(200).send(response);
        } else {
            return res.status(400).send({
                message: '[ERROR User data missing]: No user can be registered'
            });
        }
    });

// Route protected by VERIFY TOKEN middleware
authRouter.route('/me')
    .get(verifyToken, async (req: Request, res: Response) => {

        // Obtain the ID of user to check it's data
        let id: any = req?.query?.id;

        if(id) {

            // Controller: auth controller
            const controller: AuthController = new AuthController();

            // Obtain response from controller
            let response: any = await controller.userData(id);

            // If user is authorised:
            return res.status(200).send(response);

        } else {
            return res.status(401).send({
                message: 'You are not authorised to perform this action'
            })
        }
    })

export default authRouter;
