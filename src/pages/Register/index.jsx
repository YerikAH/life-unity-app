import { Link } from "react-router-dom";
import google from '../../assets/google.svg'
import logo from '../../assets/logo.svg'
import imgSignup from '../../assets/img-signup.svg'
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { useState } from "react";
import s from './index.module.css'

export function Register() {
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => setShowPassword(!showPassword)
  return (
    <div className='bg-[#eeeff1] flex justify-center items-center  h-full'>
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
            className='font-primary bg-[#000428] text-white px-6 py-2 rounded-md text-xs font-semibold tracking-wider outline outline-2 outline-[#000428] cursor-pointer transition duration-300  relative z-20'
          >
            LogIn
          </Link>
        </nav>


        <main
          className="py-10 flex flex-col gap-16 justify-center items-center max-w-[375px] m-auto md:flex-row-reverse md:max-w-full md:items-center lg:gap-[200px] md:h-[calc(100%-70px)] px-10">
          <section className="w-full header-left md:max-w-[300px] md:flex-none lg:min-w-[400px]">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold font-primary">Create a new account</h1>
              <p className="text-md mt-1 font-primary">Enter your details to register</p>
            </div>
            <form action="" >
              <button
                className="font-primary flex items-center w-full justify-center gap-2 text-sm bg-white py-2 rounded-md font-semibold hover:bg-[#3F3E3E] hover:text-white transition-btn"
                name="google-signup">
                <img src={google} alt="" className="size-[25px]" />
                Sign up with Google
              </button>
              <div className={`flex items-center gap-3 my-3 ${s.lines}`}>
                <span className="font-primary font-semibold text-[15px]">OR</span>
              </div>
              <div className="flex gap-2">
                <input
                  name="first-name-signup"
                  type="text"
                  placeholder="First Name"
                  className="font-primary w-full text-sm py-2 px-5 mb-3 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black " required
                />
                <input
                  name="last-name-signup"
                  type="text"
                  placeholder="Last Name"
                  className="font-primary w-full text-sm py-2 px-5 mb-3 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black " required
                />
              </div>
              <input
                name="email-login"
                type="text"
                placeholder="Email"
                className="font-primary w-full text-sm py-2 px-5 mb-3 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black " required
              />
              <div className='relative'>
                <input
                  id="password-login"
                  name="password-login"
                  type={showPassword ? "password" : "text"}
                  placeholder="Password"
                  className="font-primary w-full text-sm py-2 px-5 mb-3 rounded-md font-semibold placeholder:text-[#3F3E3E] focus:ring-black focus:border-black"
                  required
                />
                <button
                  id="show-password-login"
                  name="show-password-login"
                  className="absolute right-2 top-2.5"
                  type="button"
                  onClick={togglePassword}
                >
                  {!showPassword ? <IconEyeClosed size={16} /> : <IconEye size={16} />}
                </button>
              </div>
              <div className="flex justify-between text-sm items-center font-semibold mb-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="agree-terms"
                    id="agree-terms"
                    className="w-4 h-4 text-black bg-gray-100 border-gray-500 rounded focus:ring-black focus:ring-2"
                  />
                  <label htmlFor="agree-terms" className='font-primary flex gap-1'>
                    I agree all
                    <a href="#" className="border-b border-b-black font-primary">
                      Term, Privacy Policy and Fees
                    </a>
                  </label>
                </div>
              </div>
              <button
                type='submit'
                name="signup-btn"
                className="font-primary text-sm w-full bg-[#E8AA42] py-2 font-semibold rounded-md hover:bg-[#ECBA67]"
              >
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
  )
}