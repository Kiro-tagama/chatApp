import { Router } from "express";
import { getChats, getMenssage, postMessage } from "../controllers/chatController";

const router=Router()

router.get('/userChat/:id',getChats)
router.get('/menssages/:chatId',getMenssage)
router.post('/menssages/:chatId',postMessage)

export default router