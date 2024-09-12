const Apartment = require('../../../models/apartment')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a apartment already exists in database
 * @param {string} name - name of item
 */
const apartmentExists = (name = '') => {
  return new Promise((resolve, reject) => {
    Apartment.findOne(
      {
        name
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'APARTMENT_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { apartmentExists }
