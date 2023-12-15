import instance from "./axios";

export const getTasksRequest = () => instance.get(`/task`);

export const getTaskByIdRequest = (id) => instance.get(`/task/${id}`);

export const createTaskRequest = (task) => instance.post(`/task`, task);

export const updateTaskRequest = (id, task) =>
  instance.put(`/task/${id}`, task);

export const deleteTaskRequest = (id) => instance.delete(`/task/${id}`);
