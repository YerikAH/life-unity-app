/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { IconX } from "@tabler/icons-react";

export function EventModal({ handleCloseModal }) {
  return (
    <>
      <div
        id="modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="inset-0 fixed bg-black/30 z-20">
          <div className="fixed inset-0 w-[80%] flex items-center justify-center mx-auto">
            <div className="m-auto flex flex-col items-center gap-3 pb-10 bg-white rounded-2xl p-6">
              <button onClick={() => handleCloseModal()}>
                <IconX stroke={2} />
              </button>
              <div className="flex w-full items-center justify-center relative">
                <form className="h-[50vh] border flex">
                  <input
                    name="birth"
                    type="date"
                    className="w-full border-x-0 border-t-0 outline-none focus:border-b-[#E8AA42] focus:ring-0 border-b-2 border-b-gray"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
