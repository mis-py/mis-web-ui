import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "redux/slices/authSlice";
import { toast } from "react-toastify";

import { AiOutlineEye } from "react-icons/ai";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [showPassword, setShowPassword] = React.useState("password");

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const values = await dispatch(fetchAuth(data));

    if (!values.payload) {
      toast.error("Incorrect login or password!");
    }

    if (values.payload.access_token) {
      window.localStorage.setItem("token", values.payload.access_token);
      window.localStorage.setItem("user_id", values.payload.user_id);
      window.localStorage.setItem("username", values.payload.username);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

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
    <div className="flex flex-col relative z-20 justify-center h-screen py-7 px-5 bg-backGround overflow-hidden lg:z-40">
      <img
        className="absolute bottom-0 left-0 h-[60%] w-full"
        src={require("assets/img/ellipse.png")}
        alt=""
      />
      <img
        className="w-[192px] mx-auto mb-[104px] z-10"
        src={require("assets/img/logo.png")}
        alt=""
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-10 sm:w-[345px] sm:mx-auto"
      >
        <label className="flex flex-col relative body-1 mb-8" htmlFor="email">
          Username
          <input
            className="bg-backGround px-3 py-2 rounded text-gray text-sm focus-visible:outline-none"
            type="text"
            id="username"
            placeholder="Enter your username"
            autoComplete="off"
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
  );
};

export default Signin;
