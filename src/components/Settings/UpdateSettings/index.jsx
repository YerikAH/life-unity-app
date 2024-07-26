import { useState, useEffect, useRef } from "react";
import {
  IconCloudUpload,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { Image } from "../../shared/Image";
import { obtenerUsuario, updateUser } from "../../../utils";

export function UpdateSettings() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const imageInput = useRef(null);

  const onSubmit = handleSubmit(async (data) => {
    const image = imageInput.current.files[0];
    const dataFiltrado = Object.entries(data).reduce((acc, [key, value]) => {
      if (value.trim() !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
    const newD = (() => {
      if (image) {
        return { image, ...dataFiltrado, is_active: true };
      } else {
        return { ...dataFiltrado, is_active: true };
      }
    })();
    const form = new FormData();
    Object.entries(newD).forEach(([key, value]) => {
      form.append(key, value);
    }); 
    const newUser = await updateUser(form);
    setUser(newUser);
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

  const fetchUser = async () => {
    setIsLoading(true);
    const currentUser = await obtenerUsuario();
    setUser(currentUser);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <header>
        <div className="relative h-24">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#E8AA42_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="flex items-start justify-between  lg:h-20 flex-col lg:flex-row">
          <div className="flex gap-5 h-20 lg:flex-[3_3_0%]">
            <div className="bg-white p-1 rounded-full shadow-lg size-36 md:size-40 relative bottom-24 flex justify-center">
              <Image user={user} isLoading={isLoading} marginy="my-0" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold font-primary">
                {user?.first_name} {user?.last_name}
              </h1>
              <p className="text-gray-500 font-primary">{user?.email}</p>
            </div>
          </div>
        </div>
      </header>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <section className="flex justify-between gap-5 w-full items-center py-5 border-b border-b-[#838383]">
          <div className="w-full flex-1 lg:flex-[3_3_0%]">
            <h2 className="font-semibold text-base font-primary">
              General Details
            </h2>
            <p className="text-sm text-[#4E4B4B] md:text-md font-primary">
              Update your photo and personal details here
            </p>
          </div>
          <div className="flex gap-3 md:gap-5 w-full flex-1 font-semibold tracking-wide">
            <button
              type="button"
              onClick={cancelEdit}
              className="text-[#4E4B4B] bg-[#F0F0F0] flex-1 py-2 rounded-md  hover:bg-[#F0F0F0]/70 font-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#000428] text-white flex-1 rounded-md py-2 hover:bg-[#000428]/80 font-primary"
            >
              Save
            </button>
          </div>
        </section>
        <section className="flex flex-[2_2_0%] flex-col md:flex-row justify-between lg:gap-12 md:justify-normal py-5 border-b border-b-[#838383]">
          <div className="py-2 md:w-[300px]">
            <h2 className="font-semibold text-base font-primary">
              Your Profile Photo
            </h2>
            <p className="text-sm text-[#4E4B4B] md:text-md font-primary">
              Update your public photo here to make it easier for people to
              recognize you
            </p>
          </div>
          <div className="py-5 md:p-0 flex gap-5 lg:gap-10 items-center justify-center">
            <div className="flex flex-col gap-3 items-center">
              <div className="size-28 lg:size-32 shadow-lg rounded-full p-1 flex justify-center">
                <Image user={user} isLoading={isLoading}  marginy="my-0" />
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-30 md:h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray"
              >
                <button
                  type="button"
                  className="flex flex-col items-center justify-center pt-5 pb-6 px-5 text-center font-primary"
                  onClick={() => {
                    // es para que se abra el input de tipo file
                    imageInput.current.click();
                  }}
                >
                  <IconCloudUpload stroke={2} />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 font-primary">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-primary">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </button>
                <input
                  ref={imageInput}
                  name="image"
                  id="dropzone-file"
                  type="file"
                  className="hidden font-primary"
                />
              </label>
            </div>
          </div>
        </section>
        <section className="pt-5 pb-6 flex flex-col md:flex-row lg:gap-10 border-b border-b-[#838383]">
          <div className="py-2 font-semibold md:w-[300px] md:flex-none">
            <h2 className="text-base font-primary">Personal Information</h2>
          </div>
          <div action="" className="px-5 flex gap-5 flex-col flex-wrap w-full">
            <div className="flex gap-5 w-full flex-col">
              <div className="flex flex-col gap-2 flex-1">
                <label
                  htmlFor="full-name"
                  className="font-primary font-semibold"
                >
                  Full name
                </label>
                <div className="flex items-center gap-5 w-full flex-col lg:flex-row">
                  <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <IconUser stroke={2} size="20" />
                    </div>
                    <input
                      type="text"
                      id="full-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter first name"
                      {...register("first_name")}
                    />
                  </div>
                  <div className="flex-1  w-full">
                    <input
                      type="text"
                      id="last-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter last name"
                      {...register("last_name")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 w-full flex-col lg:flex-row">
              <div className="flex flex-col gap-2 flex-1 ">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3 pointer-events-none translate-y-[25%]">
                    <IconMail stroke={2} size="20" />
                  </div>
                  <input
                    type="text"
                    id="email"
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
              <div className="flex flex-col gap-2 flex-1 ">
                <label htmlFor="email" className="font-semibold">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3 pointer-events-none translate-y-[25%]">
                    <IconMail stroke={2} size="20" />
                  </div>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your username"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="password" className="font-semibold">
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
                    {...register("password", {
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
