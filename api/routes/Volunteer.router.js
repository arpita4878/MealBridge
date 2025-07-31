import express, { application } from 'express'
import * as volunteerController from '../controller/Volunteer.controller.js'

const router=express.Router()

router.post("/add",volunteerController.add)

router.get("/fetch",volunteerController.fetch)



export default router;










