/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { IconX } from "@tabler/icons-react";

export function EventModal({ handleCloseModal }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-20 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
          <div className="w-full">
            <button onClick={() => handleCloseModal()}>
              <IconX stroke={2} />
            </button>
          </div>
          <div className="flex justify-between items-center mb-3">
            <input
              className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray text-3xl"
              type="text"
              placeholder="Agregar Título"
            />
            <button className="flex items-center justify-end gap-2 right-0 bg-yellow px-5 py-2 rounded-2xl font-semibold">
              Save
            </button>
          </div>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-2">
            <div className="w-full">
              <input
                type="date"
                className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                placeholder="Select date"
              />
            </div>
            <div className="w-full">
              <input
                type="time"
                id="time"
                className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                min="09:00"
                max="18:00"
                value="00:00"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <p>a</p>
            </div>
            <div className="w-full flex justify-center items-center">
              <input
                type="time"
                id="time"
                className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                min="09:00"
                max="18:00"
                value="00:00"
                required
              />
            </div>
            <div className="w-full">
              <input
                type="date"
                className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                placeholder="Select date"
              />
            </div>
            <div className="col-span-5 w-full">
              <textarea name="" id=""></textarea>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="inset-0 fixed bg-black/30 z-20">
        <div className="fixed inset-0 w-[70%] flex items-center justify-center mx-auto">
          <div className="m-auto flex flex-col items-center gap-3 pb-10 bg-white rounded-2xl p-6">
            <div className="flex justify-end mb-2">
              <button onClick={() => handleCloseModal()}>
                <IconX stroke={2} />
              </button>
            </div>

            <div className="relative flex justify-between w-full gap-3 mb-3">
              <input
                className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray text-3xl"
                type="text"
                placeholder="Agregar Título"
              />
              <button className="flex items-center justify-end gap-2 right-0 bg-yellow px-5 py-2 rounded-lg font-semibold">
                save
              </button>
            </div>

            <div className="flex w-full gap-4">
              <div className="max-w-sm">
                <input
                  type="date"
                  className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                  placeholder="Select date"
                />
              </div>

              <div className="">
                <input
                  type="time"
                  id="time"
                  className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                  min="09:00"
                  max="18:00"
                  value="00:00"
                  required
                />
              </div>

              <div className="">
                <p className="font-semibold">A</p>
              </div>

              <div className="">
                <input
                  type="time"
                  id="time"
                  className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                  min="09:00"
                  max="18:00"
                  value="00:00"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
