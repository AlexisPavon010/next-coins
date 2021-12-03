import jwt from "jsonwebtoken"
import connectDB from "../../../database"
import CreateUserSchema from "./models/CreateUserModel"
import cors from 'cors'

export default async function Login (req, res) {

    cors()

    await connectDB()

    if (req.method === 'GET') {
        res.status(200).send({ message: 'get' })
    }
    if (req.method === 'POST') {
        const { email, password, username, roles } = req.body
        console.log(req.body)

        try {
            const userFind = await CreateUserSchema.findOne({ email: email })
            console.log(userFind)

            if (!userFind) {
                return res.status(404).send({ error: 'no encontrado' })
            } 

            const compare = await CreateUserSchema.comparePassword(password, userFind.password)
            console.log(compare)

            if (!compare) return res.status(401).send({ error: 'no password' })

            const token = jwt.sign({ id: userFind._id }, 'token', {
                expiresIn: 86400
            })
            res.status(200).send({ token: token })
        } catch (error) {
            console.log(error)
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