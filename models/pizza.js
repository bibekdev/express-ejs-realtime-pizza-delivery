const mongoose = require('mongoose')

const pizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
)

const Pizza = mongoose.model('Pizza', pizzaSchema)
module.exports = Pizza
