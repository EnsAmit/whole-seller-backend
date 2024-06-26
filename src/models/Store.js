import sequelize from "../../utils/db/dbConnection";
import { DataTypes, Sequelize } from "sequelize";
import DateTime from "../../utils/constant/getDate&Time";

export const Store = sequelize.define("store", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bizomOutletId: {
    type: DataTypes.STRING,
  },
  storeName: {
    type: DataTypes.STRING,
  },
  ownerName: {
    type: DataTypes.STRING,
  },
  storeAddress: {
    type: DataTypes.STRING,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  emailId: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  pincode: {
    type: DataTypes.STRING
  },
  townAndCity: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.STRING,
    defaultValue: DateTime
  },
  deletedAt: {
    type: DataTypes.STRING
  },
});
