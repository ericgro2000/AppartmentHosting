const { apartmentExists } = require('./apartmentExists')
const { apartmentExistsExcludingItself } = require('./apartmentExistsExcludingItself')
const { getAllItemsFromDB } = require('./getAllItemsFromDB')

module.exports = {
  apartmentExists,
  apartmentExistsExcludingItself,
  getAllItemsFromDB
}
