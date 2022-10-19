import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import qs from "qs";

import LogoImg from "../assets/img/logo.png";
import EllipseImg from "../assets/img/ellipse.png";

const Singin = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    axios({
      method: "post",
      url: "http://65.21.238.213:8000/users/token",
      data: qs.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
      .then(function (response) {
        if (response.status === 200) {
          const token = response.data.access_token;
          localStorage.setItem("my-token", token);
          axios({
            method: "get",
            url: "http://65.21.238.213:8000/",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("my-token")}`,
            },
          })
            .then(function (response) {
              if (response.status === 200) {
                navigate("/");
              }
            })
            .catch(function (response) {
              console.log(response);
              if (response.status === 401) {
                toast.error("okadnfmjanfaf");
              }
            });
        }
      })
      .catch(function (response) {});
  };

  return (
    <div className="flex flex-col relative z-20 justify-center h-screen py-7 px-5 overflow-hidden">
      <img
        className="absolute bottom-0 left-0 h-[60%] w-full"
        src={EllipseImg}
        alt=""
      />
      <img className="w-[192px] mx-auto mb-[104px] z-10" src={LogoImg} alt="" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-10 sm:w-[345px] sm:mx-auto"
      >
        <label className="flex flex-col body-1 mb-6" htmlFor="email">
          Username
          <input
            className="bg-backGround px-3 py-2 rounded text-gray text-sm focus-visible:outline-none"
            type="text"
            id="username"
            placeholder="Enter your username"
            {...register("username", { required: true, maxLength: 80 })}
          />
        </label>
        <label className="flex flex-col body-1 mb-6" htmlFor="password">
          Password
          <input
            className="bg-backGround px-3 py-2 rounded text-gray text-sm focus-visible:outline-none"
            type="text"
            id="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
        </label>
        <label className="flex items-center" htmlFor="remember">
          <input className="mr-2 w-5 h-5" type="checkbox" id="remember" />
          Remember me
        </label>
        <button type="submit" className="btn-primary mt-14">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Singin;
