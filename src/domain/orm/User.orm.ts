import { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

// - Update User By ID
export const updateUserByID = async (id: string, user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        // Update User
        return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
}

// - Get User By Email

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM ERROR]: Registering User: ${error}`);
    }
}

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        // Find User by email
        userModel.findOne({ email: auth.email }, (err: any, user: IUser) => {

            if(err) {
                // TODO: retur ERROR -> EROR while searching (500)
            }

            if(!user) {
                // TODO: retur ERROR -> EROR USER NOT FOUND (404)
            }

            // Use Bcrypt to Compare Passwords
            let validPassword = bcrypt.compareSync(auth.password, user.password);

            if(!validPassword) {
                // TODO: --> NOT AUTHORISED (401)
            }

            // Create JWT
            // TODO: Secret must be in .env
            let token = jwt.sign({email: user.email}, 'MYSECRETWORD', {
                expiresIn: "2h"
            });

            return token;
        })

    } catch (error) {
        LogError(`[ORM ERROR]: Creating User: ${error}`);
    }
}

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
    // TODO: NOT IMPLEMENTED
}
