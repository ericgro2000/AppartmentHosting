const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('../controllers/auth')

const {
  getAllApartments,
  getApartments,
  createApartment,
  getApartment,
  updateApartment,
  deleteApartment
} = require('../controllers/apartments')

const {
  validateCreateApartment,
  validateGetApartment,
  validateUpdateApartment,
  validateDeleteApartment
} = require('../controllers/apartments/validators')

/*
 * Cities routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllApartments)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  getApartments
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateCreateApartment,
  createApartment
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateGetApartment,
  getApartment
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateUpdateApartment,
  updateApartment
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateDeleteApartment,
  deleteApartment
)

module.exports = router
