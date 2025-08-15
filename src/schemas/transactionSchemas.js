import joi from "joi";

export const transactionSchemas = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid("deposit", "withdraw").required()
});