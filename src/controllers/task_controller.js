import Task from "../models/task.model.js";

const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    return res.json(tasks);
  } catch (error) {
    console.log(error);
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskFound = await Task.findById(req.params.id).populate("user");

    if (!taskFound) return res.status(400).json({ message: "Task not Found" });

    res.json(taskFound);
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newTask = new Task({ title, description, date, user: req.user.id });

    const savedTask = await newTask.save();

    return res.json(savedTask);
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskFound = await Task.findByIdAndDelete(req.params.id);

    if (!taskFound)
      return res.status(400).json({ message: "No se encontro la tarea" });

    return res.status(204).json({ message: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const taskFound = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!taskFound)
      return res.status(400).json({ message: "No se pudo modificar la tarea" });

    return res.json(taskFound);
  } catch (error) {
    console.log(error);
  }
};

export { getTask, getTaskById, createTask, updateTask, deleteTask };
