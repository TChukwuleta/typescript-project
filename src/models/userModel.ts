import mongoose, { Schema, Document, Model } from 'mongoose'
const { isEmail } = require('validator')
import bcrypt from 'bcryptjs' 

export interface IUser extends Document {
    username: string
    email: string
    password: string
}

export interface IModelUser extends Model<IUser> {
    login(email: string, password: string): any
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        minlength: [8, 'Minimum password is 8 characters']
    }
})

// Fire a function before user is saved to the database
userSchema.pre<IUser>('save', async function (next) { 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// Static method to login user
userSchema.statics.login = async function(email: string, password: string) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')
}

const User = mongoose.model<IUser, IModelUser>('user', userSchema)

export default User 