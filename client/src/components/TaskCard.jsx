import PropTypes from "prop-types";
import { useTask } from "../context/TaskContext";
import { Link } from "react-router-dom";

import utc from "dayjs/plugin/utc"
import dayjs from "dayjs";
dayjs.extend(utc)

// eslint-disable-next-line react/prop-types
const TaskCard = ({ task }) => {
  const {deleteTask} = useTask()
  
  return (
    <div className="bg-zinc-800 rounded-md w-full max-w-md p-10">
      <header className="flex justify-between">
      <h1 className="text-1xl font-bold "> {task.title}</h1>
      <div className="flex gap-2 items-center">
        <button className="bg-red-500 text-white rounded-md px-4 py-2" onClick={()=> deleteTask(task._id)}>delete</button>
        <Link className="bg-blue-500 text-white rounded-md px-4 py-2" to={`/task/${task._id}`}>edit</Link>
      </div>
      </header>
      <p className="text-slate-300 ">{task.description}</p>
     
<p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object,
};

export default TaskCard;
