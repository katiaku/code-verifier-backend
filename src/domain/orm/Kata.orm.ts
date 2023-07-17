import { kataEntity } from '../entities/Kata.entity';
import { LogSuccess, LogError } from "../../utils/logger";
import { IKata  } from "../interfaces/IKata.interface";
import dotenv from 'dotenv';

dotenv.config();

// CRUD

/**
 * Method to obtain all katas from Collection "Katas" in Mongo Server
 */
export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {

    try {
        let kataModel = kataEntity();
        let response: any = {};
        
        // Search all Katas (using pagination)
        await kataModel.find({isDeleted: false})
            .select('name level stars')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas: IKata[]) => {
                response.katas = katas;
            });
        
        // Count total documents in collection "Katas"
        await kataModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: Getting all katas: ${error}`);
    }

}

// - Get Katas filtered and sorted by difficulty level
export const getKatasFilteredByLevel = async (page: number, limit: number, level: string): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();
        let response: any = {};

        // Search katas with the specified difficulty level (using pagination)
        await kataModel.find({ isDeleted: false, level: level })
            .select('name level stars')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()
            .then((katas: IKata[]) => {
                response.katas = katas;
            });

        // Count total documents in collection "Katas" with the specified difficulty level
        await kataModel.countDocuments({ isDeleted: false, level: level })
            .then((total: number) => {
                response.totalPages = Math.ceil(total / limit);
                response.currentPage = page;
        });

        return response;
    } catch (error) {
        LogError(`[ORM ERROR]: Getting katas filtered by level: ${error}`);
    }
};

// - Get Katas filtered and sorted by stars
export const getKatasFilteredByStars = async (page: number, limit: number, stars: number): Promise<any[] | undefined> => {
    try {
        let kataModel = kataEntity();
        let response: any = {};

        // Search katas with the specified number of stars (using pagination)
        await kataModel.find({ isDeleted: false, stars: stars })
            .select('name level stars')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()
            .then((katas: IKata[]) => {
                response.katas = katas;
        });

        // Count total documents in collection "Katas" with the specified number of stars
        await kataModel
            .countDocuments({ isDeleted: false, stars: stars })
            .then((total: number) => {
                response.totalPages = Math.ceil(total / limit);
                response.currentPage = page;
        });

        return response;
    } catch (error) {
        LogError(`[ORM ERROR]: Getting katas filtered by stars: ${error}`);
    }
};

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

        // Delete Kata By ID
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
        if(kata.creator !== id) {
            throw new Error('You are not authorized to edit this kata');
        } else {
            // Update Kata
            return await kataModel.findByIdAndUpdate(id, kata);
        }
    } catch (error) {
        LogError(`[ORM ERROR]: Updating kata ${id}: ${error}`);
    }

}

// Rate a Kata
export const rateKata = async (id: string, kata: IKata, stars: number): Promise<IKata | undefined> => {
    try {
        let kataModel = kataEntity();

        // Find the kata by its ID
        const kataToUpdate = await kataModel.findById(id);

        if (!kataToUpdate) {
            throw new Error('Kata not found');
    }

    // Check if the user has already rated the kata
    const existingRating = kataToUpdate.stars.find((stars) => stars.id === id);
        if (existingRating) {
        // If the user has already rated the kata, update their existing rating
        existingRating.stars = stars;
        } else {
            // If the user hasn't rated the kata before, add their new rating to the ratings array
            kataToUpdate.stars.push({ id, stars });
        }

        // Calculate the average stars for the kata
        const totalStars = kataToUpdate.ratings.reduce((sum, stars) => sum + stars, 0);
        const averageStars = totalStars / kataToUpdate.stars.length;
        kataToUpdate.stars = averageStars;

        // Save the updated kata
        await kataToUpdate.save();
        return kataToUpdate;
    } catch (error) {
        LogError(`[ORM ERROR]: Rating kata: ${error}`);
    }
};
