import { Router } from "express";
import { Staff } from "../../src/models/Staff";
import { Role } from "../../src/models/Role";
import { Permission } from "../../src/models/Permission";
import { SellerInfo } from "../../src/models/Seller";
import { WholeSeller, WholeSellerBrand, WholeSellerImageStore, WholeSellerSegment } from "../../src/models/WholeSeller";
import { Store } from "../../src/models/Store";

const modelRouter = Router();

//seller
// Seller.sync({ alter: true }).then(() => {
//   console.log('Update Seller table successfully!');
// }).catch((error) => {
//   console.error('Unable to Update Seller table : ', error);
// });
//store
WholeSeller.sync({ alter: true }).then(() => {
  console.log('Update Store table successfully!');
}).catch((error) => {
  console.error('Unable to Update Seller table : ', error);
});

//role
// Role.sync({ alter: true }).then(() => {
//   console.log('Update Role table successfully!');
// }).catch((error) => {
//   console.error('Unable to Update Role table : ', error);
// });

//staff
// Staff.sync({ alter: true }).then(() => {
//   console.log('Update Staff table successfully!');
// }).catch((error) => {
//   console.error('Unable to Update Staff table : ', error);
// });

//permission
// Permission.sync({ alter: true }).then(() => {
//   console.log('Update Permission table successfully!');
// }).catch((error) => {
//   console.error('Unable to Update Permission table : ', error);
// });

//sellerinfo
// SellerInfo.sync({ alter: true }).then(() => {
//   console.log('Update Seller-Info table successfully!');
// }).catch((error) => {
//   console.error('Unable to Update Seller-Info table : ', error);
// });

export default modelRouter;