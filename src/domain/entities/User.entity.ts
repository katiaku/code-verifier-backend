import mongoose from 'mongoose';

export const userEntity = () => {
    let userSchema = new mongoose.Schema(
        {
            name: String,
            email: String,
            age: Number
        }
    )
    return mongoose.models.User || mongoose.model("Users", userSchema);
}
