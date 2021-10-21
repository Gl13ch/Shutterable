const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
  photographer: {type: String, required: true},
  location: String,
  description: String,
  img: String,
  price: {type: Number, min: 0},
  qty: {type: Number, min: 0}
})

const Photo = mongoose.model('Photo', photoSchema)
module.exports = Photo
