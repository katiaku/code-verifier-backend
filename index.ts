import dotenv from "dotenv";
import server from '@/server';
import { LogError, LogSuccess } from "@/utils/logger";

dotenv.config();

const port = process.env.PORT || 8000;

server.listen(port, () => {
    LogSuccess(`[SERVER ON]: Running in http://localhost:${port}/api`)
});

// * Control SERVER ERROR
server.on('error', (error) => {
    LogError(`[SERVER ERROR]: ${error}`);
});
