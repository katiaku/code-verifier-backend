import { Delete, Get, Post, Put, Query, Route, Tags } from "tsoa";
import { IKataController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { getAllKatas, getKataByID, updateKataByID, deleteKataByID, createKata } from "../domain/orm/Kata.orm";
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
}
