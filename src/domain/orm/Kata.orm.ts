import { kataEntity } from '../entities/Kata.entity';

import { LogSuccess, LogError } from "../../utils/logger";

// CRUD

/**
 * Method to obtain all Katas from Collection "Katas" in Mongo Server
 */
export const getAllKatas = async (): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();
        // Search all katas
        return await kataModel.find({ isDeleted: false })
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Katas: ${error}`);
    }
}

// - Get Kata By ID
export const getKataByID = async (id: string) : Promise<any | undefined> => {

    try {
        let kataModel = kataEntity();

        // Search Kata By ID
        return await kataModel.findById(id)

    } catch (error) {
        LogError(`[ORM ERROR]: Getting Kata By ID: ${error}`);
    }

}

// - Delete Kata By ID
export const deleteKataByID = async (id: string): Promise<any | undefined> => {

    try {
        let kataModel = kataEntity();

        // Delete Kata BY ID
        return await kataModel.deleteOne({ _id: id })

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting Kata By ID: ${error}`);
    }

}

// - Create New Kata
export const createKata = async (kata: any): Promise<any | undefined> => {

    try {
        
        let kataModel = kataEntity();

        // Create / Insert new Kata
        return await kataModel.create(kata);

    } catch (error) {
        LogError(`[ORM ERROR]: Creating Kata: ${error}`);
    }

}

// - Update Kata By ID
export const updateKataByID = async (id: string, kata: any): Promise<any | undefined> => {

    try {
        
        let kataModel = kataEntity();

        // Update Kata
        return await kataModel.findByIdAndUpdate(id, kata);

    } catch (error) {
        LogError(`[ORM ERROR]: Updating Kata ${id}: ${error}`);
    }

}
