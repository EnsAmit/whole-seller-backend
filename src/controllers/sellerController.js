import { Sequelize } from "sequelize";
import { createError } from '../../utils/error.js';
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

// // Define Joi schemas for validation
// const wholeSellerSchema = Joi.object({
//   storeName: Joi.string().min(1).required(),
//   ownerName: Joi.string().min(1).required(),
//   storeAddress: Joi.string().min(1).required(),
//   businessCategory: Joi.string(),
//   bizomOutletId: Joi.string().min(1).required(),
//   mobile_number: Joi.string().min(1).required(),
//   pincode: Joi.string().min(1).required(),
//   // gstNumber: Joi.string().min(1).required(),
//   // panNumber: Joi.string().min(1).required(),
//   emailId: Joi.string().email().required(),
//   state: Joi.string().min(1).required(),
//   category: Joi.string().allow(null).default("A"),
//   // storeLocation: Joi.string().allow(null),
//   latitude: Joi.string().allow(null),
//   longitude: Joi.string().allow(null),
//   monthlysalesvolume: Joi.string().min(1).required(),
//   monthlysalesvalueinr: Joi.string().min(1).required(),
//   segmentId: Joi.string().min(1).required(),
//   brandId: Joi.string().min(1).required(),
//   imageStore: Joi.array().items(Joi.string()),
//   createdBy: Joi.string().min(1).required(),
//   createdAt: Joi.string().default(DateTime),
//   updatedAt: Joi.string(),
// });

export const createWholeSeller = async (req, res, next) => {
  try {
    // if(!req.body.storeName || req.body.storeName===""){
    //   next(createError(403,"Enter the Valid storeName"));
    // }
    // else if(!req.body.ownerName || req.body.ownerName===""){
    //   next(createError(403,"Enter the Valid ownerName"));
    // }
    // else if(!req.body.storeAddress || req.body.storeAddress===""){
    //   next(createError(403,"Enter the Valid storeAddress"));
    // }
    // else if(!req.body.businessCategory || req.body.businessCategory===""){
    //   next(createError(403,"Enter the Valid businessCategory"));
    // }
    // else if(!req.body.bizomOutletId || req.body.bizomOutletId===""){
    //   next(createError(403,"Enter the Valid bizomOutletId"));
    // }
    // else if(!req.body.mobile_number || req.body.mobile_number===""){
    //   next(createError(403,"Enter the Valid mobile_number"));
    // }
    // else if(!req.body.pincode || req.body.pincode===""){
    //   next(createError(403,"Enter the Valid pincode"));
    // }
    // else if(!req.body.emailId || req.body.emailId===""){
    //   next(createError(403,"Enter the Valid emailId"));
    // }
    // else if(!req.body.state || req.body.state===""){
    //   next(createError(403,"Enter the Valid state"));
    // }
    // else if(!req.body.category || req.body.category===""){
    //   next(createError(403,"Enter the Valid category"));
    // }
    // else if(!req.body.latitude || req.body.latitude===""){
    //   next(createError(403,"Enter the Valid latitude"));
    // }
    // else if(!req.body.longitude || req.body.longitude===""){
    //   next(createError(403,"Enter the Valid longitude"));
    // }
    // else if(!req.body.monthlysalesvolume || req.body.monthlysalesvolume===""){
    //   next(createError(403,"Enter the Valid monthlysalesvolume"));
    // }
    // else if(!req.body.monthlysalesvalueinr || req.body.monthlysalesvalueinr===""){
    //   next(createError(403,"Enter the Valid monthlysalesvalueinr"));
    // }
    // else if(!req.body.segmentId || req.body.segmentId===""){
    //   next(createError(403,"Enter the Valid segmentId"));
    // }
    // else if(!req.body.brandId || req.body.brandId===""){
    //   next(createError(403,"Enter the Valid brandId"));
    // }
    // else if(!req.body.createdBy || req.body.createdBy===""){
    //   next(createError(403,"Enter the Valid createdBy"));
    // }
    // const filenames = req.files?.map(file => file.filename);
    // console.log(filenames, "filenames");
    // let { error, value } = wholeSellerSchema.validate(req.body.formData);
    // console.log(req?.body?.brandId, "req?.body?.brandId")

    // // If validation fails, send an error response
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message })
    // }
    // let wholeSellerData = value;
    // wholeSellerData.imageStore = filenames;
    // console.log(wholeSellerData, "wholeSellerData");

    let wholeSellerData = req?.body;
    console.log(wholeSellerData, "wholeSellerData")
    // const segment = await WholeSellerBrand.findOne({ 
    //   where: { id: req?.body?.brandId } 
    // });

  //   const selectQuery = `
  //   SELECT *
  //   FROM wse_brands where id=:id;
  // `;

  // Fetch data with pagination
  // const segment = await sequelize.query(selectQuery, {
  //   replacements: { id: req?.body?.brandId },
  //   type: Sequelize.QueryTypes.SELECT,
  // });

  //   console.log(segment, "segment")

    const newWholeSeller = await WholeSeller.create({
      storeName: wholeSellerData.storeName,
      ownerName: wholeSellerData.ownerName,
      storeAddress: wholeSellerData.storeAddress,
      bussinessCategory: wholeSellerData.businessCategory,
      bizomOutletId: wholeSellerData.bizomOutletId,
      mobile_number: wholeSellerData.mobile_number,
      pincode: wholeSellerData.pincode,
      emailId: wholeSellerData.emailId,
      state : wholeSellerData.state,
      category: wholeSellerData.category,
      latitude: wholeSellerData.latitude,
      longitude: wholeSellerData.longitude,
      // monthlysalesvolume: wholeSellerData.monthlysalesvolume,
      // monthlysalesvalueinr: wholeSellerData.monthlysalesvalueinr,
      townAndCity: wholeSellerData.townAndCity,
      // segmentId: wholeSellerData.brandId,
      // brandId: wholeSellerData.brandId,
      businessVolume: wholeSellerData.businessVolume,
      imageStore: wholeSellerData.imageStore,
      createdBy: wholeSellerData.createdBy,
      payment: wholeSellerData.payment,
      credits: wholeSellerData.credits,
    });

    res.status(200).json({
      error: false,
      message: "New whole sell created Successfully...!",
      data: newWholeSeller,
    });
  } catch (error) {
    console.log(error, "error")
      res.status(400).json({
        error: true,
        message: "Internal Server error",
        details: error,
      });
  }
};

export const getAllBizomId = async (req, res, next) => {
  try {
    const segmentData = await Store.findAll({
      attributes: ["bizomOutletId"],
    });

    res.status(200).json({
      error: false,
      message: "All Bizom Id fetch Successfully...!",
      data: segmentData,
    });
  } catch (error) {
    console.log("bizom-id Error ::>>", error);
    next(error);
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

export const getAllBrand = async (req, res, next) => {
  try {

    const brandData = await WholeSellerBrand.findAll({
      attributes: [["id", "brandId"], "brandName"],
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
    const filenames = req.files?.map(file => file.filename);
    console.log(filenames, "filenames");

    // Send the filename in the response
    res.status(200).json({
      error: false,
      filename: filenames,
      message: `Images uploaded successfully`,
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

export const getStoreDataByMobileNo = async (req, res, next) => {
  try {

    console.log(req.query.bizomOutletId, "req.query.bizomOutletId")
    // const data = Store.findOne({ 
    //   where: { MobileNo: `req.body.MobileNo` } 
    // });

    const selectQuery = `
    SELECT *
    FROM stores where bizomOutletId=:bizomOutletId;
  `;

  // Fetch data with pagination
  const result = await sequelize.query(selectQuery, {
    replacements: { bizomOutletId: req.query.bizomOutletId },
    type: Sequelize.QueryTypes.SELECT,
  });

    res.status(200).json({
      error: false,
      data: result,
      message: `Data fetch successfully`,
    });
  } catch (error) {
    console.log("Data fetch ::>>", error);
    next(error);
  }
};
