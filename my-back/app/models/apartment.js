const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ApartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    numberOfRooms: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)
ApartmentSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Apartment', ApartmentSchema)
