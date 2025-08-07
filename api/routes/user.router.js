import express from 'express';
import * as AuthController from '../controller/auth.controller.js';
import * as UserController from '../controller/user.controller.js';

const router = express.Router();

// Auth routes
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/google-login", AuthController.googleLogin);

// User management routes
router.get("/check-email", UserController.checkEmail);
router.patch("/update", UserController.update);
router.get("/fetch", UserController.fetch);
router.delete("/deleteUser", UserController.deleteUser);

export default router;
