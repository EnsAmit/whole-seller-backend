import { Staff } from "../models/Staff";
import DateTime from "../../utils/constant/getDate&Time";
import bcrypt from 'bcryptjs';
import { createError } from "../../utils/error";
import { Op } from "sequelize";



export const adminDashboard = async (req, res, next) => {
    try {
        return res.status(200)
            .json({
                error: false,
                message: "Admin Dashboard...!",
                data: {}
            });
    } catch (error) {
        console.log("Admin Dashboard ::>> ", error);
        next(error);
    }
};

export const setStaffPassword = async (req, res, next) => {
    if (!req.body.email || req.body.email === "" || !req.body.password || req.body.password === "") {
        return next(createError(403, "Enter the Valid Fields"));
    }

    const email = req.body.email.trim();
    try {
        const staff = await Staff.findOne({
            where: {
                email: email,
            },
            raw: true
        });
        // console.log("Seller ::>>",seller)
        if (!staff) {
            return next(createError(404, `Email not found Successfully...!`));
        }
        const password = req.body.password;
        const number = generateSalt();
        const salt = bcrypt.genSaltSync(number);
        const hash = bcrypt.hashSync(password, salt);

        await Staff.update({
            password: hash
        }, {
            where: {
                id: staff.id
            }
        });
        return res.status(200)
            .json({
                error: false,
                message: "Password Has been Changed Successfully...!",
            });
    } catch (error) {
        console.log("Change-password Staff Error ::>> ", error);
        next(error);
    }
};
