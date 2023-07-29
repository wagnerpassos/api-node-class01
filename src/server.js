const express = require("express");
const userRouter = require("./routes/routes.js");

const app = express();

// ---- GLOBALs
const PORT = '3000';

app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
