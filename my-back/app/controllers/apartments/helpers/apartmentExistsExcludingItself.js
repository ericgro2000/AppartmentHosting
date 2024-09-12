const Apartment = require('../../../models/apartment')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a apartment already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */
const apartmentExistsExcludingItself = (id = '', name = '') => {
  return new Promise((resolve, reject) => {
    Apartment.findOne(
      {
        name,
        _id: {
          $ne: id
        }
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

module.exports = { apartmentExistsExcludingItself }
