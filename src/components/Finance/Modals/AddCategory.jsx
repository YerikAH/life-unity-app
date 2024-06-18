/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconExclamationCircle, IconX } from "@tabler/icons-react";

// { open = true, setOpen, id }
export const AddCategory = () => {
  const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-35 transition-opacity backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="bg-white text-gray-400 hover:text-gray-500 focus:outline-none active:scale-95 hover:bg-gray-100 p-1 rounded-full transition-all"
                    onClick={() => setOpen(false)}>
                    <span className="sr-only">Close</span>
                    <IconX className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className=" flex flex-col mt-3 sm:ml-4 sm:mt-0 ">
                  <Dialog.Title
                    as="h3"
                    className="my-2 text-base font-semibold leading-6 text-gray-900 font-primary">
                    ADD NEW CATEGORY
                  </Dialog.Title>
                  <p className="text-sm text-gray-500  font-primary">
                    Here you can add new category to your list
                  </p>
                  <form className="flex gap-5 my-4 flex-col md:flex-row ">
                    <div class="md:w-32">
                      <label htmlFor="icon">Icon <span class="text-xs">(use <kbd>win + .</kbd>)</span></label>
                      <input
                        id="icon"
                        type="text"
                        className="w-full border border-gray-200 rounded-xl p-2 mt-2"
                        placeholder="Icon Image"
                      />
                    </div>
                    <div class="md:flex-1">
                      <label htmlFor="title">Title</label>
                      <input
                        id="title"
                        type="text"
                        className="w-full border border-gray-200 rounded-xl p-2 mt-2"
                        placeholder="Category Title"
                      />
                    </div>
                  </form>
                </div>
                <div className="mt-5 flex justify-end items-center">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-xl transition-all bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/70 sm:ml-3 sm:w-auto font-primary active:scale-95"
                    onClick={() => setOpen(false)}>
                    Save Category
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
