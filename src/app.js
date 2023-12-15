import express from "express"
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"

import taskRouter from "./routes/task_router.js";
import authRouter from "./routes/auth_router.js";

const app = express()

//middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

//Routes
app.use("/api", authRouter)
app.use("/api", taskRouter )

export default app;
