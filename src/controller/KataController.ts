import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IKataController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { getAllKatas, getKataByID, updateKataByID, deleteKataByID, createKata, rateKata, attemptKata } from "../domain/orm/Kata.orm";
import { IKata } from "../domain/interfaces/IKata.interface";

@Route("/api/katas")
@Tags("KataController")
export class KataController implements IKataController {
    /**
     * Endpoint to retreive katas in the Collection "Katas" of DB 
     * @param {string} id Id of the kata to retreive (optional)
     * @returns All katas or the kata found by ID
     */
    @Get("/")
    public async getKatas(@Query()page: number, @Query()limit: number, @Query()id?: string): Promise<any> {

        let response: any = '';
        
        if(id) {
            LogSuccess(`[/api/katas] Get kata by ID: ${id}`);
            response = await getKataByID(id);
        } else {
            LogSuccess('[/api/katas] Get all katas request')
            response = await getAllKatas(page, limit);
        }

        return response;
    }

    public async getKatasFilteredByLevel(page: any, limit: any, level: any): any {
        throw new Error("Method not implemented.");
    }

    public async getKatasFilteredByStars(page: any, limit: any, stars: any): any {
        throw new Error("Method not implemented.");
    }

    public async rateKata(kata: IKata, id: string, stars: number): Promise<IKata | undefined> {
        try {
            // Call the rateKata method from the Kata ORM to rate the kata
            return await rateKata(kata, id, stars);
        } catch (error) {
            LogError(`[Controller ERROR]: Rating kata: ${error}`);
        }
    }

    @Post("/")
    public async createKata(kata: IKata): Promise<any> {

        let response: any = '';

        if(kata) {
            LogSuccess(`[/api/katas] Create new kata: ${kata.name}`);
            await createKata(kata).then((r: any) => {
                LogSuccess(`[/api/katas] Created kata: ${kata.name} `);
                response = {
                    message: `Kata created successfully: ${kata.name}`
                }
            });
        } else {
            LogWarning('[/api/katas] Register needs kata entity')
            response = {
                message: 'Kata not registered: Please, provide a kata entity'
            }
        }
        return response;
    }

    /**
     * Endpoint to delete katas in the collection "Katas" of DB 
     * @param {string} id Kata ID to delete (optional)
     * @returns message informing if deletion was correct
     */
    @Delete("/")
    public async deleteKata(@Query()id?: string): Promise<any> {

        let response: any = '';

        if(id) {
            LogSuccess(`[/api/katas] Delete kata by ID: ${id}`);
            await deleteKataByID(id).then((r: any) => {
                response =  {
                    message: `Kata with id ${id} deleted successfully`
                }
            })
        } else {
            LogWarning('[/api/katas] Delete kata request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to remove from database'
            }
        }

        return response;

    }

    @Put("/")
    public async updateKata(@Query()id: string, kata: IKata): Promise<any> {

        let response: any = '';

        if(id) {
            LogSuccess(`[/api/katas] Update kata by ID: ${id}`);
            await updateKataByID(id, kata).then((r: any) => {
                response = {
                    message: `Kata with id ${id} updated successfully`
                }
            })
        } else {
            LogWarning('[/api/katas] Update kata request WITHOUT ID')
            response = {
                message: 'Please, provide an ID to update an existing user'
            }
        }

        return response;

    }

    public async attemptKata(kataId: string, userId: string, solution: string): Promise<string | undefined> {
        try {
            // Call the attemptKata method from the Kata ORM to attempt to solve the kata
            return await attemptKata(kataId, userId, solution);
        } catch (error) {
            LogError(`[Controller ERROR]: Attempting kata: ${error}`);
        }
    }

    // api/katas/upload
    @Post("/upload")
    public async updateKataFile(): Promise<any> {
        
    }
}
