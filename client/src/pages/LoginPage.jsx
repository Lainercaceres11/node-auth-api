import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuntContext";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, error, isAuth } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    await login(values);
  });

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) return navigate("/task");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center ">
      <div className="bg-zinc-500 max-w-md rounded-md p-10 w-full">
        <form onSubmit={onSubmit}>
          {error &&
            error.map((err, index) => (
              <div key={index} className="bg-red-500 text-white py-2 my-2">
                {err}
              </div>
            ))}
          <h1 className="text-2xl font-bold">Login</h1>
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

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Login
          </button>
        </form>

        <p className="flex justify-between gap-2">
          ¿No tienes un cuenta aun?{" "}
          <Link className="text-yellow-300" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
