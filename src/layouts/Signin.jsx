import React from "react";
import { Navigate, useLocation, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "redux/slices/authSlice";
import { toast } from "react-toastify";

import { AiOutlineEye } from "react-icons/ai";

const Signin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState("password");

  if (isAuthenticated) {
    return <Navigate to='/home'/>
  }

  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  const onSubmit = async (data) => {
    if (!data.username) {
      return toast.error("You must provide a username to log in");
    }
  
    if (!data.password) {
      return toast.error("You must provide a password to log in");
    }

    const values = await dispatch(fetchAuth(data));

    if (!values.payload) {
      return toast.error("Incorrect login or password!");
    }

    return redirect(data.redirectTo || "/home");
  };

  const toggleShowPassword = (e) => {
    e.preventDefault();
    if (showPassword === "password") {
      setShowPassword("text");
    } else if (showPassword === "text") {
      setShowPassword("password");
    } else {
      setShowPassword("password");
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col relative z-20 justify-center h-screen py-7 px-5 bg-backGround overflow-hidden lg:z-40" style={{background:"#1D1D1D"}}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="z-10 sm:w-[345px] sm:mx-auto"
        >
          <input type="hidden" name="redirectTo" value={from} />

          <label className="flex flex-col relative body-1 mb-8" htmlFor="email">
            Username
            <input
              className="bg-backGround px-3 py-2 rounded text-gray text-sm focus-visible:outline-none"
              type="text"
              id="username"
              placeholder="Enter your username"
              autoComplete="off"
              name="username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            {errors.username && (
              <p className="absolute -bottom-6 left-2 text-sm text-danger">
                {errors.username?.message}
              </p>
            )}
          </label>
          <label
            className="flex flex-col relative body-1 mb-6"
            htmlFor="password"
          >
            Password
            <input
              className="bg-backGround px-3 py-2 rounded text-gray text-sm focus-visible:outline-none"
              type={showPassword}
              id="password"
              placeholder="Enter your password"
              autoComplete="off"
              name="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="absolute -bottom-6 left-2 text-sm text-danger">
                {errors.password?.message}
              </p>
            )}
            <button
              onClick={toggleShowPassword}
              className="absolute right-4 top-1/2 mt-1"
              type="button"
            >
              <AiOutlineEye />
            </button>
          </label>
          <button type="submit" className="btn-primary mt-14">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
