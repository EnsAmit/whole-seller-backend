import DateTime from "../../utils/constant/getDate&Time";
import { createError } from "../../utils/error";
import { Role } from "../models/Role";
import { Staff } from "../models/Staff";
import bcrypt from 'bcryptjs';
import generateRandomPassword from "../../utils/constant/generatePassword";
const generateSalt = 10;

export const addStaff = async(req, res, next) => {
    try {
        if ( !req.body.name || req.body.name === "" || !req.body.username || req.body.username === "" || 
            // req.body.roleName === "" || req.body.password === "" || 
            // req.body.contactNo === "" || req.body.contactNo.length!==10 ||
            !req.body.roleId || req.body.roleId === "" || !req.body.status || req.body.status === "") {   
            return next(createError(403, "Enter the valid fields"));
        }
        // console.log("Update by staff ::>>",req.user);
        // req.body.password="12345";

        const getStaff = await Staff.findOne({
            where:{
                username:req.body.username
            },
            raw:true
        });
        if(getStaff){
            return next(createError(403, "Staff already exists"));
        }
        const password = req.body.password;

        const number = 10;
        const salt = bcrypt.genSaltSync(number); 
        const hash = bcrypt.hashSync(password, salt);
        const getRole = await Role.findOne({
            attributes:['roleName'],
            where:{
                id:req.body.roleId,
            },
            raw:true
        });
        console.log("Get role ::>>", getRole);
        const staffObj = {
            name: req.body.name,
            username: req.body.username,
            password: hash,
            contactNo : req.body.contactNo,
            status:req.body.status===true ? "Active" : "Inactive",
            roleId: req.body.roleId,
            roleName:getRole.roleName,
            createdIstAt: DateTime(),
            updatedIstAt: DateTime(),
            updateByStaff:req.user.data.name
        };
        // console.log("StaffObj::>>", staffObj);
        const newStaff = await Staff.create(staffObj);
        //console.log("New Staff ::>>", newStaff);
        // sendStaffRegistrationMail(newStaff.name, newStaff.email, password);
        res.status(200).json({
            error: false,
            message: "New Staff created Successfully...!",
            data: newStaff,
          });
    } catch (error) { 
        console.log("Add-Staff Error ::>>",error);
        next(error);
    }
};

export const updateStaffById = async(req, res, next) => {
    // console.log("id ::>>",req.body.id);
    try {

        if ( !req.body.id || req.body.id === "" || !req.body.name || req.body.name === "" || !req.body.username || req.body.username === "" || 
            // req.body.roleName === "" || 
            // req.body.password === "" || 
            // req.body.contactNo === "" || req.body.contactNo.length!==10 ||
            req.body.roleId === "" ) {   
            return next(createError(403, "Enter the valid fields"));
        }
        const getRole = await Role.findOne({
            attributes:['roleName'],
            where:{
                id:req.body.roleId,
            },
            raw:true
        });
        const staffObj = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            contactNo : req.body.contactNo,
            status:req.body.status===true ? "Active" : "Inactive",
            roleId: req.body.roleId,
            roleName:getRole.roleName,
            updatedIstAt: DateTime(),       
            updateByStaff:req.user.data.name
        };
        // console.log("StaffObj::>>", staffObj);
        const updatedStaff = await Staff.update(staffObj,{
            where : {
                id : req.body.id
            }
        });
        res.status(200).json({
            error: false,
            message: "Staff updated Successfully...!",
            data: updatedStaff,
          });
    } catch (error) { 
        console.log("Update-Staff-By-id Error ::>>",error);
        next(error);
    }
};

export const getStaffById = async(req, res, next) => {
    try {
        if ( !req.body.id || req.body.id === "" ) {   
            return next(createError(403, "Enter the valid id"));
        }
        const getStaff = await Staff.findOne({
            where:{
                id:req.body.id
            },
            raw:true
        });
        console.log(getStaff, "getStaff")
        res.status(200).json({
            error: false,
            message: "Staff found Successfully...!",
            data: getStaff,
          });
    } catch (error) { 
        console.log("Get-Staff-By-id Error ::>>",error);
        next(error);
    }
};

export const deleteStaffById = async(req, res, next) => {
    try {
        if ( !req.body.id || req.body.id === "" ) {   
            return next(createError(403, "Enter the valid id"));
        }
        const deleteStaff = await Staff.destroy({
            where:{
                id:req.body.id
            }
        });
        res.status(200).json({
            error: false,
            message: "Staff deleted Successfully...!",
            data: deleteStaff,
          });
    } catch (error) { 
        console.log("Delete-Staff-By-id Error ::>>",error);
        next(error);
    }
};

export const allStaff = async(req, res, next) => {
    try {
        let { page, limit, sortBy } = req.body;

        if(!page || page==="" ){
            return next(createError(403,"Please provide page no!"));
        }

        let pageNo = page || 1;
        limit = limit || 10;
        let offset = limit * (pageNo - 1);
        sortBy = !sortBy ? "DESC" : sortBy == "ascending" ? "ASC" : "DESC";
        const totalStaffs = await Staff.count();
        const staffs = await Staff.findAll({
            limit,
            offset,
            
            order:[
                ['id', sortBy]
            ],
            raw:true});
        return res.status(200).json({
            error: false,
            message: "All Staff found Successfully...!",
            staffInAPage:staffs.length,
            totalStaffs,
            data: staffs,
          });
    } catch (error) { 
        console.log("All-Staff Error ::>>",error);
        next(error);
    }
};

export const adminResetPassword = async(req, res, next)=>{
    try {
        if(!req.body.username || req.body.username==="" || !req.body.newPassword || req.body.newPassword==="" || !req.body.confirmPassword || req.body.confirmPassword===""){
            return next(createError(403,"Please fill the fields...!"));
        }
        const staff = await Staff.findOne({
            where :{
                username: req.body.username
            }
        });
        if(!staff){
            return next(createError(403,"Invalid Staff...!"));
        }
        if(req.body.newPassword!==req.body.confirmPassword){
            return next(createError(403, "Entered Password doesn't matched. Please try again to change Password"));
        }
        const number = generateSalt();
        const salt = bcrypt.genSaltSync(number);
        const hash = bcrypt.hashSync(req.body.newPassword, salt);
        await Staff.update({
            password: hash,
            updateByStaff : req.user.data.name,
            updatedIstAt : DateTime()
        },{
            where : {
                id:staff.id
            }
        });
        return res.status(200).json({
            error:false,
            message: "Password Changed Successfully...!",
        }) 
    } catch (error) {
        console.log("Staff-Reset-Password ::>>",error);
        next(error);
    }
};
