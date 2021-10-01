import axios from 'axios';
import connectDB from '../../../database';
import tradeModels from '../../../database/models/TradeModels';
import { db } from '../../../firebase/client';

export default async function (req, res) {
    const { data, user } = req.body;


    try {

        await connectDB()
    } catch (error) {
        console.log(error)
    }


    if (req.method === 'POST') {
        if (data.portafolio === '') {
            console.log('no hay portafolio')
            res.status(200).send({ error: 'no hay portafolio' })
        }
        if (data.date === '') {
            console.log('no hay date')
            res.status(200).send({ error: 'no hay date' })
        }
        if (data.operation === '') {
            console.log('no hay operation')
            res.status(200).send({ error: 'no hay error' })
        }
        if (data.cryptoBuy === '') {
            console.log('no hay cryptoBuy')
            res.status(200).send({ error: 'no hay cryptoBuy' })
        }
        if (data.cryptoSell === '') {
            console.log('no hay cryptoSell')
            res.status(200).send({ error: 'no hay cryptoSell' })
        }
        if (data.import === '') {
            console.log('no hay import')
            res.status(200).send({ error: 'no hay import' })
        }
        if (data.price === '') {
            console.log('no hay price')
            res.status(200).send({ error: 'no hay price' })
        }
        if (data.quantity === '') {
            console.log('no hay quantity')
            res.status(200).send({ error: 'no hay quantity' })
        }

        else {

            try {

                if (data) {
                    const coinGekoApiResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${data?.cryptoBuy.toLowerCase()}`)

                    const { market_data } = coinGekoApiResponse.data;


                    const newtradeModels = new tradeModels(data)
                    newtradeModels.save()

                    // console.log(newtradeModels)


                    console.log(req.body)

                    console.log(data?.cryptoBuy + ' ' + market_data.current_price.usd)

                    db.collection(user).doc("movimientos").collection("order").doc().set({
                        portafolio: data?.portafolio,
                        date: data?.date,
                        operation: data?.operation,
                        cryptoBuy: data?.cryptoBuy,
                        cryptoSell: data?.cryptoSell,
                        currentPrice: market_data.current_price.usd,
                        import: data?.import,
                        price: data?.price,
                        quantity: data?.quantity,
                        auditDate: new Date()
                    })
                }
                res.status(200).send({ operation: data?.operation })

            } catch (error) {
                console.log(error)
                res.status(200).send({ operation: error.message })
            }
        }
    }

    if (req.method === 'GET') {
        try {
            const resDb = await tradeModels.find({})
            res.status(200).send(resDb)

        } catch (error) {
            res.status(200).send({ message: error })
        }
    }
    if (req.method === 'PUT') {
        console.log(req.query.id)
        try {
            await tradeModels.findByIdAndUpdate()
            res.status(200).send({ message: 'deleted' })
        } catch (error) {
            res.status(200).send({ message: error })
        }
    }
    if (req.method === 'DELETE') {
        console.log(req.query.id)
        try {
            await tradeModels.findByIdAndDelete(req.query.id)
            res.status(200).send({ message: 'deleted' })
        } catch (error) {
            res.status(200).send({ message: error })
        }
    }
}