import { STATUS_CODE } from '../utils/common.js';
import { registerationValidation, updateValidation } from '../validations/hotel.validation.js';
import hotelService from '../services/hotel.service.js';

const register = async (req, res) => {
    try {
        const { body, user } = req;

        // Validating the registration data
        const validation = registerationValidation(body);
        if (validation.error) {
            return res.status(STATUS_CODE.BAD_REQUEST).send({ message: validation.error.message });
        }

        const result = await hotelService.create(body, user.id);
        return res.status(STATUS_CODE.CREATED).send(result);
    } catch (error) {
        // TODO: Add logger here
        // console.log(`Failed to create hotel ${error}`);
        return res.status(error.code).send({ message: error.message });
    }
};

const update = async (req, res) => {
    try {
        const { body, params } = req;

        const validation = updateValidation(body);
        if (validation.error) {
            return res.status(STATUS_CODE.BAD_REQUEST).send({ message: validation.error.message });
        }

        const { id } = params;
        const result = await hotelService.update(body, id);
        return res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
        // TODO: Add logger here
        // console.log(`Failed to update hotel ${error}`);
        return res.status(error.code).send({ message: error.message });
    }
};

const list = async (req, res) => {
    try {
        const { user } = req;
        const result = await hotelService.list(user.id);
        return res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
        // TODO: Add logger here
        // console.log(`Failed to list hotel ${error}`);
        return res.status(error.code).send({ message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const { params } = req;
        const result = await hotelService.remove(params.id);
        return res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
        // TODO: Add logger here
        // console.log(`Failed to remove hotel ${error}`);
        return res.status(error.code).send({ message: error.message });
    }
};

export default {
    register,
    update,
    list,
    remove
};
