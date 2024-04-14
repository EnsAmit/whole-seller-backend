import express from 'express';
import { verfiyAdmin, verifyToken } from '../../utils/verifyToken';
import { createBrand, createSegment, createWholeSeller, getAllSegment, getBrandBySegmentId } from '../controllers/sellerController';



const router = express.Router();

//staff
router.post('/create-whole-seller', verifyToken, verfiyAdmin, createWholeSeller);
router.get('/get-all-segment', verifyToken, verfiyAdmin, getAllSegment);
router.get('/get-all-brand-by-segmentId', verifyToken, verfiyAdmin, getBrandBySegmentId);
router.post('/create-segment', verifyToken, verfiyAdmin, createSegment);
router.post('/create-brand', verifyToken, verfiyAdmin, createBrand);

export default router;
