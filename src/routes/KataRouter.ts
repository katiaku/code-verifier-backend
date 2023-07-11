import express, { Request, Response } from "express";
import { KataController  } from "../controller/KataController";
import { LogInfo } from "../utils/logger";
import bodyParser from "body-parser";

// JWT Verifier MiddleWare
import { verifyToken } from '../middlewares/verifyToken.middleware';
import { KataLevel, IKata } from "../domain/interfaces/IKata.interface";

let jsonParser = bodyParser.json();
let kataRouter = express.Router();

// http://localhost:8000/api/users?id=6253dc47f30baed4c6de7f99
kataRouter.route('/')
    // GET:
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtain a query param (ID)
        let id: any = req?.query?.id;
        // Pagination
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;        
        LogInfo(`Query Param: ${id}`);
        // Controller instance to excute method
        const controller: KataController = new KataController();
        // Obtain reponse
        const response: any = await controller.getKatas(page, limit, id)
        // Send to the client the response
        return res.status(200).send(response);
    })

    // DELETE:
    .delete(verifyToken, async (req:Request, res: Response) => {
        // Obtain a query param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query param: ${id}`);
        // Controller instance to excute method
        const controller: KataController = new KataController();
        // Obtain reponse
        const response: any = await controller.deleteKata(id);
        // Send to the client the response
        return res.status(200).send(response);
    })

    .put(jsonParser, verifyToken, async (req:Request, res: Response) => {
        // Obtain a query param (ID)
        let id: any = req?.query?.id;
        
        // Read from body
        let name: string = req?.body?.name;
        let description: string = req?.body?.description || 'Default description';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents: number = req?.body?.intents || 0;
        let stars: number = req?.body?.starts || 0;
        let creator: string = req?.body?.creator;
        let solution: string = req?.body?.solution || '';
        let participants: string[] = req?.body?.participants || [];


        if(name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants.length >= 0){
            // Controller instance to excute method
            const controller: KataController = new KataController();

            let kata: IKata = {
                name: name,
                description: description,
                level: level,
                intents: intents,
                stars: stars,
                creator: creator,
                solution: solution,
                participants: participants
            }

            // Obtain response
            const response: any = await controller.updateKata(id, kata);

            // Send the response to the client
            return res.status(200).send(response);

        }else {
            return res.status(400).send({
                message: '[ERROR] Updating kata. You need to send all kata attrs to update it'
            });
        }
    })

    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
        // Read from body
        let name: string = req?.body?.name;
        let description: string = req?.body?.description || 'Default description';
        let level: KataLevel = req?.body?.level || KataLevel.BASIC;
        let intents: number = req?.body?.intents || 0;
        let stars: number = req?.body?.stars || 0;
        let creator: string = req?.body?.creator;
        let solution: string = req?.body?.solution || 'Default solution';
        let participants: string[] = req?.body?.participants || [];

        let kataSent: IKata = {
            name: name,
            description: description,
            level: level,
            intents: intents,
            stars: stars,
            creator: creator,
            solution: solution,
            participants: participants
        }

        console.log('Kata:', kataSent)

        if(name && description && level && intents >= 0 && stars >= 0 && creator && solution && participants.length >= 0) {
            // Controller instance to excute method
            const controller: KataController = new KataController();

            let kata: IKata = {
                name: name,
                description: description,
                level: level,
                intents: intents,
                stars: stars,
                creator: creator,
                solution: solution,
                participants: participants
            }

            // Obtain response
            const response: any = await controller.createKata(kata);

            // Send to the client the response
            return res.status(201).send(response);

        } else {
            return res.status(400).send({
                message: '[ERROR] Creating kata. You need to send all attrs of Kata to update it'
            });
        }
    })

export default kataRouter;

/**
 * 
 * Get Documents => 200 OK
 * Creation Documents => 201 OK
 * Deletion of Documents => 200 (Entity) / 204 (No return)
 * Update of Documents =>  200 (Entity) / 204 (No return)
 * 
 */
