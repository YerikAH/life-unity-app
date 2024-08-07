import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import imgSignup from "../../assets/img-signup.svg";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { useState } from "react";
import s from "./index.module.css";
import { useTitle } from "../../hooks";
import { useForm } from "react-hook-form";
import { registrarUsuario, registrarUsuarioGoogle } from "../../utils";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export function Register() {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useTitle("Register - LifeUnity");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = handleSubmit(async (data) => {
    try {
      reset();
      // eslint-disable-next-line no-unused-vars
      const { terms, ...dataWithoutTerms } = data;
      const userCreated = await registrarUsuario({
        ...dataWithoutTerms,
        is_active: true,
      });
      if (userCreated.error) {
        setError(true);
        return;
      }
      navigate("/login");
    } catch (error) {
      setError(true);
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

  const registrarGoogle = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const form = new FormData();
    form.append("first_name", decoded.given_name);
    form.append("last_name", decoded.family_name);
    form.append("username", decoded.name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9@.+_-]/g, ""));
    form.append("email", decoded.email);
    form.append("password", decoded.sub);
    form.append("is_active", true);
    try {
      const imageResponse = await fetch(decoded.picture);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "profile_picture.jpg", {
        type: "image/jpeg",
      });
      form.append("image", imageFile);
      const userCreated = await registrarUsuarioGoogle(form);
      if (userCreated.error) {
        setError(true);
        return;
      }
      navigate("/login");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="bg-[#EEEFF1] flex justify-center items-center h-full">
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
            <div className="w-full flex justify-center">
                <GoogleLogin
                  theme="filled_black"
                  size="large"
                  shape="circle"
                  width="300px"
                  logo_alignment="center"
                  onSuccess={async (credentialResponse) => {
                    await registrarGoogle(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
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
                    {...register("first_name", {
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
                    {...register("last_name", {
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
                  {errorMessage("last_name")}
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
              <div className="mb-3">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="font-primary w-full text-sm py-2 px-5 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black "
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                  })}
                />
                {errorMessage("username")}
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
                <p className="text-red-500 text-xs font-semibold mb-3 font-primary">
                  The account already exist
                </p>
              )}
              <button
                type="submit"
                name="signup-btn"
                className="font-primary text-sm w-full bg-fuel-yellow-400 py-2 font-semibold rounded-md hover:bg-fuel-yellow-500 transition-all">
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
