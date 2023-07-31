import {Router} from 'express';
import UserController from '../controllers/UserController.js';

const userController = new UserController();

const userRouter = Router();

userRouter.get('/user/:id', userController.findById);

userRouter.get('/', userController.read);

userRouter.post('/', userController.create);

userRouter.put('/:id', userController.update);

userRouter.delete('/:id', userController.delete);

export default userRouter;