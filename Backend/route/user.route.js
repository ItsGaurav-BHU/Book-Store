import express from "express";
import { signup, login } from "../controller/user.controller.js";
import { signupValidationRules, loginValidationRules } from "../middleware/validator.js";

const router = express.Router();

router.post("/signup", signupValidationRules, signup);
router.post("/login", loginValidationRules, login);

export default router;