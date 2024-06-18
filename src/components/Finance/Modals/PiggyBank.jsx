/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconPigMoney, IconChevronLeft } from "@tabler/icons-react";

// { open = true, setOpen, id }
export const PiggyBank = () => {
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div className=" flex flex-col mt-3 sm:ml-4 sm:mt-0 ">
                  <div className="flex justify-between items-center mb-2 gap-5">
                    <div className="flex items-center gap-5">
                      <button>
                        <IconChevronLeft className="size-7" />
                      </button>
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 font-primary">
                        Piggy Bank
                      </Dialog.Title>
                    </div>
                    <div>
                      <IconPigMoney className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="text-center mx-auto my-5">
                  <p className="text-xl text-gray-500  font-primary my-3">
                    Until today, you have saved
                  </p>
                  <span className="text-4xl font-semibold font-primary text-primary">
                    S./ 0.00
                  </span>
                </div>
                <div className="mt-5 flex justify-between items-center">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-xl transition-all bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/70 sm:ml-3 sm:w-auto font-primary active:scale-95"
                    // onClick={() => setOpen(false)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-xl transition-all bg-gray-300 px-5 py-2 text-sm font-semibold text-primary shadow-sm hover:bg-gray-300/70 sm:ml-3 sm:w-auto font-primary active:scale-95"
                    // onClick={() => setOpen(false)}
                  >
                    Withdraw
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
