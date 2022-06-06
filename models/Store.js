const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder = require('../utils/geocoder')

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters'],
  },

  phone: {
    type: String,
    required: [true, 'Please add a phone'],
    maxlength: [500, 'Phone can not be more than 500 characters'],
  },
  email: {
    type: String,

    required: [true, 'Please add a email'],
    maxlength: [500, 'Email can not be more than 500 characters'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email',
    ],
  },
  address: {
    type: String,
    required: [true, 'Please add a address'],
    maxlength: [500, 'Address can not be more than 500 characters'],
  },
  location: {
    type: String,

    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
    Street: String,
    City: String,
    State: String,
    ZipCode: String,
    country: String,
  },
})

//creating product slug from the name

StoreSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

//Geocode & create location field
StoreSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    Street: loc[0].streetName,
    City: loc[0].city,
    State: loc[0].state,
    ZipCode: loc[0].zipcode,
    country: loc[0].country,
  }
  // Do not save address in DB
  next()
}) //end of pre save

module.exports = mongoose.model('Store', StoreSchema)
