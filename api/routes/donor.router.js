import express, { application } from 'express'
import * as donorController from '../controller/donor.controller.js'

const router=express.Router()

router.post("/add",donorController.add)

router.get("/fetch",donorController.fetch)

router.patch("/claim",donorController.update)




export default router;










