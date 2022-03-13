const Joi = require('joi');

const querySchema = Joi.object({query: Joi.string().required()})

module.exports = querySchema;