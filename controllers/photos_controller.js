//Dependencies
const express = require('express')
const seed = require('../models/photoSeed.js')
const Photo = require('../models/photos.js')
const photos = express.Router()

// Blocks users from pages when not logged in
const isAuthenticated = (req, res, next) => {
  if(req.session.currentUser){
    return next()
  } else {
    res.redirect('/photos/makeaccount')
  }
}

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
photos.get('/new', isAuthenticated, (req, res) => {
  res.render(
    'photos/new.ejs',
    {currentUser: req.session.currentUser}
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
      photo: allPhotos,
      currentUser: req.session.currentUser
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

//In between isAuthenticated and log in/sign up Route
photos.get('/makeaccount', (req, res) => {
  res.render(
    'photos/make-account.ejs',
    {currentUser: req.session.currentUser}
  )
})

//search route
photos.get('/search', (req, res) => {
  //It took me a minute to figure this out. Lots of googling. Req.query contains the url parameters after the ? in the search. Therefore I can use this so something can actually be searched instead of having to hardcode a value.
  //$or allows me to search multiple fields
  //https://morioh.com/p/e12f7f8b356e
  Photo.find({$or:[{photographer: req.query.search}, {location: req.query.search}, {tags: req.query.search}]}, (error, photo) => {
    if(error){
      console.log('error');
    }
    res.render('photos/search.ejs', {
      photo: photo,
      currentUser: req.session.currentUser
    })
  })
})

// Show Route
photos.get('/:id', (req, res) => {
  Photo.findById(req.params.id, (err, foundPhoto) => {
    res.render('photos/show.ejs', {
    photos: foundPhoto,
    currentUser: req.session.currentUser
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
        currentUser: req.session.currentUser
      }
    )
  })
})

module.exports = photos
