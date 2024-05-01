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
        type: DataTypes.STRING,
        defaultValue: "Confectionery"
    }, 
    bizomOutletId:{
        type: DataTypes.STRING,
        allowNull: true
    },
    monthlysalesvolume:{
        type: DataTypes.STRING,
        allowNull: true
    },
    monthlysalesvalueinr:{
        type: DataTypes.STRING,
        allowNull: true
    },
    segmentId:{
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'wse_segment', // Name of the referenced model
            key: 'id'      // Name of the referenced column in the referenced model
          }
    },
    brandId:{
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'wse_brand', // Name of the referenced model
            key: 'id'      // Name of the referenced column in the referenced model
          }
    },
    mobile_number:{
        type: DataTypes.STRING,
        allowNull: true
    }, 
    pincode:{
        type: DataTypes.STRING,
        allowNull: true
    },
    // gstNumber:{
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    // panNumber:{
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    emailId:{
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
    // storeLocation:{
    //     type: DataTypes.STRING
    // },
    townAndCity:{
        type:DataTypes.STRING
    },
    latitude:{
        type:DataTypes.STRING
    },
    longitude:{
        type:DataTypes.STRING
    },
    imageStore:{
        type: DataTypes.STRING
    },
    createdBy:{
        type : DataTypes.STRING,
    },
    createdAt:{
        type : DataTypes.STRING,
        defaultValue: DateTime
    },
    updatedAt:{
        type : DataTypes.STRING,
        defaultValue: DateTime
    },
    deletedAt:{
        type : DataTypes.STRING,
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

WholeSeller.hasOne(WholeSellerSegment, { foreignKey: 'id' });
// WholeSellerSegment.belongsTo(WholeSeller, { foreignKey: 'id' });

WholeSeller.hasOne(WholeSellerBrand, { foreignKey: 'id' });
// WholeSellerBrand.belongsTo(WholeSeller, { foreignKey: 'id' });

// Define associations
// WholeSeller.belongsTo(WholeSellerSegment, { foreignKey: 'segmentId' });
// WholeSeller.belongsTo(WholeSellerBrand, { foreignKey: 'brandId' });