import { Get, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError } from "../utils/logger";

// ORM - Users Collection
import { getAllUsers, getUserByID } from "../domain/orm/User.orm";

@Route("/api/users")
@Tags("UserController")
export class UserController implements IUserController {
    /**
     * Endpoint to retrieve the Users in the Collection "Users" of DB
    */
    @Get("/")
    public async getUsers(@Query()id?: string): Promise<any> {
        let response: any = '';
        if(id) {
            LogSuccess(`[/api/users] Get User By ID: ${id}`);
            response = await getUserByID(id);
        } else {
            LogSuccess('[/api/users] Get All Users Request');
            response = await getAllUsers();
        }
        return response;
    }
}
