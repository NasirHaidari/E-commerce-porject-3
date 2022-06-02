const mongoose = require('mongoose')

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
  Geolocation: {
    type: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      formattedAddress: String,
      Street: String,
      City: String,
      State: String,
      ZipCode: String,
      country: String,
    },
  },
})

module.exports = mongoose.model('Store', StoreSchema)
