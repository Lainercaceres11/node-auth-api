import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

export default function FormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const { createTask, getTaskById, updateTask } = useTask();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const taskUpdatep = await getTaskById(params.id);
        setValue("title", taskUpdatep.title);
        setValue("description", taskUpdatep.description);
        setValue("date", dayjs.utc(taskUpdatep.date).format("YYYY-MM-DD"))
      }
    }

    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) {
      await updateTask(params.id, dataValid);
    } else {
      await createTask(dataValid);
    }
    navigate("/task");
  });
  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center ">
      <div className="bg-zinc-800 max-w-md w-full  p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
            className="bg-zinc-700 w-full py-2 rounded-md px-4 my-3"
          />

          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="bg-zinc-700 w-full py-2 rounded-md px-4 my-3"
          ></textarea>

          <label htmlFor="date">Date</label>
          <input
            className="bg-zinc-700 w-full py-2 rounded-md px-4 my-3"
            type="date"
            {...register("date")}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {params.id ? "Edit" : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
