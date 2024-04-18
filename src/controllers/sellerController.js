import { Sequelize } from "sequelize";
import DateTime from "../../utils/constant/getDate&Time";
import {
  WholeSeller,
  WholeSellerSegment,
  WholeSellerBrand,
} from "../models/WholeSeller";
import Joi from "joi";
import sequelize from "../../utils/db/dbConnection";

// Define Joi schemas for validation
const wholeSellerSchema = Joi.object({
  storeName: Joi.string().min(1).required(),
  ownerName: Joi.string().min(1).required(),
  storeAddress: Joi.string().min(1).required(),
  businessCategory: Joi.string()
    .valid("Confectionary", "Spices", "Cigarettes/Beedi", "Pan", "Masala")
    .default("Confectionary"),
  bizomOutletId: Joi.string().min(1).required(),
  mobile_number: Joi.string().min(1).required(),
  pincode: Joi.string().min(1).required(),
  emailId: Joi.string().email().required(),
  state: Joi.string().min(1).required(),
  category: Joi.string().allow(null).default("A"),
  storeLocation: Joi.string().allow(null),
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
    const { error, value } = wholeSellerSchema.validate(req.body.formData);

    // If validation fails, send an error response
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const wholeSellerData = value;
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
            details: error.details
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

    if(!segmentId || segmentId.length === 0) 
    {
      next(createError(403,"segment id not found"));
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
      const selectQuery = `
      SELECT * FROM wholesellers AS ws
      INNER JOIN wse_segments AS wseg ON wseg.id = ws.segmentId
      INNER JOIN wse_brands AS wb ON wb.id = ws.brandId`;

      const result = await sequelize.query(selectQuery, {
        replacements: {  }, 
        type: Sequelize.QueryTypes.SELECT
      });
  
      res.status(200).json({
        error: false,
        message: "segment fetch Successfully...!",
        data: result,
      });
    } catch (error) {
      console.log("fetch-segment Error ::>>", error);
      next(error);
    }
  };