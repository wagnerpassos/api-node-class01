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
        const { name, email, password, old_password } = req.body;
        const { id } = req.params;

        const query = `SELECT * FROM users WHERE id = ${id}`;
        const queryUpdate = `UPDATE users 
                    SET name = ?, email = ?, password = ?, updated_at = ?
                    WHERE id = ?`;

        try {
            const user = await new Promise((resolve, reject) => {
                db.query(query, (err, data) => {
                    if (err) {
                        reject(new AppError("Ocorreu um erro!"));
                    } else {
                        resolve(data);
                    }
                });
            });

            if (!user) {
                throw new AppError("Usuário não encontrado!");
            }

            if(password && !old_password){
                throw new AppError("Você precisa informar a senha antiga!");
            }

            if(password && old_password){
                const checkOldPassword = await bcryptjs.compare(old_password, user[0].password);

                if(!checkOldPassword){
                    throw new AppError("Senha anterior não confere!");
                }

                user[0].password = bcryptjs.hashSync(password, 8);
            } 

            if(name && name.length > 3 ){
                user[0].name = name;
            }

            if(email && email.length > 3 ){
                user[0].email = email;
            }

            
            const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            
            const values = [user[0].name, user[0].email, user[0].password, formattedDate, id];

            console.log(values);

            return await new Promise((resolve, reject) => {
                db.query(queryUpdate, values, (err, data) => {
                    if (err) {
                        reject(new AppError("Ocorreu um erro no update!"));
                    } else {
                        resolve(res.status(200).json(data));
                    }
                });
            });

        } catch (error) {
            return res.status(404).json({ "error": error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        const values = [id];
        const query = `SELECT * FROM users WHERE id = ${id}`;
        const queryDelete = `DELETE FROM users 
                    WHERE id = ?`;

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

            db.query(queryDelete, values, (err, data) => {
                if (err)
                    throw new AppError("Ocorreu um erro!", 400);

                return res.status(200).json(data);
            });

        } catch (error) {
            return res.status(404).json({ "error": error.message });
        }
    }
}

export default UserController;