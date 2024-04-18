import express from 'express';
import { verfiyAdmin, verifyToken } from '../../utils/verifyToken';
import { createBrand, createSegment, createWholeSeller, getAllSegment, getBrandBySegmentId, getWholeSeller } from '../controllers/sellerController';

const router = express.Router();

//staff
router.post('/create-whole-seller', verifyToken, verfiyAdmin, createWholeSeller);
router.get('/get-all-segment', verifyToken, verfiyAdmin, getAllSegment);
router.post('/get-all-brand-by-segmentId', verifyToken, verfiyAdmin, getBrandBySegmentId);
router.post('/create-segment', verifyToken, verfiyAdmin, createSegment);
router.post('/create-brand', verifyToken, verfiyAdmin, createBrand);
router.get('/get-whole-seller', verifyToken, verfiyAdmin, getWholeSeller);

export default router;
