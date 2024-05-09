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
          <form action="">
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
            <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-3 gap-5">
              <div className="flex justify-center items-center gap-3 md:col-span-5 col-span-3 w-full">
                <label htmlFor="" className="font-semibold">
                  Inicio:{" "}
                </label>
                <input
                  type="date"
                  className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                  placeholder="Select date"
                />
              </div>
              <div className="flex justify-center items-center gap-3 md:col-span-5 col-span-3 w-full">
                <label htmlFor="" className="font-semibold">
                  Tiempo:
                </label>
                <input
                  type="time"
                  id="time"
                  className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                  min="09:00"
                  max="18:00"
                  value="00:00"
                  required
                />

                <label htmlFor="">a</label>

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

              <div className="flex justify-center items-center gap-3 md:col-span-5 col-span-3 w-full">
                <label htmlFor="" className="font-semibold">
                  Fin:
                </label>
                <input
                  type="date"
                  className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                  placeholder="Select date"
                />
              </div>
              <div className="md:col-span-5 col-span-3 w-full">
                <textarea
                  name=""
                  id=""
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray outline-none focus:border-[#E8AA42] focus:ring-0 focus:border-2 h-20"
                  placeholder="Descripción del Evento"
                ></textarea>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
