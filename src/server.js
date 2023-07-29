import express from "express";
import userRouter from "./routes/userRoutes.js";

const app = express();

// ---- GLOBALs
const PORT = '3000';

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
