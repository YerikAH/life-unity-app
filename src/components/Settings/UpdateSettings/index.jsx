import { useState } from "react";
import avatar from "../../../assets/avatar.svg";
import {
  IconCloudUpload,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { cancelEdit } from "./../../../../../codigo-18-frontend/semana-8-refactor/src/utils/index";

export function UpdateSettings() {
  const [user, setUser] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log("actualizar user", data);
    reset();
  });

  const cancelEdit = () => {
    reset();
  };

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
    <>
      <form onSubmit={onSubmit}>
        <section className="flex justify-between gap-5 w-full items-center py-5 border-b border-b-[#838383]">
          <div className="w-full flex-1 lg:flex-[3_3_0%]">
            <h2 className="font-semibold text-base">General Details</h2>
            <p className="text-sm text-[#4E4B4B] md:text-md">
              Update your photo and personal details here
            </p>
          </div>
          <div className="flex gap-3 md:gap-5 w-full flex-1 font-semibold tracking-wide">
            <button
              type="button"
              onClick={cancelEdit}
              className="text-[#4E4B4B] bg-[#F0F0F0] flex-1 py-2 rounded-md  hover:bg-[#F0F0F0]/70">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#000428] text-white flex-1 rounded-md py-2 hover:bg-[#000428]/80">
              Save
            </button>
          </div>
        </section>
        <section className="flex flex-[2_2_0%] flex-col md:flex-row justify-between lg:gap-12 md:justify-normal py-5 border-b border-b-[#838383]">
          <div className="py-2 md:w-[300px]">
            <h2 className="font-semibold text-base">Your Profile Photo</h2>
            <p className="text-sm text-[#4E4B4B] md:text-md">
              Update your public photo here to make it easier for people to
              recognize you
            </p>
          </div>
          <div className="py-5 md:p-0 flex gap-5 lg:gap-10 items-center justify-center">
            <div className="flex flex-col gap-3 items-center">
              <div className="size-28 lg:size-32 shadow-lg rounded-full p-1">
                <img
                  src={avatar}
                  alt="Profile"
                  className="rounded-full size-full"
                />
              </div>
              <div>
                <button className="text-[#4E4B4B] bg-[#F0F0F0] px-6 py-2 rounded-md  hover:bg-[#F0F0F0]/70 font-semibold ">
                  Delete
                </button>
              </div>
            </div>
            {/*Uso de dropzone de blowbite */}
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-30 md:h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-5 text-center">
                  <IconCloudUpload stroke={2} />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" 
                {...register("file")}/>
              </label>
            </div>
          </div>
        </section>
        <section className="pt-5 pb-6 flex flex-col md:flex-row lg:gap-10 border-b border-b-[#838383]">
          <div className="py-2 font-semibold md:w-[300px] md:flex-none">
            Personal Information
          </div>
          <div action="" className="px-5 flex gap-5 flex-col flex-wrap w-full">
            <div className="flex gap-5 w-full flex-col">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="full-name" className="font-semibold">
                  Full name
                </label>
                <div className="flex items-center gap-5 w-full flex-col lg:flex-row">
                  <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <IconUser stroke={2} size="20" />
                    </div>
                    <input
                      type="text"
                      id="first-name-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter first name"
                      {...register("firstName")}
                    />
                  </div>
                  <div className="flex-1  w-full">
                    <input
                      type="text"
                      id="last-name-icon"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter last name"
                      {...register("lastName")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 w-full flex-col lg:flex-row">
              <div className="flex flex-col gap-2 flex-1 ">
                <label htmlFor="full-name" className="font-semibold">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3 pointer-events-none translate-y-[25%]">
                    <IconMail stroke={2} size="20" />
                  </div>
                  <input
                    type="text"
                    id="email-address-icon"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errorMessage("email")}
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="full-name" className="font-semibold">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 translate-y-[25%] ps-3 pointer-events-none">
                    <IconLock stroke={2} size="20" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter new password"
                    {...register("password",{
                      minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters",
                      },
                    })}
                  />
                  {errorMessage("password")}
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
