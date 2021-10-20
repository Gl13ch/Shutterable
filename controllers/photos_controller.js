const express = require('express')
const seed = require('../models/photoSeed.js')
const Photo = require('../models/photos.js')
const photos = express.Router()

//update Route
photos.put('/:id', (req, res) => {
  Photo.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
        res.redirect('/photos/' + req.params.id);
    });
})

// Delete route
photos.delete('/:id', (req,res) => {
  Photo.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/photos')
  })
})

//New Route
photos.get('/new', (req, res) => {
  res.render(
    'photos/new.ejs'
    )
})

// Create Route
photos.post('/', (req, res)=>{
    Photo.create(req.body, (error, createdPhoto) => {
      res.redirect('/photos')
  })
})

//Index Route
photos.get('/', (req, res) => {
  Photo.find({}, (error, allPhotos) => {
    res.render('photos/index.ejs', {
      photo: allPhotos
    })
  })
})

// seed route
photos.get('/seed', (req,res) => {
  Photo.create(seed,
    (err, data)=>{
          res.redirect('/photos');
      }
  )
})

// Show Route
photos.get('/:id', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhoto) => {
    res.render('photos/show.ejs', {
      photos: foundPhoto
    })
  })
})

// edit route
photos.get('/:id/edit', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhoto) => {
    res.render(
      'photos/edit.ejs',
      {
        photo: foundPhoto,
      }
    )
  })
})

module.exports = photos
