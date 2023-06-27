import mongoose from 'mongoose';

export const kataEntity = () => {

    let kataSchema = new mongoose.Schema(
        {
            name: { type: String, required: true },
            description: { type: String, required: true },
            level: { type: String, required: true },
            intents: { type: Number, required: true },
            stars: { type: Number, required: true },
            creator: { type: String, required: true },
            solution: { type: String, required: true },
            participants: { type: [], required: true },
        }
    );
    
    return mongoose.model("Katas", kataSchema);
}
