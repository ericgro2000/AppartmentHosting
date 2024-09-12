const Apartment = require('../../models/apartment')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { apartmentExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateApartment = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const doesApartmentExists = await apartmentExistsExcludingItself(id, req.name)
    if (!doesApartmentExists) {
      res.status(200).json(await updateItem(id, Apartment, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateApartment }
