import { BasicResponse } from "./types";
import { IGoodbyeController } from "./interfaces";
import { LogSuccess } from "../utils/logger";

export class GoodbyeController implements IGoodbyeController {
    public async getMessage(name?: string): Promise<BasicResponse> {
        const currentDate = new Date().toDateString();
        LogSuccess('[/api/goodbye] Get Request');
        return {
            message: `Goodbye ${name || "world"}`,
            date: currentDate
        }
    }
}
