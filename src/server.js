import express, { response } from "express";
import userRouter from "./routes/userRoutes.js";
import "express-async-errors";

import AppError from "./utils/AppError.js";

const app = express();

// ---- GLOBALs
const PORT = '3000';

app.use(express.json());
app.use(userRouter);
app.use((error, req, res, next) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message 
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal server error!" 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
