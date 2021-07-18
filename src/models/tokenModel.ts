import mongoose, { Schema, Document } from 'mongoose'

export interface IToken extends Document {
    userId: string
    token: string
    createdAt: Date
}

const tokenSchema: Schema = new Schema({
    userId: {
        types: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

const Token = mongoose.model<IToken>('token', tokenSchema)

export default Token