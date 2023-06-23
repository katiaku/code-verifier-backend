import { Get, Query, Route, Tags } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";

// ORM - Users Collection
import { deleteUserByID, getAllUsers, getUserByID } from "../domain/orm/User.orm";

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

    @Delete("/")
    public async deleteUser(@Query()id?: string): Promise<any> {
        let response: any = '';
        if(id) {
            LogSuccess(`[/api/users] Delete User By ID: ${id}`);
            await deleteUserByID(id).then((r) => {
                response: {
                    message: `User with id ${id} deleted successfully`
                }
            })
        } else {
            LogWarning('[/api/users] Delete User Request WITHOUT ID');
            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }
        return response;
    }
}
