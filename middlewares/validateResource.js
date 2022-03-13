const Joi = require('joi');
const querySchema = require("../schemas/query.schema")

const validateQuery = (req, res, next) => {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const {error, value} = querySchema.validate(req.query, options)

    if (error) {
        res.status(400).json(error)
    } else {
        req.query = value;
        next();
    }

}


module.exports = validateQuery;