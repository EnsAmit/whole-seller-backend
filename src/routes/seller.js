import express from 'express';
import { verfiyAdmin, verifyToken } from '../../utils/verifyToken';
import { convertToJson, createBrand, createSegment, createWholeSeller, getAllSegment, getBrandBySegmentId, getWholeSeller } from '../controllers/sellerController';
import upload from '../helpers/services/file_controller'; // Import upload as default
import multer from 'multer';

// Multer configuration
const storage = multer.memoryStorage();
const upload1 = multer({ storage: storage });

const router = express.Router();

//staff
router.post('/create-whole-seller', verifyToken, verfiyAdmin, upload(), createWholeSeller); // Call upload as a function
router.get('/get-all-segment', verifyToken, verfiyAdmin, getAllSegment);
router.post('/get-all-brand-by-segmentId', verifyToken, verfiyAdmin, getBrandBySegmentId);
router.post('/create-segment', verifyToken, verfiyAdmin, createSegment);
router.post('/create-brand', verifyToken, verfiyAdmin, createBrand);
router.post('/get-whole-seller', verifyToken, verfiyAdmin, getWholeSeller);
router.post('/convert-json', verifyToken, verfiyAdmin, upload1.single('file'), convertToJson);
// router.post('/upload-image', verifyToken, verfiyAdmin, upload('image'), uploadImage);

export default router;
