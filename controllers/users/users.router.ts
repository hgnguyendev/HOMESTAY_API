import express from 'express';
import { verifyFirebaseToken } from '../../middlewares/auth.middleware';
import usersController from './users.controller';

const router = express.Router();
router.post('/create-user',usersController.createUser);
router.put('/edit-user',verifyFirebaseToken,usersController.editUser)
router.get('/info',verifyFirebaseToken,usersController.getUserInfo)

export default router;


