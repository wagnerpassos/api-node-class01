const express = require("express");

const app = express();

// ---- GLOBALs
const PORT = '3000';

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
