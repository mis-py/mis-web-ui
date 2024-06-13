import React from "react";
import { Navigate, useLocation, redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "redux/slices/authSlice";
import { toast } from "react-toastify";
import PetushokImg from 'assets/img/petushok.png';
// import TeamImg from "assets/img/groups.png";
import { AiOutlineEye } from "react-icons/ai";
import { ToastContainer, Slide } from "react-toastify";

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
    return <Navigate to='/'/>
  }

  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  const onSubmit = async (data) => {
    const values = await dispatch(userLogin(data)).unwrap()
      .catch((rejected) => {
        return toast.error(`${rejected}`);
      })

    return redirect(data.redirectTo || "/");
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
    // <div className="w-full h-full">
    //   <div className="flex flex-col relative z-20 justify-center h-screen py-7 px-5 bg-backGround overflow-hidden lg:z-40" style={{background:"#1D1D1D"}}>
    //     <form
    //       onSubmit={handleSubmit(onSubmit)}
    //       method="post"
    //       className="z-10 sm:w-[345px] sm:mx-auto"
    //     >
    //       <input type="hidden" name="redirectTo" value={from} />

    //       <label className="flex flex-col relative body-1 mb-8" htmlFor="email">
    //         Username
    //         <input
    //           className="bg-backGround px-3 py-2 rounded text-gray text-sm focus-visible:outline-none"
    //           type="text"
    //           id="username"
    //           placeholder="Enter your username"
    //           autoComplete="off"
    //           name="username"
    //           {...register("username", {
    //             required: "Username is required",
    //           })}
    //         />
    //         {errors.username && (
    //           <p className="absolute -bottom-6 left-2 text-sm text-danger">
    //             {errors.username?.message}
    //           </p>
    //         )}
    //       </label>
    //       <label
    //         className="flex flex-col relative body-1 mb-6"
    //         htmlFor="password"
    //       >
    //         Password
    //         <input
    //           className="bg-backGround px-3 py-2 rounded text-gray text-sm focus-visible:outline-none"
    //           type={showPassword}
    //           id="password"
    //           placeholder="Enter your password"
    //           autoComplete="off"
    //           name="password"
    //           {...register("password", { required: "Password is required" })}
    //         />
    //         {errors.password && (
    //           <p className="absolute -bottom-6 left-2 text-sm text-danger">
    //             {errors.password?.message}
    //           </p>
    //         )}
    //         <button
    //           onClick={toggleShowPassword}
    //           className="absolute right-4 top-1/2 mt-1"
    //           type="button"
    //         >
    //           <AiOutlineEye />
    //         </button>
    //       </label>
    //       <button type="submit" className="btn-primary mt-14">
    //         Sign in
    //       </button>
    //     </form>
    //   </div>
    // </div>
    <div data-theme="light" className="flex w-full h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src={PetushokImg}
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your Petushok MIS account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="input input-bordered input-sm w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input input-bordered input-sm w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm"
                  {...register("password", { required: "Password is required" })}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="https://natribu.org/ua/" target="_blank" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Then go away!
            </a>
          </p>
        </div>
              
      <ToastContainer 
        stacked 
        closeOnClick 
        position="bottom-right"
        autoClose={1200}
        hideProgressBar
        newestOnTop
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      </div>
  );
};

export default Signin;
