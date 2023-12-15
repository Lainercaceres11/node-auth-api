import { Link } from "react-router-dom";
import { useAuth } from "../context/AuntContext";

const Navbar = () => {
  const { isAuth, logout, user } = useAuth();
  return (
    <nav className="bg-zinc-700 my-3 py-5 px-2 flex justify-between">
      <Link to={isAuth ? "/task" : "/"}>
        <h1 className="text-2xl font-bold"> Task Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuth ? (
          <>
            <li>Welcome {user.username}</li>

            <li>
              <Link to="/task">Task</Link>
            </li>

            <li>
              <Link className="bg-indigo-600 px-4 py-1" to="/add-task">Add Task</Link>
            </li>

            <li>
              <Link className="bg-indigo-500 px-4 py-1" to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="bg-indigo-500 px-4 py-1" to="/login">Login</Link>
            </li>

            <li>
              <Link className="bg-indigo-500 px-4 py-1" to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
