const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: {type: String, default: 'public/images/unavailable-image.jpeg'},
  price: {type: Number, min: 0},
  qty: Number
})

const Photo = mongoose.model('Photo', photoSchema)
module.exports = Photo
