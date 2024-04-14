import sequelize from "../../utils/db/dbConnection";
import { DataTypes, Sequelize } from "sequelize";
import DateTime from "../../utils/constant/getDate&Time";

export const Seller = sequelize.define("seller",{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName:{
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique:true
    },
    contactNo:{
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
    },
    roles:{
        type: DataTypes.ENUM,
        values:["wholeseller"],
        defaultValue: "wholeseller"
    }, 
    password: {
      type: DataTypes.TEXT,
    },
    otp:{
        type: DataTypes.STRING,
    },
    otpTimeStampAt:{
        type:DataTypes.DATE
    },
    loginAttempts:{
        type:DataTypes.JSON,
        defaultValue:{count:0,attemptAt:DataTypes.DATE}
    },
    verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    updateByStaff:{
        type : DataTypes.STRING
    },
    createdIstAt:{
        type : DataTypes.STRING, 
    },
    updatedIstAt:{
        type : DataTypes.STRING,
    }
});

export const SellerInfo = sequelize.define("sellerinfo",{
    sellerId:{
        type:DataTypes.INTEGER,
        references:{
            model: Seller,
            key:'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    
    updateByStaff:{
        type : DataTypes.STRING
    },
    createdIstAt:{
        type : DataTypes.STRING, 
        defaultValue: DateTime
    },
    updatedIstAt:{
        type : DataTypes.STRING,
    }
});
