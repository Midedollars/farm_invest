const Joi = require("joi");

const cardSchema = Joi.object({
  card_number: Joi.string().required().creditCard(),
  cvv: Joi.string().required().min(3).max(4),
  expiry_month: Joi.string().required().min(2).max(2),
  expiry_year: Joi.string().required().min(2).max(2),
  currency: Joi.string().required().valid('NGN'),
  fullname: Joi.string().required().min(2).max(50),
  email: Joi.string().required().email(),
  authorization: Joi.object({
    mode: Joi.string().required().valid('pin'),
    pin: Joi.string().required().min(4).max(4)
  }),
  unit: Joi.number().min(1).max(13).required()
});

module.exports = {
  cardSchema
};
