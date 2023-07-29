import AppError from "../utils/AppError.js";

class UserController {
    create (req, res) {
        const {name, age} = req.body;

        if(!name)
            throw new AppError("Nome é obrigatório");
        res.status(201);
        res.send("UserController CREATE");
    } 

    read (req, res) {
        res.send("UserController READ");
    }

    findById (req, res) {
        res.send("UserController findID");
    }

    update (req, res) {
        res.send("UserController UPDATE");
    }

    delete (req, res) {
        res.send("UserController DELETE");
    }
}

export default UserController;