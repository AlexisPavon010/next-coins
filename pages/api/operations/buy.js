import axios from 'axios';
import connectDB from '../../../database';
import TradeModels from '../../../database/models/TradeModels';
import { db } from '../../../firebase/client';
const Joi = require('joi');

export default async function (req, res) {
    const { data, user } = req.body;


    const schema = Joi.object({
        portafolio: Joi.string()
            .required(),
        date: Joi.string()
            .required(),
        operation: Joi.string()
            .required(),
        cryptoSell: Joi.string()
            .required(),
        cryptoBuy: Joi.string()
            .required(),
        import: Joi.string()
            .required(),
        cryptoBuyValue: Joi.number()
            .required(),
        cryptoSellValue: Joi.number()
            .required(),
        price: Joi.number()
            .required(),
    })


    if (req.method === 'POST') {

        try {
            await schema.validateAsync(data)



            const coinGekoApiResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${data?.cryptoBuy.toLowerCase()}`)

            const { market_data } = coinGekoApiResponse.data;

            await connectDB()
            const newtradeModels = new TradeModels(data)
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
                cryptoBuyValue: data?.cryptoBuyValue,
                cryptoSellValue: data?.cryptoSellValue,
                currentPrice: market_data.current_price.usd,
                import: data?.import,
                price: data?.price,
                cryptoSellValue: data?.cryptoSellValue,
                auditDate: new Date()
            })

            res.status(200).send({ operation: data?.operation })

        } catch (error) {
            console.log(error)
            res.status(200).send({ error: error.message })
        }

    }

    if (req.method === 'GET') {
        try {
            await connectDB()
            const resDb = await TradeModels.find({})
            res.status(200).send(resDb)

        } catch (error) {
            res.status(200).send({ message: error })
        }
    }
    if (req.method === 'PUT') {
        console.log(req.query.id)
        try {
            await TradeModels.findByIdAndUpdate()
            res.status(200).send({ message: 'deleted' })
        } catch (error) {
            res.status(200).send({ message: error })
        }
    }
    if (req.method === 'DELETE') {
        console.log(req.query.id)
        try {
            await TradeModels.findByIdAndDelete(req.query.id)
            res.status(200).send({ message: 'deleted' })
        } catch (error) {
            res.status(200).send({ message: error })
        }
    }
}