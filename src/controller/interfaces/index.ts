import { BasicResponse } from "../types";

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IGoodbyeController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IUsersController {
    // Read all users from database
    getUsers(): Promise<any>
}
