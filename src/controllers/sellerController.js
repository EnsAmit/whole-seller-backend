import { Sequelize } from "sequelize";
import DateTime from "../../utils/constant/getDate&Time";
import {
  WholeSeller,
  WholeSellerSegment,
  WholeSellerBrand,
} from "../models/WholeSeller";
import Joi from "joi";
import sequelize from "../../utils/db/dbConnection";
import xlsx from 'xlsx';
import { Store } from "../models/Store";

// Define Joi schemas for validation
const wholeSellerSchema = Joi.object({
  storeName: Joi.string().min(1).required(),
  ownerName: Joi.string().min(1).required(),
  storeAddress: Joi.string().min(1).required(),
  businessCategory: Joi.string(),
  bizomOutletId: Joi.string().min(1).required(),
  mobile_number: Joi.string().min(1).required(),
  pincode: Joi.string().min(1).required(),
  gstNumber: Joi.string().min(1).required(),
  panNumber: Joi.string().min(1).required(),
  emailId: Joi.string().email().required(),
  state: Joi.string().min(1).required(),
  category: Joi.string().allow(null).default("A"),
  storeLocation: Joi.string().allow(null),
  latitude: Joi.string().allow(null),
  longitude: Joi.string().allow(null),
  monthlysalesvolume: Joi.string().min(1).required(),
  monthlysalesvalueinr: Joi.string().min(1).required(),
  segmentId: Joi.string().min(1).required(),
  brandId: Joi.string().min(1).required(),
  imageStore: Joi.string().min(1).required(),
  createdBy: Joi.string().min(1).required(),
  createdAt: Joi.string().default(DateTime),
  updatedAt: Joi.string(),
});

export const createWholeSeller = async (req, res, next) => {
  try {
    const filename = req.file.filename;
    const { error, value } = wholeSellerSchema.validate(req.body.formData);

    // If validation fails, send an error response
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const wholeSellerData = value;
    wholeSellerData.imageStore = filename;
    console.log(wholeSellerData, "wholeSellerData");

    const newWholeSeller = await WholeSeller.create(wholeSellerData);

    res.status(200).json({
      error: false,
      message: "New whole sell created Successfully...!",
      data: newWholeSeller,
    });
  } catch (error) {
    // Check if the error contains validation errors
    if (error && error.details) {
      // Handle validation errors
      console.log("Validation Error:", error.details);
      res.status(400).json({
        error: true,
        message: "Validation error occurred",
        details: error.details,
      });
    } else {
      // Handle other errors
      console.log("Add-whole-seller Error:", error);
      next(error);
    }
  }
};

export const getAllSegment = async (req, res, next) => {
  try {
    const segmentData = await WholeSellerSegment.findAll({
      attributes: [["id", "segmentId"], "segmentName"],
    });

    res.status(200).json({
      error: false,
      message: "segment fetch Successfully...!",
      data: segmentData,
    });
  } catch (error) {
    console.log("fetch-segment Error ::>>", error);
    next(error);
  }
};

export const getBrandBySegmentId = async (req, res, next) => {
  try {
    const { segmentId } = req.body;

    if (!segmentId || segmentId.length === 0) {
      next(createError(403, "segment id not found"));
    }
    const brandData = await WholeSellerBrand.findAll({
      attributes: [["id", "brandId"], "brandName"],
      where: { segment_id: segmentId },
    });

    res.status(200).json({
      error: false,
      message: "brand fetch Successfully...!",
      data: brandData,
    });
  } catch (error) {
    console.log("fetch-brand Error ::>>", error);
    next(error);
  }
};

export const createSegment = async (req, res, next) => {
  try {
    const { segmentName } = req.body;
    console.log(req.body, "-----------------");
    const brandData = await WholeSellerSegment.create({
      segmentName: segmentName,
    });

    res.status(200).json({
      error: false,
      message: "segment created Successfully...!",
      data: brandData,
    });
  } catch (error) {
    console.log("segment-create Error ::>>", error);
    next(error);
  }
};

export const createBrand = async (req, res, next) => {
  try {
    const { brandName, segment_id } = req.body;
    console.log(req.body, "-----------------");
    const brandData = await WholeSellerBrand.create({
      brandName: brandName,
      segment_id: segment_id,
    });

    res.status(200).json({
      error: false,
      message: "brand created Successfully...!",
      data: brandData,
    });
  } catch (error) {
    console.log("brand-create Error ::>>", error);
    next(error);
  }
};

export const getWholeSeller = async (req, res, next) => {
  try {
    const { page, limit } = req.body;
    const offset = (page - 1) * limit;

    // Select query for fetching data with pagination
    const selectQuery = `
      SELECT ws.*, wseg.*, wb.*
      FROM wholesellers AS ws
      INNER JOIN wse_segments AS wseg ON wseg.id = ws.segmentId
      INNER JOIN wse_brands AS wb ON wb.id = ws.brandId
      LIMIT :limit OFFSET :offset;
    `;

    // Query for fetching total count of records
    const countQuery = `
      SELECT COUNT(*) AS total FROM wholesellers;
    `;

    // Fetch data with pagination
    const result = await sequelize.query(selectQuery, {
      replacements: { limit, offset },
      type: Sequelize.QueryTypes.SELECT,
    });

    let total;
    if (page === 1) {
      // Fetch total count of records if page is 1
      const totalCount = await sequelize.query(countQuery, {
        type: Sequelize.QueryTypes.SELECT,
      });
      total = totalCount[0].total;
    }

    res.status(200).json({
      error: false,
      message: "Segment fetched successfully",
      data: result,
      total: total || null,
    });
  } catch (error) {
    console.log("fetch-segment Error:", error);
    next(error);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    const filename = req.file.filename;

    // Send the filename in the response
    res.status(200).json({
      error: false,
      filename: filename,
      message: `Image ${filename} uploaded successfully`,
    });
  } catch (error) {
    console.log("upload image Error ::>>", error);
    next(error);
  }
};

export const convertToJson = async (req, res, next) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(data, workbook.SheetNames, "excel data=======================================>");

    data.map( async(item, index) => {
      delete item.Sno;
      await Store.create(item);
    })
    
    res.status(200).json({
      error: false,
      data: data,
      message: `Convert successfully`,
    });
  } catch (error) {
    console.log("Conversion Error ::>>", error);
    next(error);
  }
};

export const getStoreDataByOutletId = async (req, res, next) => {
  try {
    const data = Store.findOne({ bizomOutletId: bizomOutletId});

    res.status(200).json({
      error: false,
      data: data,
      message: `Data fetch successfully`,
    });
  } catch (error) {
    console.log("Data fetch ::>>", error);
    next(error);
  }
};
