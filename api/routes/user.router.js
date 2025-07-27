import express from 'express'
import * as UserController from '../controller/user.controller.js'

const router=express.Router()

router.post("/login",UserController.login)

router.get('/check-email', UserController.checkEmail);

router.post("/register",UserController.register)

router.patch("/update",UserController.update)

router.get("/fetch",UserController.fetch)

router.delete("/deleteUser",UserController.deleteUser)


export default router;










