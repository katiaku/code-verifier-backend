import { userEntity } from "../entities/User.entity";
import { LogSuccess, LogError } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserResponse } from "../types/UsersResponse.type";
import { kataEntity } from "../entities/Kata.entity";
import { IKata } from "../interfaces/IKata.interface";
import mongoose from "mongoose";

// Configuration of environment variables
dotenv.config();

// Obtain Secret key to generate JWT
const secret = process.env.SECRETKEY || 'MYSECRETKEY';

// CRUD

/**
 * Method to obtain all users from collection "Users" in Mongo Server
 */
export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {

    try {
        let userModel = userEntity();

        let response: any = {};

        // Search all users (using pagination)
        await userModel.find({isdeleted: false})
            .select('name email age katas')
            .limit(limit)
            .skip((page -1) * limit)
            .exec().then((users: IUser[]) => {
                response.users = users;
            });

        // Count total documents in the collection "Users"
        await userModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting all users: ${error}`);
    }

}

// - Get User By ID
export const getUserByID = async (id: string) : Promise<any | undefined> => {

    try {
        let userModel = userEntity();
        return await userModel.findById(id).select('name email age katas');
    } catch (error) {
        LogError(`[ORM ERROR]: Getting user by ID: ${error}`);
    }

}

// - Delete User By ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {

    try {
        let userModel = userEntity();
        return await userModel.deleteOne({ _id: id })
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting user by ID: ${error}`);
    }

}

// - Update User By ID
export const updateUserByID = async (id: string, user: any): Promise<any | undefined> => {

    try {
        let userModel = userEntity();
        // Update User
        return await userModel.findByIdAndUpdate(id, user);
    } catch (error) {
        LogError(`[ORM ERROR]: Updating user ${id}: ${error}`);
    }

}

// - Get User By Email

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {

    try {
        let userModel = userEntity();
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM ERROR]: Registering user: ${error}`);
    }

}

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {

    try {
        let userModel = userEntity();
        let userFound: IUser | undefined = undefined;
        let token = undefined;

        // Check if user exists by Unique Email
        await userModel.findOne({email: auth.email}).then((user: IUser) => {
            userFound = user;
        }).catch((error) => {
            console.error(`[ERROR Authentication in ORM]: User not found`);
            throw new Error(`[ERROR Authentication in ORM]: User not found: ${error}`);
        });

        // Check if the password is valid (compare with bcrypt)
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

        if(!validPassword) {
            console.error(`[ERROR Authentication in ORM]: Password is not valid`);
            throw new Error(`[ERROR Authentication in ORM]: Password is not valid`);
        }

        // Generate JWT
        token = jwt.sign({email: userFound!.email}, secret, {
            expiresIn: "2h"
        });

        return {
            user: userFound,
            token: token
        }

    } catch (error) {
        LogError(`[ORM ERROR]: Creating user: ${error}`);
    }

}

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {
    // TODO: NOT IMPLEMENTED
}

/**
 * Method to obtain all users from collection "Users" in Mongo Server
 */
export const getKatasFromUser = async (page: number, limit: number, id: string): Promise<any[] | undefined> => {

    try {
        let userModel = userEntity();
        let katasModel = kataEntity();

        let katasFound: IKata[] = [];

        let response: any = {
            katas: []
        };

        await userModel.findById(id).then((user: IUser) => {
            response.user = user.email;
            // Create types to search
            let objectIds: mongoose.Types.ObjectId[] = [];
            user.katas.forEach((kataID: string) => {
                let objectID = new mongoose.Types.ObjectId(kataID);
                objectIds.push(objectID)
            });

            katasModel.find({"_id": {"$in": objectIds}}).then((katas: IKata[]) => {
                katasFound = katas;
            });

        }).catch((error) => {
            LogError(`[ORM ERROR]: Obtaining user: ${error}`);
        })

        response.katas = katasFound;

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting all users: ${error}`);
    }

}
