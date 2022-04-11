const  { Router } = require('express');
const { UserMiddleware, ValidationMiddleware, AuthMiddleware,
  PackageMiddleware, TransactionMiddleware } = require('../../middleware')
const { PackageController, TransactionController } = require('../../controllers')
const { cardSchema } = require('../../validations/card')
const { packageSchema, updatePackageStatusSchema } = require('../../validations/package')

const { validate } = ValidationMiddleware
const { validateSignUpEmail } = UserMiddleware
const { authenticate, checkRole} = AuthMiddleware
const { createPackage, updatePackageStatus, fetchAllPackages } = PackageController
const { checkIfPackageExists, calculateAmount } = PackageMiddleware
const { initCardCharge, addTransactionref } = TransactionMiddleware
const { validateCharge } = TransactionController


const router = Router();

// router.use(authenticate)

router.post(
  '',
  authenticate,
  checkRole,
  validate(packageSchema),
  createPackage
)
router.get(
  '',
  fetchAllPackages
)
router.post(
  '/:id/create-payment',
  authenticate,
  validate(cardSchema),
  checkIfPackageExists,
  calculateAmount,
  addTransactionref,
  initCardCharge,
  validateCharge
)

router.post(
  '/change-status/:id',
  authenticate,
  checkRole,
  validate(updatePackageStatusSchema),
  checkIfPackageExists,
  updatePackageStatus
)

module.exports = router;
