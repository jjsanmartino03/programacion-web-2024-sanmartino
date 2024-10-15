import express from "express";
import userController from "../controllers/users.js";

const router = express.Router();

router.get('/', userController.index);
router.post('/users/create', userController.create);
router.post('/users/delete', userController.delete);

export default router;

