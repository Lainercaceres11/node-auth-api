import { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

export default function TaskPage() {
  const { getTask, task } = useTask();
  console.log(task)

  useEffect(() => {
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (task.length === 0) return <p>No hay tareas</p>;

  return (
    <div className="grid  gap-2 sm:grid-cols-1 sm:w-full md:grid-cols-3">
      {task.map((task) => {
        return <TaskCard task={task} key={task._id} />;
      })}
    </div>
  );
}
