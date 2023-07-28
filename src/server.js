const express = require("express");

const app = express();

// ---- GLOBALs
const PORT = '3000';

app.get('/:id', (req, res) => {
    const {id} = req.params;

    res.send(`your id is ${id}`);
});

app.get('/', (req, res) => {
    res.send("HELLO WORLD!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
