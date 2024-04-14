import DateTime from "../../utils/constant/getDate&Time";
import { createError } from "../../utils/error";
import { Permission } from "../models/Permission";
import { Role } from "../models/Role";

export const addRole = async(req, res, next) => {
    try {
        if (!req.body.roleName || req.body.roleName === "") {
            return next(createError(403, "Enter the valid Role Name"));
        }
        const roleObj = {
            roleName:req.body.roleName,
            status:req.body.status===true ? "Active" :"Inactive",
            createdIstAt: DateTime(),
            updatedIstAt: DateTime(),
            updateByStaff:req.user.data.name
        };
        const newRole = await Role.create(roleObj);
        const permsn = req.body.permissions;
        const perm1Obj = {
            roleId:newRole.id,
            moduleName:"seller",
            access:permsn.seller,
            createdIstAt: DateTime(),
            updatedIstAt: DateTime()
        };
        const perm1 = await Permission.create(perm1Obj);

        res.status(200).json({
            error: false,
            message: "New Role created Successfully...!",
            data: 1,
          });
    } catch (error) { 
        console.log("Add-Role Error ::>>",error);
        next(error);
    }
};

export const getRoleById = async(req, res, next) => {
    try {
        if (!req.body.id || req.body.id === "" ) {   
            return next(createError(403, "Enter the valid id"));
        }
        console.log("role ::>>",role);
        const role = await Role.findOne({
            where:{
                id:req.body.id
            },
            raw:true});
        const permissions = await Permission.findAll({
            where:{
                roleId:role.id
            },
            raw:true
        });
        res.status(200).json({
            error: false,
            message: "Get Role By Id found Successfully...!",
            data: {role,permissions},
          });
    } catch (error) { 
        console.log("Get-Role Error ::>>",error);
        next(error);
    }
};

export const updateRoleById = async(req, res, next) => {
    try {
        if (!req.body.id || req.body.id === "" ) {   
            return next(createError(403, "Enter the valid id"));
        }
        if (!req.body.roleName || req.body.roleName === "") {
            return next(createError(403, "Enter the valid Role Name"));
        }
        const roleObj = {
            roleName:req.body.roleName,
            status:req.body.status===true ? "Active" :"Inactive",
            updatedIstAt: DateTime(),
            updateByStaff:req.user.data.name
        };
        const newRole = await Role.update(roleObj, {
            where:{
                id:req.body.id
            }
        });
        const permsn = req.body.permissions;
        const perm1Obj = {
            moduleName:"seller",
            access:permsn.seller,
            updatedIstAt: DateTime()
        };
        const perm1 = await Permission.update(perm1Obj,{
            where:{
                roleId:req.body.id,
                moduleName:"seller"
            }
        });
        res.status(200).json({
            error: false,
            message: "Update Role Successfully...!",
            data: 1,
          });
    } catch (error) { 
        console.log("Update-Role-By-id Error ::>>",error);
        next(error);
    }
};

export const deleteRoleById = async(req, res, next) => {
    try {
        if ( !req.body.id || req.body.id === "" ) {   
            return next(createError(403, "Enter the valid id"));
        }
        const deleteRole = await Role.destroy({
            where:{
                id:req.body.id
            }
        });
        //due to cascade it wil work -auto-
        // const deletePermission = await Permission.destroy({
        //     where:{
        //         roleId:req.body.id
        //     }
        // });
        res.status(200).json({
            error: false,
            message: "Role & Permission deleted Successfully...!",
            data: deleteRole,
          });
    } catch (error) { 
        console.log("Delete-Role-&-Permission-By-id Error ::>>",error);
        next(error);
    }
};

export const allRoleByP = async(req, res, next) => {
    try {
      let { page, limit, sortBy } = req.body;

      if(!page || page==="" ){
        return next(createError(403,"Please provide page no!"));
      }

      let pageNo = page || 1;
      limit = limit || 10;
      let offset = limit * (pageNo - 1);
      sortBy = !sortBy ? "DESC" : sortBy == "ascending" ? "ASC" : "DESC";

      const totalRoles = await Role.count();
        const roles = await Role.findAll({
            limit,
            offset,
            order:[
                ['id', sortBy]
            ],
            raw:true});
        res.status(200).json({
            error: false,
            message: "All Role found Successfully...!",
            rolesInAPage:roles.length,
            totalRoles,
            data: roles,
          });
    } catch (error) { 
        console.log("ALL-Role-Pagination Error ::>>",error);
        next(error);
    }
};

export const allRole = async(req, res, next) => {
    try {
        const roles = await Role.findAll({
            order:[
                ['id', 'desc']
            ],
            raw:true});
        res.status(200).json({
            error: false,
            message: "All Role found Successfully...!",
            data: roles,
          });
    } catch (error) { 
        console.log("ALL-Role Error ::>>",error);
        next(error);
    }
};
