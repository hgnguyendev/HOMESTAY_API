import express from 'express';
import bo_homestayController from './bo_homestay.controller';

const boHomestayRouter = express.Router();

boHomestayRouter.post('/create-homestay',bo_homestayController.createHomeStay)
boHomestayRouter.get('/get-homestay',bo_homestayController.getHomestay)
boHomestayRouter.delete('/delete-homestay/:_id',bo_homestayController.deleteHomestay)
boHomestayRouter.put('/edit-homestay/:_id',bo_homestayController.editHomestay)
boHomestayRouter.get('/search-homestay',bo_homestayController.SearchHomestay)



export default boHomestayRouter;


