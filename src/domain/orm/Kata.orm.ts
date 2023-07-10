import { kataEntity } from '../entities/Kata.entity';
import { LogSuccess, LogError } from "../../utils/logger";
import { IKata  } from "../interfaces/IKata.interface";

import dotenv from 'dotenv';
dotenv.config();

// CRUD

/**
 * Method to obtain all katas from Collection "Katas" in Mongo Server
 */
export const getAllKatas = async (): Promise<any[] | undefined> => {

    try {
        let kataModel = kataEntity();
        let response: any = {};
        // Search all katas
        await kataModel.find({ isDeleted: false })
            .exec().then((katas: IKata[]) => {
                response.katas = katas;
            });
        return response;
    } catch (error) {
        LogError(`[ORM ERROR]: Getting all katas: ${error}`);
    }

}

// - Get Kata By ID
export const getKataByID = async (id: string) : Promise<any | undefined> => {

    try {
        let kataModel = kataEntity();
        // Search kata by ID
        return await kataModel.findById(id)
    } catch (error) {
        LogError(`[ORM ERROR]: Getting kata by ID: ${error}`);
    }

}

// - Delete Kata By ID
export const deleteKataByID = async (id: string): Promise<any | undefined> => {

    try {
        let kataModel = kataEntity();

        // Delete Kata BY ID
        return await kataModel.deleteOne({ _id: id })

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting kata by ID: ${error}`);
    }

}

// - Create New Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {

    try {
        let kataModel = kataEntity();
        // Create/insert new kata
        return await kataModel.create(kata);
    } catch (error) {
        LogError(`[ORM ERROR]: Creating kata: ${error}`);
    }

}

// - Update Kata By ID
export const updateKataByID = async (id: string, kata: IKata): Promise<any | undefined> => {

    try {
        let kataModel = kataEntity();
        // Update Kata
        return await kataModel.findByIdAndUpdate(id, kata);
    } catch (error) {
        LogError(`[ORM ERROR]: Updating kata ${id}: ${error}`);
    }

}
