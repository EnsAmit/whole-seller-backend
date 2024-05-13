import express from 'express';
import { verfiyAdmin, verifyToken } from '../../utils/verifyToken';
import { convertToJson, createBrand, createSegment, createWholeSeller, getAllSegment, getAllBrand, getWholeSeller, getStoreDataByMobileNo, uploadImage } from '../controllers/sellerController';
import upload from '../helpers/services/file_controller'; // Import upload as default
import multer from 'multer';

// Multer configuration
const storage = multer.memoryStorage();
const upload1 = multer({ storage: storage });

const router = express.Router();

// router.post('/create-whole-seller', verifyToken, verfiyAdmin, upload(), createWholeSeller);
router.post('/create-whole-seller', verifyToken, verfiyAdmin, createWholeSeller);
router.get('/get-all-segment', verifyToken, verfiyAdmin, getAllSegment);
router.get('/get-all-brand', verifyToken, verfiyAdmin, getAllBrand);
// router.post('/create-segment', createSegment);
// router.post('/create-brand', createBrand);
router.post('/create-segment', verifyToken, verfiyAdmin, createSegment);
router.post('/create-brand', verifyToken, verfiyAdmin, createBrand);
router.post('/get-whole-seller', verifyToken, verfiyAdmin, getWholeSeller);
router.post('/convert-json', verifyToken, verfiyAdmin, upload1.single('file'), convertToJson);
router.post('/get-storedata-by-mobile', verifyToken, verfiyAdmin, getStoreDataByMobileNo);
router.post('/upload-image', verifyToken, verfiyAdmin, upload(), uploadImage);

export default router;