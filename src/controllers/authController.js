import bcrypt from 'bcryptjs';
import JWT from "jsonwebtoken";
import { createError } from '../../utils/error.js';
import generatePassword from '../../utils/constant/generatePassword.js';
import { Staff } from '../models/Staff.js';
import DateTime from '../../utils/constant/getDate&Time.js';
import dotenv from 'dotenv';
import sequelize from '../../utils/db/dbConnection.js';


dotenv.config();
const generateSalt = 10;

export const adminLogin = async (req, res, next) => {
    const username = req.body.username;
    if (!req.body.username || req.body.username === "") {
        next(createError(403, "Enter the Valid Username"));
    }
    else if (!req.body.password || req.body.password === "") {
        next(createError(403, "Enter the Valid Password"));
    }
    // console.log("email::>>",email);
    try {
        const seller = await Staff.findOne({
            where: {
                username: username,
                status: 'Active'
                // roles:'superadmin'
            },
            raw: true
        });
        // console.log("Seller ::>>",seller)
        if (!seller) {
            return next(createError(404, `Invalid Credentials with username : ${username}`));
        }
        //if user exist then check password is matched or not
        console.log((req.body.password).length, (seller.password).length, "dsdf")
        const isPasswordMatched = await bcrypt.compare(req.body.password, seller.password);
        if (!isPasswordMatched) {
            return next(createError(401, `Invalid Credentials Username or Password...!`));
        }
        const { password, role, ...rest } = seller;
        rest.createdAt = (rest.createdAt)?.toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata', // Assuming updatedIstAt is in Indian Standard Time
            hour12: true,
        });
        rest.updatedAt = (rest.updatedAt)?.toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata', // Assuming updatedIstAt is in Indian Standard Time
            hour12: true,
        });
        console.log(rest, "rest")
        //generate jwt token

        //get permission
        const permission = await sequelize.query(`
            Select r.roleName, r.status, p.moduleName, p.access from roles as r inner join permissions as p on r.id=p.roleId where r.id=${seller.roleId}
        `);
        const token = JWT.sign({ id: seller.id, role: seller.roles, data: { ...rest }, permission: permission[0] },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '24hr' });

        return res.cookie('accessToken', token, { httpOnly: true, expires: token.expiresIn })
            .status(200)
            .json({
                error: false,
                message: "Admin Login Successfully...!",
                token,
            });
    } catch (error) {
        console.log("Admin Login ::>> ", error);
        next(error);
    }
};

export const adminLogout = async (req, res, next) => {
    // Clear the accessToken cookie
    try {
        res.clearCookie('accessToken').status(200).json({
            error: false,
            message: "Logout Successful"
        });
    } catch (error) {
        console.log("Admin Logout ::>> ", error);
        next(error);
    }
};


