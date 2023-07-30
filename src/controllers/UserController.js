import db from '../database/mysqlDB.js';
import bcryptjs from 'bcryptjs';
import AppError from '../utils/AppError.js';

class UserController {
    async create(req, res) {
        const { name, email, password } = req.body;

        const hashedPassword = bcryptjs.hashSync(password, 8);

        const query = ` INSERT INTO users(name, email, password) 
                    VALUES ("${name}", "${email}", "${hashedPassword}")`;

        db.query(query, (err, data) => {
            if (err)
                throw new AppError("Ocorreu um erro!", 400);

            return res.status(201).json(data);
        });
    }

    async read(req, res) {
        console.log(req.query);

        const query = ` SELECT * FROM USERS`;

        try {
            db.query(query, (err, data) => {
                if (err)
                    throw new AppError("Ocorreu um erro!", 400);

                return res.status(200).json(data);
            });
        } catch (error) {
            return res.status(405).json({ "error": error });
        }
    }

    async findById(req, res) {
        res.send("UserController findID");
    }

    async update(req, res) {
        const { id } = req.params;
        const query = `SELECT * FROM users WHERE id = ${id}`;
    
        try {
            const data = await new Promise((resolve, reject) => {
                db.query(query, (err, data) => {
                    if (err) {
                        reject(new AppError("Ocorreu um erro!"));
                    } else {
                        resolve(data);
                    }
                });
            });
    
            if (!data[0]) {
                throw new AppError("Usuário não encontrado!");
            }
    
            res.json(data[0]);
        } catch (error) {
            return res.status(400).json({ "error": error.message });
        }
    }
    

    async delete (req, res) {
            res.send("UserController DELETE");
        }
}

export default UserController;