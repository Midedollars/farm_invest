const Joi = require("joi");

const packageSchema = Joi.object({
  package_name: Joi.string().max(20).required(),
  farm_name: Joi.string().max(20).required(),
  location: Joi.string().max(20).required(),
  amount_per_unit: Joi.number().min(1).max(13).required(),
})

const updatePackageStatusSchema = Joi.object({
  status: Joi.string().valid('Available','Unavailable').required()

})
module.exports = {
  packageSchema,
  updatePackageStatusSchema
}
