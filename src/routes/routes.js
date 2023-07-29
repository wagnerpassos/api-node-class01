const {Router} = require("express");
const userRouter = Router();

userRouter.get('/:id', (req, res) => {
    const {id} = req.params;

    res.send(`Your id is ${id}`);
});

userRouter.get('/', (req, res) => {
    res.send("HELLO GET!");
});

userRouter.post('/user', (req, res) => {
    const {name, age} = req.body;

    res.json({"message": `${name} de ${age} anos`});
});

module.exports = userRouter;