import express from 'express';
import { verifyFirebaseToken } from '../../middlewares/auth.middleware';
import usersController from './users.controller';

const router = express.Router();
router.post('/create-user',usersController.createUser);
router.put('/edit-user',verifyFirebaseToken,usersController.editUser)
router.get('/info',verifyFirebaseToken,usersController.getUserInfo)
router.get('/get-all-user',usersController.getAllUser)
router.delete('/delete-user/:_id',usersController.deleteUser)
export default router;


