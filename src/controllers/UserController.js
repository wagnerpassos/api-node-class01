import AppError from "../utils/AppError.js";
import db from '../database/mysqlDB.js';

class UserController {
    create(req, res) {
        const {name, email, password } = req.body;

        const query = ` INSERT INTO users(name, email, password) 
                    VALUES ("${name}", "${email}", "${password}")`;

        db.query(query, (err, data) => {
            if (err)
                return res.json(err);

            return res.status(201).json(data);
        });
    }

    read(req, res) {
        console.log(req.query);

        const query = ` SELECT * FROM USERS`;

        try {
            db.query(query, (err, data) => {
                if (err)
                    return res.json(err);

                return res.status(200).json(data);
            });
        } catch (error) {
            return res.status(405).json({ "error": error });
        }
    }

    findById(req, res) {
        res.send("UserController findID");
    }

    update(req, res) {
        res.send("UserController UPDATE");
    }

    delete(req, res) {
        res.send("UserController DELETE");
    }
}

export default UserController;