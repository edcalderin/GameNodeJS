const Joi = require('@hapi/joi')
function validateJOI(data) {
    const scheme = Joi.object().keys({
        id: Joi.number().integer().required(),
        x: Joi.number().integer().min(0).max(2),
        y: Joi.number().integer().min(0).max(2)
    })
    return scheme.validate(data)
}
module.exports = validateJOI