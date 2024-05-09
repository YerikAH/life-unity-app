import { useState } from "react";
import profileBillie from "../../../assets/images/profileBillie.png";
import { DATA } from "./api";
import { useEffect } from "react";

export function Leader() {
  const [dataScore, setDataScore] = useState([]);

  const fetchDataScore = () => {
    // Ordenar DATA por puntaje de mayor a menor
    const sortedData = [...DATA].sort((a, b) => b.score - a.score);
    // Tomar los primeros cuatro elementos del array ordenado
    setDataScore(sortedData.slice(0, 4));
  };

  useEffect(() => {
    fetchDataScore();
  }, []);

  return (
    <>
      <section className="shadow-xl rounded-xl py-5 px-5 flex flex-col justify-between font-semibold h-auto bg-white lg:row-span-2 md:max-h-full">
        <div className="flex justify-between items-center pb-3 pt-3">
          <h3 className="font-semibold text-xl text-[#000428]">Leader Board</h3>
          <a className="text-[#000428] font-bold text-sm px-1 py-2.5 text-center inline-flex items-center">
            English
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </a>
        </div>
        <div className="relative overflow-hidden rounded-xl">
          <table className="w-full sm:text-sm xl:text-[11px] text-left rtl:text-right text-[#000428]">
            <thead className="text-xs text-[#000428] bg-white">
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
              {dataScore.map((item, index) => (
                <tr key={item.id} className="bg-white text-[#000428]">
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold whitespace-nowrap"
                  >
                    <div className="flex items-center gap-3 h-full">
                      <img
                        className="rounded-[50%]"
                        width="35"
                        height="35"
                        src={profileBillie}
                        alt=""
                      />
                      <span className="font-semibold">{item.name}</span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex-1">
                      <div className="flex gap-1 items-center">
                        <svg
                          className="fill-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M11.375 6.22l-5 4a1 1 0 0 0 -.375 .78v6l.006 .112a1 1 0 0 0 1.619 .669l4.375 -3.501l4.375 3.5a1 1 0 0 0 1.625 -.78v-6a1 1 0 0 0 -.375 -.78l-5 -4a1 1 0 0 0 -1.25 0z" />
                        </svg>
                        <span>{index + 1}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
