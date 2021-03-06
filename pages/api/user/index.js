import axios from "axios"
import jwt from 'jsonwebtoken'


export default async function User (req, res) {

    if (req.method === 'GET') {

        try {
            const { data } = await axios.get('http://186.64.122.100:9095/api/user')
            res.status(200).send({ users: data })

        } catch (error) {
            res.status(404).send({ message: error.message })
        }
    }
    if (req.method === 'POST') {
        const { email, password } = req.body

        try {
            const filterUser = async (email, password) => {
    
                const { data } = await axios.post(`http://186.64.122.100:9095/api/login/`, {
                    usuario: email,
                    clave: password,
                })
                // const user = data.find(u => { return u.usuario === email })
                console.log(data)

                if (data) {
                    // const token = jwt.sign({
                    //     data: 'foobar'
                    // }, 'secret', { expiresIn: 60 * 60 });

                    res.status(200).send({ token: data })
                } else {
                    res.status(401).send({ message: 'password wron' })
                }

            }
            filterUser(email, password)

        } catch (error) {
            res.status(404).send({ message: 'error' })
        }
    }
    if (req.method === 'PUT') {
        res.status(200).send({ message: 'update' })
    }
    if (req.method === 'DELETE') {
        res.status(200).send({ message: 'deleted' })
    }

}