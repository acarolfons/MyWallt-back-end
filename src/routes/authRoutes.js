import express from "express";
import {signUpSchema, signInSchema} from "../schemas/authSchemas.js";
import { signUp, signIn } from "../controllers/authController.js";
import validateSchema from "../middlewares/validateSchema.js";

const router = express.Router();

router.post("/sign-up", validateSchema(signUpSchema), signUp);
router.post("/sign-in", validateSchema(signInSchema), signIn);

export default router;