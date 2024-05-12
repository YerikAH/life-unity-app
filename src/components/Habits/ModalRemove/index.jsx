/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconExclamationCircle, IconX } from "@tabler/icons-react";

export const ModalRemove = ({ open, setOpen, id }) => {
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
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-35 transition-opacity backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="bg-white text-gray-400 hover:text-gray-500 focus:outline-none active:scale-95 hover:bg-gray-100 p-1 rounded-full transition-all"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <IconX className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
                <div className=" flex justify-center items-center flex-col mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-red-500 sm:mx-0 sm:h-10 sm:w-10">
                    <IconExclamationCircle
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="mt-2 text-base font-semibold leading-6 text-gray-900 font-primary"
                  >
                    ¿Quieres eliminar el hábito?
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 text-center font-primary">
                    Are you sure you want to deactivate your account? All of
                    your data will be permanently removed.
                  </p>
                </div>
                <div className="mt-5 flex justify-center items-center">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-xl transition-all bg-red-50 px-5 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100 sm:ml-3 sm:w-auto font-primary active:scale-95"
                    onClick={() => setOpen(false)}
                  >
                    Eliminar
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
