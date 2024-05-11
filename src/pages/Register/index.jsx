import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/google.svg";
import logo from "../../assets/logo.svg";
import imgSignup from "../../assets/img-signup.svg";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import s from "./index.module.css";
import { useTitle } from "../../hooks";
import { useForm } from "react-hook-form";
import { createUser, updateProfileUser, loginWithGoogle } from "../../services/auth";

export function Register() {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { changeTitle } = useTitle();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const togglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    changeTitle("Register - LifeUnity");
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    reset();
    const userCreated = await createUser(data.email, data.password);
    if (!userCreated) {
      setError(true);
      setIsLoading(false);
      return;
    }
    const name= data.firstName+" "+data.lastName;
    await updateProfileUser(name);
    setIsLoading(false);
    if (isLoading === false) {
      navigate("/");
    }
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

  const registerGoogle = async () => {
    try{
      await loginWithGoogle();
    }catch(error){
      return null;
    }
  }

  return (
    <div className="bg-gray flex justify-center items-center h-full">
      <div>
        <nav className="p-5 flex justify-between items-center md:my-5 md:px-10">
          <div className="logo flex items-center gap-3">
            <img src={logo} alt="Logo LifeUnity" className="size-[50px]" />
            <div className="text-xl md:text-[35px] font-thin font-primary">
              <span className="font-extrabold font-primary">Life</span>Unity
            </div>
          </div>
          <Link
            to="/login"
            className="font-primary bg-primary text-white px-6 py-2 rounded-md text-md font-semibold tracking-wider outline outline-2 outline-primary cursor-pointer transition duration-300  relative z-20">
            LogIn
          </Link>
        </nav>

        <main className="py-10 flex flex-col gap-16 justify-center items-center max-w-[375px] m-auto md:flex-row-reverse md:max-w-full md:items-center lg:gap-[200px] md:h-[calc(100%-70px)] px-10">
          <section className="w-full header-left md:max-w-[300px] md:flex-none lg:min-w-[400px]">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold font-primary">
                Create a new account
              </h1>
              <p className="text-md mt-1 font-primary">
                Enter your details to register
              </p>
            </div>
            <form className="relative z-20" onSubmit={onSubmit}>
              <button
                type="button"
                className="font-primary flex items-center w-full justify-center gap-2 text-sm bg-white py-2 rounded-md font-semibold hover:bg-[#3F3E3E] hover:text-white transition-btn"
                name="google-signup"
                onClick={registerGoogle}>
                <img src={google} alt="" className="size-[25px]" />
                Sign up with Google
              </button>
              <div className={`flex items-center gap-3 my-3 ${s.lines}`}>
                <span className="font-primary font-semibold text-[15px]">
                  OR
                </span>
              </div>
              <div className="flex gap-2 mb-3">
                <div className="flex-1">
                  <input
                    name="first-name"
                    type="text"
                    placeholder="First Name"
                    className="font-primary w-full text-sm py-2 px-5 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black "
                    {...register("firstName", {
                      required: {
                        value: true,
                        message: "First Name is required",
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Must contain only letters",
                      },
                    })}
                  />
                  {errorMessage("firstName")}
                </div>
                <div className="flex-1 ">
                  <input
                    name="last-name"
                    type="text"
                    placeholder="Last Name"
                    className="font-primary w-full text-sm py-2 px-5 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black "
                    {...register("lastName", {
                      required: {
                        value: true,
                        message: "Last Name is required",
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Must contain only letters",
                      },
                    })}
                  />
                  {errorMessage("lastName")}
                </div>
              </div>
              <div className="mb-3">
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="font-primary w-full text-sm py-2 px-5 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black "
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  })}
                />
                {errorMessage("email")}
              </div>
              <div className="relative">
                <div className="mb-3">
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
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errorMessage("password")}
                </div>
                <button
                  id="show-password-login"
                  name="show-password-login"
                  className="absolute right-2 top-2.5"
                  type="button"
                  onClick={togglePassword}>
                  {showPassword ? (
                    <IconEyeClosed size={16} />
                  ) : (
                    <IconEye size={16} />
                  )}
                </button>
              </div>
              <div className="flex justify-between text-sm font-semibold mb-3 flex-col">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="agree-terms"
                    id="agree-terms"
                    className="w-4 h-4 text-black bg-gray-100 border-gray-500 rounded focus:ring-black focus:ring-2"
                    {...register("terms", {
                      required: {
                        value: true,
                        message: "You must agree to the terms and conditions",
                      },
                    })}
                  />
                  <label
                    htmlFor="agree-terms"
                    className="font-primary flex gap-1">
                    I agree all
                    <a
                      href="#"
                      className="border-b border-b-black font-primary">
                      Term, Privacy Policy and Fees
                    </a>
                  </label>
                </div>
                {errorMessage("terms")}
              </div>
              {error && (
                <p className="text-red-500 text-xs font-semibold mb-3">
                  The email already exist
                </p>
              )}
              <button
                type="submit"
                name="signup-btn"
                className="font-primary text-sm w-full bg-yellow py-2 font-semibold rounded-md">
                Sign Up
              </button>
            </form>
          </section>
          <section className="img-prin relative">
            <div>
              <img
                src={imgSignup}
                alt="Smartphone with tasks"
                className="lg:size-[530px] z-20 relative"
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
            <div className={s.circle10}></div>
            <div className={s.circle11}></div>
          </section>
        </main>
      </div>
    </div>
  );
}
