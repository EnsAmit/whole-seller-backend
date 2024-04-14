import express from 'express';
import { createError } from '../../utils/error.js';
import { adminLogin, adminLogout } from '../controllers/authController.js';
import JWT from 'jsonwebtoken';
import { verfiyAdmin, verifyToken } from '../../utils/verifyToken.js';



const router = express.Router();

router.post('/adminLogin', adminLogin);
router.post('/adminLogout', adminLogout);

export default router;