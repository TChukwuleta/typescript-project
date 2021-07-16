import mongoose, { Schema, Document } from 'mongoose'


export interface IUser extends Document {
    username: string
    email: string
    googleId?: string 
    linkedinId?: string
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true 
    },
    googleId: {
        type: String
    },
    linkedinId: {
        type: String
    }
})

const User = mongoose.model<IUser>('user', userSchema)

export default User 