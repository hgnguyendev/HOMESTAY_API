import express from 'express';
import bo_userController from './bo_user.controller';

const boUserRouter = express.Router();

boUserRouter.get('/get-user',bo_userController.getUser)



export default boUserRouter;


