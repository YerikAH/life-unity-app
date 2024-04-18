import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import s from "./index.module.css";
import google from "../../assets/google.svg";
import logo from "../../assets/logo.svg";
import imgLogin from "../../assets/img-login.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTitle } from "../../hooks";
import { useForm } from "react-hook-form";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { changeTitle } = useTitle();
  const togglePassword = () => setShowPassword(!showPassword);
  const userNavigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    changeTitle("Login - LifeUnity");
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
    userNavigate("/");
  });

  const errorMessage = (field) => {
    return (
      errors[field] && (
        <span className="text-red-500 text-xs font-semibold mt-1">
          {errors[field].message}
        </span>
      )
    );
  };

  return (
    <div className="bg-gray flex justify-center items-center  h-full">
      <div>
        <nav className="p-5 flex justify-between items-center md:my-5 md:px-10">
          <div className="logo flex items-center gap-3">
            <img src={logo} alt="Logo LifeUnity" className="size-[50px]" />
            <div className="text-xl md:text-[35px] font-thin font-primary">
              <span className="font-extrabold font-primary">Life</span>Unity
            </div>
          </div>
          <Link
            to="/register"
            className="font-primary bg-primary text-white px-6 py-2 rounded-md text-md font-semibold tracking-wider  outline outline-2 outline-primary cursor-pointer transition duration-300 relative z-20">
            SignUp
          </Link>
        </nav>
        <main
          id="login-header"
          className="py-10 flex flex-col gap-16 justify-center items-center max-w-[375px] m-auto md:flex-row md:max-w-full md:items-center lg:gap-[200px] md:h-[calc(100%-70px)] px-10">
          <section className="w-full header-left md:max-w-[300px] md:flex-none lg:min-w-[400px]">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold font-primary">Welcome Back!</h1>
              <p className="text-lg mt-2 font-primary">
                Glad to see you again 🫶
              </p>
            </div>
            <form className="relative z-20" onSubmit={onSubmit}>
              <button
                name="google-login"
                className="font-primary w-full flex items-center justify-center gap-2 text-sm bg-white py-2 rounded-md font-semibold hover:bg-[#3F3E3E] hover:text-white transition-btn">
                <img src={google} alt="" className="size-[25px]" />
                Log in with Google
              </button>
              <div className={`${s.lines} flex items-center gap-3 my-3`}>
                <span className=" font-primary font-semibold text-[15px]">
                  OR
                </span>
              </div>
              <div className="relative w-full grid">
                <div className="mb-3">
                  <input
                    name="email-login"
                    type="text"
                    placeholder="Email"
                    className="font-primary w-full text-sm py-2 px-5 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black bg-white"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errorMessage("email")}
                </div>
                <div className="relative mb-3">
                  <input
                    id="password-login"
                    name="password-login"
                    type={!showPassword ? "password" : "text"}
                    placeholder="Password"
                    className="font-primary w-full text-sm py-2 px-5 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      },
                    })}
                  />
                  {errorMessage("password")}
                  <button
                    id="show-password-login"
                    name="show-password-login"
                    className="absolute right-2 top-2.5"
                    onClick={togglePassword}
                    type="button">
                    {showPassword ? (
                      <IconEyeClosed size={16} />
                    ) : (
                      <IconEye size={16} />
                    )}
                  </button>
                </div>
              </div>
              {false && (
                <p className="text-red-500 text-xs font-semibold mb-3">
                  The email or password is incorrect
                </p>
              )}
              <div className="font-primary flex justify-end text-xs items-center font-semibold">
                <a href="#" className={`text-sm ${s.forgot} pb-1 relative `}>
                  Forgot your password?
                </a>
              </div>
              <button
                type="submit"
                name="login-btn"
                className="text-sm mt-5 w-full bg-[#E8AA42] py-2 font-semibold rounded-md hover:bg-[#ECBA67] font-primary">
                Log In
              </button>
            </form>
          </section>
          <section className="relative">
            <div className="lg:w-500px">
              <img
                src={imgLogin}
                alt="People seeing tasks"
                className="size-full z-20 relative"
              />
            </div>
            <div className={s.circle1}></div>
            <div className={s.circle2}></div>
            <div className={s.circle3}></div>
            <div className={s.circle4}></div>
            <div className={s.circle5}></div>
            <div className={s.circle6}></div>
            <div className={s.circle7}></div>
            <div className={s.circle8}></div>
            <div className={s.circle9}></div>
          </section>
        </main>
      </div>
    </div>
  );
}
