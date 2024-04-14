import DateTime from "../../utils/constant/getDate&Time";
import { createError } from "../../utils/error";
import { Permission } from "../models/Permission";
import { WholeSeller, WholeSellerSegment, WholeSellerBrand } from "../models/WholeSeller";
import { Role } from "../models/Role";
import Joi from 'joi';

// Define Joi schemas for validation
const wholeSellerSchema = Joi.object({
    storeName: Joi.string().required(),
    ownerName: Joi.string().required(),
    storeAddress: Joi.string().required(),
    businessCategory: Joi.string().valid("Confectionary", "Spices", "Cigarettes/Beedi", "Pan", "Masala").default("Confectionary"),
    businessVolume: Joi.string().allow(null),
    mobile_number: Joi.string().allow(null),
    pincode: Joi.string().allow(null),
    mouth: Joi.string().allow(null),
    supari: Joi.string().allow(null),
    beverages: Joi.string().allow(null),
    others: Joi.string().allow(null),
    emailId: Joi.string().allow(null),
    state: Joi.string().allow(null),
    category: Joi.string().valid('A', 'B', 'C').default('A'),
    storeLocation: Joi.string().allow(null),
    imageStore: Joi.string().allow(null),
    createdBy: Joi.string(),
    createdAt: Joi.string().default(DateTime),
    updatedAt: Joi.string()
});

export const createWholeSeller = async(req, res, next) => {
    try {

        const wholeSellerData = wholeSellerSchema.validate(req.body);
        console.log(wholeSellerData, "wholeSellerData")

        const newWholeSeller = await WholeSeller.create(wholeSellerData);

        res.status(200).json({
            error: false,
            message: "New whole sell created Successfully...!",
            data: newWholeSeller,
          });
    } catch (error) { 
        console.log("Add-Role Error ::>>",error);
        next(error);
    }
};

export const getAllSegment = async(req, res, next) => {
    try {

        const segmentData = await WholeSellerSegment.findAll({
            attributes: ['id', 'segmentName'],
        });

        res.status(200).json({
            error: false,
            message: "segment fetch Successfully...!",
            data: segmentData,
          });
    } catch (error) { 
        console.log("fetch-segment Error ::>>",error);
        next(error);
    }
};

export const getBrandBySegmentId = async(req, res, next) => {
    try {

        const { id } = req.query;
        const brandData = await WholeSellerBrand.findAll({ where: { segment_id: id } });

        res.status(200).json({
            error: false,
            message: "brand fetch Successfully...!",
            data: brandData,
          });
    } catch (error) { 
        console.log("fetch-brand Error ::>>",error);
        next(error);
    }
};

export const createSegment = async(req, res, next) => {
    try {

        const { segmentName } = req.body;
        console.log(req.body, '-----------------')
        const brandData = await WholeSellerSegment.create({
            segmentName: segmentName
        });

        res.status(200).json({
            error: false,
            message: "segment created Successfully...!",
            data: brandData,
          });
    } catch (error) { 
        console.log("segment-create Error ::>>",error);
        next(error);
    }
};

export const createBrand = async(req, res, next) => {
    try {

        const { brandName, segment_id } = req.body;
        console.log(req.body, '-----------------')
        const brandData = await WholeSellerBrand.create({
            brandName: brandName,
            segment_id: segment_id
        });

        res.status(200).json({
            error: false,
            message: "brand created Successfully...!",
            data: brandData,
          });
    } catch (error) { 
        console.log("segment-create Error ::>>",error);
        next(error);
    }
};
