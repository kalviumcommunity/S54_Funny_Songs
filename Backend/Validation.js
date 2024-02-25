const Joi = require('joi');

// Validation schema for user signup
const userSignupSchema = Joi.object({
    FirstName: Joi.string().required().messages({
        'string.empty': 'First Name is required',
        'any.required': 'First Name is required'
    }),
    LastName: Joi.string().required().messages({
        'string.empty': 'Last Name is required',
        'any.required': 'Last Name is required'
    }),
    EmailAddress: Joi.string().email().required().messages({
        'string.empty': 'Email Address is required',
        'string.email': 'Email Address must be a valid email',
        'any.required': 'Email Address is required'
    }),
    Password: Joi.string().required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    }),
    receiveNotifications: Joi.boolean().required().messages({
        'any.required': 'Receive Notifications must be specified',
        'boolean.base': 'Receive Notifications must be a boolean value'
    })
});


// Validation schema for adding a song
const songSchema = Joi.object({
    SongName: Joi.string().required().messages({
        'string.empty': 'Song Name is required',
        'any.required': 'Song Name is required'
    }),
    SongLink: Joi.string().uri().required().messages({
        'string.empty': 'Song Link is required',
        'string.uri': 'Song Link must be a valid URI',
        'any.required': 'Song Link is required'
    }),
    Artist: Joi.string().required().messages({
        'string.empty': 'Artist Name is required',
        'any.required': 'Artist Name is required'
    }),
    Release: Joi.number().integer().min(1000).max(9999).required().messages({
        'number.base': 'Release Year must be a number',
        'number.integer': 'Release Year must be an integer',
        'number.min': 'Release Year must be at least 1000',
        'number.max': 'Release Year must be at most 9999',
        'any.required': 'Release Year is required'
    }),
    Category: Joi.string().required().messages({
        'string.empty': 'Category is required',
        'any.required': 'Category is required'
    })
});

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            // If validation fails, return a 400 Bad Request response with the validation error
            return res.status(400).json({ error: error.details[0].message });
        }
        // If validation passes, proceed to the next middleware
        next();
    };
};

module.exports = {
    userSignupSchema,
    songSchema,
    validate
};
