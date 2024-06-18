/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconWallet, IconChevronLeft } from "@tabler/icons-react";

// { open = true, setOpen, id, categories }
export const BudgetWallet = () => {
  const [open, setOpen] = useState(true);
  const categories = [
    { id: 1, name: "Food", amount: 100 },
    { id: 2, name: "Transport", amount: 50 },
    { id: 3, name: "Entertainment", amount: 30 },
    { id: 4, name: "Health", amount: 20 },
    { id: 5, name: "Others", amount: 0 },
  ];

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
                <div className="flex flex-col mt-3 sm:ml-4 sm:mt-0 ">
                  <div className="flex justify-between items-center mb-2 gap-5">
                    <div className="flex items-center gap-5">
                      <button>
                        <IconChevronLeft className="size-7" />
                      </button>
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 font-primary">
                        My Budget
                      </Dialog.Title>
                    </div>
                    <div>
                      <IconWallet className="h-5 w-5" />
                    </div>
                  </div>
                </div>
                <div className="border-b-2 border-b-gray-300 py-4 ml-5">
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Initial Day of the Month
                    </h3>
                    <p className="text-sm text-gray-500">
                      Enter first day to start each month...
                    </p>
                  </div>
                  <input
                    min={1}
                    max={31}
                    type="number"
                    placeholder="DD"
                    className="text-2xl border-none outline-none focus:ring-0 m-2 font-semibold"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-xl transition-all bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/70 sm:ml-3 sm:w-auto font-primary active:scale-95"
                      // onClick={() => setOpen(false)}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="border-b-2 border-b-gray-300 py-4 ml-5">
                  <div>
                    <h3 className="text-2xl font-semibold">Budget</h3>
                    <p className="text-sm text-gray-500">
                      Enter amount of money to this month...
                    </p>
                  </div>
                  <div className="m-2 flex items-center gap-2 text-3xl font-semibold">
                    <span>S/.</span>
                    <input
                      type="text"
                      placeholder="00.00"
                      className="text-3xl border-none outline-none focus:ring-0 w-full"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-xl transition-all bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/70 sm:ml-3 sm:w-auto font-primary active:scale-95"
                      // onClick={() => setOpen(false)}
                    >
                      Save
                    </button>
                  </div>
                </div>
                <div className="py-4 ml-5">
                  <div>
                    <h3 className="text-2xl font-semibold">Limit Categories</h3>
                    <p className="text-sm text-gray-500">
                      Enter amount limit of each category...
                    </p>
                  </div>
                  <div className="h-36 overflow-auto my-2">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center gap-2 m-2 justify-between ">
                        <div className="text-md font-semibold flex">
                          {category.name}
                        </div>
                        <div className=" flex items-center gap-2 border-b border-b-gray-300 font-semibold">
                          <span>S/.</span>
                          <input
                          disabled
                            // value={0}
                            // onChange={(e) => {
                            //   const newValue = e.target.value.replace(/,/g, '.');
                            //   if (!isNaN(parseFloat(newValue))) {
                            //     e.target.value = newValue;
                            //   }
                            // }}
                            min={0}
                            type="number"
                            step={0.01}
                            placeholder="00.00"
                            className="border-none outline-none focus:ring-0 w-28"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                    disabled
                      type="button"
                      className="inline-flex w-full justify-center rounded-xl transition-all bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/70 sm:ml-3 sm:w-auto font-primary active:scale-95"
                      // onClick={() => setOpen(false)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
