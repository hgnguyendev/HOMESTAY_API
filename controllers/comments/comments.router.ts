import express from 'express';
import commentsController from './comments.controller';
import { verifyFirebaseToken } from '../../middlewares/auth.middleware';

const CommentsRouter = express.Router();

CommentsRouter.post('/create-comments',verifyFirebaseToken,commentsController.createComments);
CommentsRouter.get('/get-comment/:room_id',commentsController.getComments)

export default  CommentsRouter;


