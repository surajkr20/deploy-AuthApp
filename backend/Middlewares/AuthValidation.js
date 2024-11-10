const Joi = require('joi');

// Signup (adding users) data validation
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(100).required()
    });

    const { error } = schema.validate(req.body); // corrected destructuring
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message  // provides only the error message
        });
    }
    next();
};

// User login data validation
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(20).required()
    });

    const { error } = schema.validate(req.body); // corrected destructuring
    if (error) {
        return res.status(400).json({
            message: "Bad request",
            error: error.details[0].message  // provides only the error message
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
