import { Router } from "express";
import { getChats, getMenssage, postMessage } from "../controllers/chatController";

const router=Router()

router.get('/id:',getChats)
router.get('/chatId:',getMenssage)
router.post('/chatId:',postMessage)

export default router