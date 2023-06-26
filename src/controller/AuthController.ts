import { Get, Query, Route, Tags, Delete, Post, Put } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";

// ORM imports
import { registerUser, loginUser, logoutUser } from "../domain/orm/User.orm"

@Route("/api/auth")
@Tags("AuthController")
export class AuthController implements IAuthController {

    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {
        let response: any = '';
        if(user) {
            LogSuccess(`[/api/auth/register] Register User: ${user}`);
            await registerUser(user).then((r) => {
                LogSuccess(`[/api/auth/register] Created User: ${user}`);
                response = {
                    message: `User created successfully: ${user.name}`
                }
            });
        } else {
            LogWarning('[/api/auth/register] Register needs User Entity');
            response = {
                message: 'Please, provide a User Entity to create one'
            }
        }
        return response;
    }

    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {
        let response: any = '';
        if(auth) {
            LogSuccess(`[/api/auth/login] Login User: ${auth.email}`);
            await loginUser(auth).then((r) => {
                LogSuccess(`[/api/auth/login] Logged In User: ${auth.email}`);
                response = {
                    message: `User Logged In successfully: ${auth.email}`,
                    token: r.token // JWT generated for logged in user
                }
            });
        } else {
            LogWarning('[/api/auth/login] Register needs Auth Entity (email && password)');
            response = {
                message: 'Please, provide email && password to login'
            }
        }
        return response;
    }

    @Post("/logout")
    public async logoutUser(): Promise<any> {
        let response: any = '';
        // TODO: Close session of user
        throw new Error("Method not implemented.");
    }

}
