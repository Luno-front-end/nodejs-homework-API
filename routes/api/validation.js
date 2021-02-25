const Joi = require("joi");

const schemaCreateContacts = Joi.object({
  name: Joi.string().alphanum().min(2).max(10).required(),
  number: Joi.number().integer().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
});

const schemaUpdateContacts = Joi.object({
  name: Joi.string().alphanum().min(2).max(10).optional(),
  number: Joi.number().integer().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
});

const schemaNameContacts = Joi.object({
  name: Joi.string().alphanum().min(2).max(10).required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }

  next();
};
module.exports.createContacts = (req, res, next) => {
  return validate(schemaCreateContacts, req.body, next);
};

module.exports.updateContacts = (req, res, next) => {
  return validate(schemaUpdateContacts, req.body, next);
};

module.exports.nameContacts = (req, res, next) => {
  return validate(schemaNameContacts, req.body, next);
};
