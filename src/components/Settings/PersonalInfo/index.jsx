import { IconLock, IconMail, IconUser } from "@tabler/icons-react";

export const PersonalInfo = () => {
  return (
    <>
      <section className="pt-5 pb-6 flex flex-col md:flex-row lg:gap-10 border-b border-b-[#838383]">
        <div className="py-2 font-semibold md:w-[300px] md:flex-none">
          Personal Information
        </div>
        <form action="" className="px-5 flex gap-5 flex-col flex-wrap w-full">
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
                  />
                </div>
                <div className="flex-1  w-full">
                  <input
                    type="text"
                    id="last-name-icon"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter last name"
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
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IconMail stroke={2} size="20" />
                </div>
                <input
                  type="text"
                  id="email-address-icon"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="full-name" className="font-semibold">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <IconLock stroke={2} size="20" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter new password"
                />
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
