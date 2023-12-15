import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskByIdRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/task";

export const TaskContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("Falta el contexto de tareas");
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export function TaskProvider({ children }) {
  const [task, setTask] = useState([]);

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res)
  };

  const getTask = async () => {
    try {
      const res = await getTasksRequest();
      setTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTask(task.filter(t => t._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getTaskById = async (id) => {
    try {
      const res = await getTaskByIdRequest(id);
      return res.data
    } catch (error) {
      console.log(error);
    }
  };

  
  const updateTask = async (id, value) => {
    try {
      const res = await updateTaskRequest(id, value);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <TaskContext.Provider value={{ createTask, getTask, deleteTask, getTaskById, updateTask, task }}>
      {children}
    </TaskContext.Provider>
  );
}
