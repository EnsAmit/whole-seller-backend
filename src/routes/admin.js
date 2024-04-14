import express from 'express';
import { verfiyAdmin, verifyToken } from '../../utils/verifyToken';
import { adminDashboard, setStaffPassword } from '../controllers/adminController';
import { addRole, allRole, allRoleByP, deleteRoleById, getRoleById, updateRoleById } from '../controllers/roleController';
import { addStaff, adminResetPassword, allStaff, deleteStaffById, getStaffById, updateStaffById } from '../controllers/staffController';



const router = express.Router();

router.get('/dashboard',verifyToken, verfiyAdmin, adminDashboard);
router.post('/setStaffPassworddddd',verifyToken, verfiyAdmin, setStaffPassword);

//role
router.post('/role/addRole', verifyToken, verfiyAdmin, addRole);
router.post('/role/getRoleById', verifyToken, verfiyAdmin, getRoleById);
router.put('/role/updateRoleById', verifyToken, verfiyAdmin, updateRoleById);
router.delete('/role/deleteRoleById', verifyToken, verfiyAdmin, deleteRoleById);
router.post('/role/allRoleByP', verifyToken, verfiyAdmin, allRoleByP);
router.get('/role/allRole', verifyToken, verfiyAdmin, allRole);

//staff
router.post('/staff/addStaff', verifyToken, verfiyAdmin, addStaff);
router.post('/staff/getStaffById', verifyToken, verfiyAdmin, getStaffById);
router.put('/staff/updateStaffById', verifyToken, verfiyAdmin, updateStaffById);
router.delete('/staff/deleteStaffById', verifyToken, verfiyAdmin, deleteStaffById);
router.post('/staff/allStaffByP', verifyToken, verfiyAdmin, allStaff);
router.post('/staff/reset-password', verifyToken, verfiyAdmin, adminResetPassword);

export default router;
