import express from 'express';
import cors from 'cors';
import bp from 'body-parser';
import dotenv from "dotenv";
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/auth.js'
import adminRouter from './src/routes/admin.js';
import sellerRouter from './src/routes/seller.js';
// import modelRouter from './utils/db/modelSync.js';//alter tables


const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// for checking
app.get('/', (req, res)=>{
    return res.status(200).send(`Server is running`);
});

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/seller', sellerRouter);

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong on Server::";
    return res.status(errorStatus).json({
      error: true,
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: error.stack
    })
  });

app.listen(PORT, ()=>{
    console.log(`Server is runnning at Port : ${PORT}`);
})