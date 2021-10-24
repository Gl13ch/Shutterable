const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
  photographer: {type: String, required: true},
  location: String,
  description: String,
  img: {type: String, required: true},
  price: {type: Number, min: 0},
  tags: [String]
})

const Photo = mongoose.model('Photo', photoSchema)
module.exports = Photo
