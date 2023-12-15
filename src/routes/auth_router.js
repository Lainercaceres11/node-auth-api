import { Router } from "express";

import { login, register, logout, profile, verifyToken } from "../controllers/auth_controllers.js";
import { authRequirer } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.js";
import { loginSchema, registerSchema } from "../schemas/auth-schema.js";

const authRouter = Router();

authRouter.post("/register", validateSchema(registerSchema), register);

authRouter.post("/login", validateSchema(loginSchema), login);

authRouter.post("/logout", logout);

authRouter.get("/profile", authRequirer, profile);

authRouter.get("/verify", verifyToken);

export default authRouter;
