import express, { application } from 'express'
import * as partnerController from '../controller/partner.controller.js'

const router=express.Router()

router.post("/add",partnerController.add)

router.get("/fetch",partnerController.fetch)


export default router;










