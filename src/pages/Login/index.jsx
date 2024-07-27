
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import s from "./index.module.css";
import logo from "../../assets/logo.svg";
import imgLogin from "../../assets/img-login.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTitle } from "../../hooks";
import { useForm } from "react-hook-form";
import { iniciarSesion } from "../../utils";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export function Login() {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  useTitle("Login - LifeUnity");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    setError(false);
    reset();
    const logeado = await iniciarSesion(data.username, data.password);
    if (logeado.access || logeado.refresh) {
      setError(false);
      navigate("/");
    } else {
      setError(true);
    }
  });

  const errorMessage = (field) => {
    return (
      errors[field] && (
        <span className="font-primary text-red-500 text-xs font-semibold mt-1">
          {errors[field].message}
        </span>
      )
    );
  };

  const loginGoogle = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    try {
      const logeado = await iniciarSesion(decoded.name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9@.+_-]/g, ""), decoded.sub);
      if (logeado.access || logeado.refresh) {
        setError(false);
        navigate("/");
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="bg-[#EEEFF1] flex justify-center items-center  h-full">
      <div>
        <nav className="p-5 flex justify-between items-center md:my-5 md:px-10">
          <div className="logo flex items-center gap-3">
            <img src={logo} alt="Logo LifeUnity" className="size-[60px]" />
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
              <div className="w-full flex justify-center">
                <GoogleLogin
                  theme="filled_black"
                  size="large"
                  shape="circle"
                  width="300px"
                  logo_alignment="center"
                  onSuccess={async (credentialResponse) => {
                    await loginGoogle(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <div className={`${s.lines} flex items-center gap-3 my-3`}>
                <span className=" font-primary font-semibold text-[15px]">
                  OR
                </span>
              </div>
              <div className="relative w-full grid">
                <div className="mb-3">
                  <input
                    name="username-login"
                    type="text"
                    placeholder="Username"
                    className="font-primary w-full text-sm py-2 px-5 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black bg-white"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Username is required",
                      },
                    })}
                  />
                  {errorMessage("username")}
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
              {error && (
                <p className="text-red-500 text-xs font-semibold mb-3">
                  The email or password is incorrect
                </p>
              )}
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
