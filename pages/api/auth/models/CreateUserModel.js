import { Schema, model, models } from 'mongoose'
import bcrypt from 'bcryptjs'

const CreateUserSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    roles: [
        {
            ref: 'Role',
            type: Schema.Types.ObjectId
        }
    ],
},
    {
        timestamps: true,
        versionKey: false
    }
);

CreateUserSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

CreateUserSchema.statics.comparePassword = async (password, recivedPassword) => {
    return await bcrypt.compare(password, recivedPassword)
}


export default  models.Users || model('Users', CreateUserSchema)
