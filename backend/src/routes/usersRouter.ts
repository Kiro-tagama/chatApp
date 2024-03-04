import { Router } from "express";
import { getUsers } from "../controllers/usersController";

const router=Router()

router.get('/userName:',getUsers)
router.post('/creatChat',getUsers)

export default router