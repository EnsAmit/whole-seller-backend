import sequelize from "../../utils/db/dbConnection";
import { DataTypes, Sequelize } from "sequelize";
import DateTime from "../../utils/constant/getDate&Time";
import { v4 as uuidv4 } from 'uuid';

// ----------------------------------Schema for WholeSeller---------------------------------
export const WholeSeller = sequelize.define("wholeseller",{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Generate UUID automatically
    },
    storeName: {
        type: DataTypes.STRING,
    },
    ownerName:{
        type: DataTypes.STRING,
    },
    storeAddress: {
        type: DataTypes.STRING,
    },
    bussinessCategory:{
        type: DataTypes.ENUM,
        values:["Confectionary", "Spices", "Cigarettes/Beedi", "Pan", "Masala", "Mouth", "Supari", "Beverages", "Others"],
        defaultValue: "Confectionary"
    }, 
    BusinessVolume:{
        type: DataTypes.STRING,
        allowNull: true
    },
    segmentId:{
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'wse_segment',
            key: 'id'
        }
    },
    brandId:{
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'wse_brand',
            key: 'id'
        }
    },
    imageId:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        references: {
            model: 'wse_brand',
            key: 'id'
        }
    },
    monthlySalesValue:{
        type: DataTypes.STRING,
        allowNull: true
    },
    mobile_number:{
        type: DataTypes.STRING,
        allowNull: true
    }, 
    pincode:{
        type: DataTypes.STRING,
        allowNull: true
    },
    EmailId:{
        type: DataTypes.STRING
    }, 
    state:{
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.ENUM,
        values: ['A', 'B', 'C'],
        defaultValue: 'A'
    }, 
    storeLocation:{
        type: DataTypes.STRING
    },
    imageStore:{
        type: DataTypes.STRING
    },
    createdBy:{
        type : DataTypes.STRING, 
    },
    createdAt:{
        type : DataTypes.DATE,
        defaultValue: DateTime
    },
    updatedAt:{
        type : DataTypes.DATE,
    },
    deletedAt:{
        type : DataTypes.DATE,
    }
});

// -----------------------Schema for Segment---------------------------------------------------------
export const WholeSellerSegment = sequelize.define("wse_segment", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Generate UUID automatically
    },
    segmentName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt:{
        type : DataTypes.DATE,
        allowNull: true
    },
    updatedAt:{
        type : DataTypes.DATE,
        allowNull: true
    },
    deletedAt:{
        type : DataTypes.DATE,
        allowNull: true
    }
}, {
        hooks: {
            beforeValidate: (wholeSeller, options) => {
                // Set createdAt and updatedAt to current timestamp
                if (wholeSeller.isNewRecord) {
                    wholeSeller.createdAt = new Date();
                }
                wholeSeller.updatedAt = new Date();
            }
        }
});

// ################################### - Schema for Brand - ######################################
export const WholeSellerBrand = sequelize.define("wse_brand",{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Generate UUID automatically
    },
    brandName:{
        type: DataTypes.STRING,
    },
    segment_id: {
        type: DataTypes.UUID
    },
    createdAt:{
        type : DataTypes.DATE
    },
    updatedAt:{
        type : DataTypes.DATE,
    },
    deletedAt:{
        type : DataTypes.DATE,
    }, 
}, {
        hooks: {
            beforeValidate: (wholeSeller, options) => {
                // Set createdAt and updatedAt to current timestamp
                if (wholeSeller.isNewRecord) {
                    wholeSeller.createdAt = new Date();
                }
                wholeSeller.updatedAt = new Date();
            }
        }
});

// schema for image store
export const WholeSellerImageStore = sequelize.define("wse_image_store",{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Generate UUID automatically
    },
    ImageName:{
        type: DataTypes.STRING,
        defaultValue: "Confectionary"
    },
    createdAt:{
        type : DataTypes.DATE,
        defaultValue: DateTime
    },
    updatedAt:{
        type : DataTypes.DATE,
    },
    deletedAt:{
        type : DataTypes.DATE,
    }
});