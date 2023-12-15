import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuntContext";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singIn, isAuth, error } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate("/task");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  const onSubmit = handleSubmit(async (values) => {
    singIn(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center ">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md ">
        <h1 className="text-3xl my-3 font-bold">Register</h1>
        {error &&
          error.map((err, index) => (
            <div key={index} className="bg-red-500 text-white py-2">
              {err}
            </div>
          ))}
        <div className="bg-zinc-500 max-w-md rounded-md p-10 w-full flex justify-center items-center">
          <form onSubmit={onSubmit}>
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="text"
              placeholder="Lainer"
              {...register("username", { required: true })}
            />

            {errors.username && (
              <p className="text-red-500">Username is required</p>
            )}
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="email"
              placeholder="lainer12@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
            <input
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              type="password"
              placeholder="123"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Register</button>
          </form>
        </div>

        <p className="flex justify-between gap-2">
          ¿Ya estas registrado?{" "}
          <Link className="text-yellow-300" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
