const Apartment = require('../../models/apartment')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { apartmentExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createApartment = async (req, res) => {
  try {
    req = matchedData(req)
    const doesApartmentExists = await apartmentExists(req.name)
    if (!doesApartmentExists) {
      res.status(201).json(await createItem(req, Apartment))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createApartment }
