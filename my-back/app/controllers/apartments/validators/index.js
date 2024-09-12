const { validateCreateApartment } = require('./validateCreateApartment')
const { validateDeleteApartment } = require('./validateDeleteApartment')
const { validateGetApartment } = require('./validateGetApartment')
const { validateUpdateApartment } = require('./validateUpdateApartment')

module.exports = {
  validateCreateApartment,
  validateDeleteApartment,
  validateGetApartment,
  validateUpdateApartment
}
