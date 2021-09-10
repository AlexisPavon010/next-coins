

export default async function (req, res) {

    if (req.method === 'GET') {
        res.status(200).send({ message: 'get' })
    }
    if (req.method === 'POST') {
        res.status(200).send({ message: 'post' })
    }
    if (req.method === 'PUT') {
        res.status(200).send({ message: 'update' })
    }
    if (req.method === 'DELETE') {
        res.status(200).send({ message: 'deleted' })
    }
    console.log(req.method)

}