import { BasicResponse } from "../types";

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IGoodbyeController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IUserController {
    // Read all users from database || get User by ID
    getUsers(id?: string): Promise<any>
    // Delete user by ID
    deleteUser(id?: string): Promise<any>
    // Create new User
    createUser(user: any): Promise<any>
}
