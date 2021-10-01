import { Schema, model, models } from 'mongoose'


const TradeSchema = new Schema({
    portafolio: { type: String, },
    date: { type: String, },
    operation: { type: String, },
    cryptoBuy: { type: String, },
    cryptoSell: { type: String, },
    currentPrice: { type: String, },
    import: { type: String, },
    price: { type: String, },
    quantity: { type: String, },
})

export default  models.Movimiento || model('Movimiento', TradeSchema)