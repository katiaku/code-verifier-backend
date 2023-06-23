import { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";

// CRUD

/**
 * Method to obtain all users from collection "Users" in Mongo Server
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();
        // Search all users
        return await userModel.find({ isDeleted: false })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Users: ${error}`);
    }
}

// TODO:
// - Get User By ID
export const getUserByID = async (id: string) : Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.findById(id)
    } catch (error) {
        LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
    }
}

// - Delete User By ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.deleteOne({ _id: id })
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting User By ID: ${error}`);
    }
}

// - Create New User
export const createUser = async (user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        // Create / Insert new User
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`);
    }
}

// - Get User By Email
