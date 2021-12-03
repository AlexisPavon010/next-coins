import jwt from "jsonwebtoken"
import connectDB from "../../../database"
import CreateUserSchema from "./models/CreateUserModel"
import cors from 'cors'

export default async function (req, res) {

    cors()

    await connectDB()

    if (req.method === 'GET') {
        res.status(200).send({ message: 'get' })
    }
    if (req.method === 'POST') {
        const { email, password, username, roles } = req.body
        console.log(req.body)

        try {
            const newUser = new CreateUserSchema({
                username,
                email,
                password: await CreateUserSchema.encryptPassword(password)
            })
            const saveUser = await newUser.save()
            console.log(saveUser)
            const token = jwt.sign({ id: saveUser._id }, 'token', {
                expiresIn: 86400
            })
            res.status(200).send({ token: token })
        } catch (error) {
            res.status(404).send({ error: error.message })
        }
    }
    if (req.method === 'PUT') {
        res.status(200).send({ message: 'update' })
    }
    if (req.method === 'DELETE') {
        res.status(200).send({ message: 'deleted' })
    }
}