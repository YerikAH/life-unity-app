import profileBillie from "../../../assets/images/profileBillie.png";
import {IconArrowBadgeUpFilled, IconArrowBadgeDownFilled} from "@tabler/icons-react"

export function Leader() {
  return (
    <>
      <section className="shadow-xl rounded-xl py-5 px-5 flex flex-col justify-center font-semibold bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center md:text-left w-full">
            Leader Board
          </h2>
        </div>
        <div className="rounded-xl">
          <table className="w-full sm:text-sm xl:text-[14px] text-left  text-[#000428]">
            <thead className="text-[16px] text-[#000428] bg-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-[#000428]">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold whitespace-nowrap">
                  <div className="flex items-center gap-3 h-full">
                    <img
                      className="rounded-[50%]"
                      width="35"
                      height="35"
                      src={profileBillie}
                      alt=""
                    />
                    <span className="font-semibold">Howard Grimsley</span>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="flex-1">
                    <div className="flex gap-1 items-center">
                        <IconArrowBadgeUpFilled size={24} stroke={1.5} />
                      <span>1</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">198</td>
              </tr>
              <tr className="bg-white text-[#000428]">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold whitespace-nowrap">
                  <div className="flex items-center gap-3 h-full">
                    <img
                      className="rounded-[50%]"
                      width="35"
                      height="35"
                      src={profileBillie}
                      alt=""
                    />
                    <span className="font-semibold">Major Speller</span>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="flex-1">
                    <div className="flex gap-1 items-center">
                    <IconArrowBadgeUpFilled size={24} stroke={1.5} />
                      <span>2</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">189</td>
              </tr>
              <tr className="bg-white border-b text-[#000428]">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold whitespace-nowrap">
                  <div className="flex items-center gap-3 h-full">
                    <img
                      className="rounded-[50%]"
                      width="35"
                      height="35"
                      src={profileBillie}
                      alt=""
                    />
                    <span className="font-semibold">Marquis Lowe</span>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="flex-1">
                    <div className="flex gap-1 items-center">
                    <IconArrowBadgeDownFilled size={24} stroke={1.5} />
                      <span>3</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">187</td>
              </tr>
              <tr className="bg-white text-[#000428]">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold whitespace-nowrap">
                  <div className="flex items-center gap-3 h-full">
                    <img
                      className="rounded-[50%]"
                      width="35"
                      height="35"
                      src={profileBillie}
                      alt=""
                    />
                    <span className="font-semibold">Chandra Mattis</span>
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="flex-1">
                    <div className="flex gap-1 items-center">
                    <IconArrowBadgeUpFilled size={24} stroke={1.5} />
                      <span>8</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">161</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
