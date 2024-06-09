import Joi from 'joi';
import logger from '../../config/logger.js';
import { CustomError } from '../utils/common.js';

export const customerRegistrationValidation = (payload) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            phoneNumber: Joi.number()
                .min(10 ** 9)
                .max(10 ** 10 - 1)
                .required(),
            email: Joi.string().email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] }
            }),
            hotelId: Joi.string().required(),
            tableId: Joi.string().required()
        });
        return schema.validate(payload);
    } catch (error) {
        logger('error', `Error in register table validation ${error}`);
        throw CustomError(error.code, error.message);
    }
};

export const orderPlacementValidation = (payload) => {
    try {
        const schema = Joi.object({
            customerId: Joi.string().required(),
            menus: Joi.array().items(
                Joi.object({
                    menuId: Joi.string().required(),
                    menuName: Joi.string().required(),
                    quantity: Joi.number().integer().required(),
                    price: Joi.number().positive().required()
                })
            )
        });
        return schema.validate(payload);
    } catch (error) {
        logger('error', `Error in order placement validation ${error}`);
        throw CustomError(error.code, error.message);
    }
};
