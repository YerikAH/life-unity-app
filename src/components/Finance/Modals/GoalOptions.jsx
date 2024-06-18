/* eslint-disable react/prop-types */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IconX, IconReload } from "@tabler/icons-react";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";


// { open = true, setOpen, id, type }
// si es edit el type cada uno tiene un value
export const GoalOptions = () => {
  const type = "add";
  const [open, setOpen] = useState(true);
  const [gradient, setGradient] = useState(getRandomGradient());
  const [value, setValue] = useState(0);
  const [money, setMoney] = useState("");

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    setMoney(newValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    const newValue = event.target.value === '' ? 0 : parseFloat(event.target.value.replace(/[,]/g, ''));
    if (!isNaN(newValue)) {
      setValue(newValue);
      setMoney(event.target.value);
    }
  };

  const handleButtonClick = () => {
    setGradient(getRandomGradient());
  };

  function getRandomGradient() {
    const color1 = Math.floor(Math.random() * 16777215).toString(16);
    const color2 = Math.floor(Math.random() * 16777215).toString(16);
    return `linear-gradient(135deg, #${color1}, #${color2})`;
  }

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
                    {type.toUpperCase()} {type === "add" ? "NEW" : "YOUR"} GOAL
                  </Dialog.Title>
                  <p className="text-sm text-gray-500  font-primary">
                    {type === "add"
                      ? "Complete the form to create a new goal"
                      : "Change the information of your goal"}
                  </p>
                  <form className="my-3">
                    <div>
                      <div className="flex gap-2 items-center">
                        <span className="font-semibold text-4xl">S./</span>
                        <input
                          onChange={handleInputChange}
                          value={money}
                          type="text"
                          placeholder="0.00"
                          className="border-none outline-none focus:ring-0 text-4xl"
                        />
                      </div>
                      <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mb: 1 }}
                        alignItems="center">
                        <Slider
                          min={0}
                          max={1000000}
                          step={0.01}
                          aria-label="Volume"
                          value={value}
                          onChange={handleChange}
                          color="#2563EB"
                        />
                      </Stack>
                    </div>

                    <div className="flex gap-5 my-4 flex-col md:flex-row">
                      <div className="md:w-32">
                        <label htmlFor="icon">
                          Icon{" "}
                          <span className="text-xs">
                            (use <kbd>win + .</kbd>)
                          </span>
                        </label>
                        <input
                          // value=""
                          id="icon"
                          type="text"
                          className="w-full border border-gray-200 rounded-xl p-2 mt-2"
                          placeholder="Icon Image"
                        />
                      </div>
                      <div className="md:flex-1">
                        <label htmlFor="title">Title</label>
                        <input
                          // value=""
                          id="title"
                          type="text"
                          className="w-full border border-gray-200 rounded-xl p-2 mt-2"
                          placeholder="Category Title"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 my-4 flex-col md:flex-row">
                      <div className="md:w-32">
                        <div className="flex items-center gap-2">
                          <label htmlFor="color">Color</label>
                          <button
                            id="color"
                            type="button"
                            onClick={handleButtonClick}>
                            <IconReload className="size-4" />
                          </button>
                        </div>
                        <div
                          style={{ background: gradient }}
                          className="flex gap-5 my-4 flex-col md:flex-row w-full border border-gray-200 rounded-xl p-2 mt-2 h-10"></div>
                      </div>
                      <div className="md:flex-1">
                        <label htmlFor="title">
                          Date Limit <span className="text-xs">(Optional)</span>
                        </label>
                        <input
                          // value=""
                          id="title"
                          type="date"
                          className="w-full border border-gray-200 rounded-xl p-2 mt-2"
                          placeholder="Category Title"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="mt-5 flex justify-end items-center">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-xl transition-all bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/70 sm:ml-3 sm:w-auto font-primary active:scale-95"
                    onClick={() => setOpen(false)}>
                    Save {type === "add" ? "New Goal" : "Changes"}
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
