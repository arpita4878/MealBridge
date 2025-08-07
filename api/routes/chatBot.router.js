import express from 'express'
import * as chatBotController from '../controller/chatBot.controller.js'

const router=express.Router()


router.post('/api/chatbot',chatBotController.bot)

export default router;
