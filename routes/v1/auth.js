const  { Router } = require('express');
const { UserMiddleware, AuthMiddleware, ValidationMiddleware } = require('../../middleware')
const { UserController, AuthController, AdminController } = require('../../controllers')
const { validateRegister, validateLogin } = require('../../validations/user')

const { validate } = ValidationMiddleware
const { validateSignUpEmail } = UserMiddleware
const { loginEmailValidator, compareUserPassword } = AuthMiddleware
const { createUser } = UserController
const { signIn } = AuthController
const { createAdmin } = AdminController


const router = Router();


router.post(
  '/signup',
  validate(validateRegister),
  validateSignUpEmail,
  createUser
)

router.post(
  '/login',
  validate(validateLogin),
  loginEmailValidator,
  compareUserPassword,
  signIn
)

router.post(
  '/admin/signup',
  validate(validateRegister),
  validateSignUpEmail,
  createAdmin
)

router.post(
  '/admin/login',
  validate(validateLogin),
  loginEmailValidator,
  compareUserPassword,
  signIn
)

module.exports = router;