import {Router} from 'express';
import UserController from '../controllers/UserController.js';

const userController = new UserController();

const userRouter = Router();

userRouter.get('/:id', userController.findById);

userRouter.get('/', userController.read);

userRouter.post('/', userController.create);

userRouter.put('/', userController.update);

userRouter.delete('/', userController.delete);



export default userRouter;