const express = require('express')
const seed = require('../models/photoSeed.js')
const Product = require('../models/photos.js')
const photos = express.Router()

photos.get('/', (req, res) => {
  // res.send('Index Page')
  Product.find({}, (error, allProducts) => {
    res.render('products/index.ejs', {
      products: allProducts
    })
  })
})

module.exports = photos
