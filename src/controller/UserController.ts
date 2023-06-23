import { Get, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError } from "../utils/logger";

// ORM - Users Collection
import { getAllUsers } from "../domain/orm/User.orm";
import { BasicResponse } from "./types";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * Endpoint to retrieve the Users in the Collection "Users" of DB
     */
    public async getUsers(): Promise<any> {
        LogSuccess('[/api/users] Get All Users Request');
        const response = await getAllUsers();
        return response;
    }
}
