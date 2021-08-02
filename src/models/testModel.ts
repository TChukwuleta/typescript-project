import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ISUser extends Document {
    username: string 
    email: string
    googleId?: string 
    linkedinId?: string
    mobile?: string
    bio?: string
    summary?: string
}

const testSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String
    }, 
    googleId: {
        type: String
    }, 
    linkedinId: {
        type: String
    },
    mobile: {
        type: String
    },
    bio: {
        type: String
    },
    summary: {
        type: String
    }
})

const Test = mongoose.model<ISUser>('test', testSchema)

export default Test