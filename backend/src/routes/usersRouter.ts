import { Router } from "express";
import { getUsers,createChat } from "../controllers/usersController";

const router=Router()

router.get('/:userName',getUsers)
router.post('/creatChat',createChat)

export default router