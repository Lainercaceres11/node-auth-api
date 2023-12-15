import { Router } from "express";
import { authRequirer } from "../middlewares/validateToken.js";
import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../controllers/task_controller.js";
import { validateSchema } from "../middlewares/validator.js";
import { createTaskSchema } from "../schemas/task-schema.js";

const taskRouter = Router()

taskRouter.get("/task", authRequirer, getTask)

taskRouter.get("/task/:id", authRequirer, getTaskById)

taskRouter.post("/task", authRequirer, validateSchema(createTaskSchema), createTask)

taskRouter.put("/task/:id", authRequirer, updateTask)

taskRouter.delete("/task/:id", authRequirer, deleteTask )

export default taskRouter