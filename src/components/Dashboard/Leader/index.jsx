import {
  IconArrowBadgeUpFilled,
  IconArrowBadgeDownFilled,
} from "@tabler/icons-react";
import { useState } from "react";
import { data } from "./data";
import { useEffect } from "react";
import { auth } from "../../../services/firebase";

export function Leader() {
  const [dataScore, setDataScore] = useState([]);
  const [photo, setPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [up, setUp] = useState(true);

  const fetchDataScore = () => {
    const sortedData = [...data, user].sort((a, b) => {
      const result = b.score - a.score;
      if (b.score > a.score) {
        a.range = "down";
      } else {
        a.range = "up";
      }
      return result;
    });
    setDataScore(sortedData);
  };

  const fetchUser = async () => {
    setPhoto(false);
    setIsLoading(true);
    const currentUser = auth.currentUser;
    currentUser.score = 100;
    setUser(currentUser);
    if (currentUser?.photoURL) {
      setPhoto(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchDataScore();
    }
  }, [user]);

  return (
    <>
      <section className="shadow-xl rounded-xl py-5 px-5 flex flex-col justify-center font-semibold bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-center md:text-left w-full">
            Leader Board
          </h2>
        </div>
        <div className="rounded-xl">
          <div style={{ height: "300px", overflow: "auto" }}>
            <table className="w-full xl:text-[14px] text-left text-[#000428]">
              <thead className="text-md text-[#000428] bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 hidden md:block">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataScore.map((item, index) => (
                  <tr key={index} className="bg-white text-[#000428]">
                    <th
                      scope="row"
                      className="px-6 py-2 font-bold whitespace-nowrap w-full">
                      <div className="flex items-center gap-3 h-full">
                        {!item.name ? (
                          <img
                            src={user?.photoURL}
                            className="size-8 rounded-full"
                          />
                        ) : (
                          <svg
                            viewBox="0 0 36 36"
                            fill="none"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30">
                            <mask
                              id=":ri:"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="36"
                              height="36">
                              <rect
                                width="36"
                                height="36"
                                rx="72"
                                fill="#FFFFFF"></rect>
                            </mask>
                            <g mask="url(#:ri:)">
                              <rect
                                width="36"
                                height="36"
                                fill="#cf023b"></rect>
                              <rect
                                x="0"
                                y="0"
                                width="36"
                                height="36"
                                transform="translate(-4 8) rotate(168 18 18) scale(1)"
                                fill="#f4a854"
                                rx="36"></rect>
                              <g transform="translate(0 4) rotate(-8 18 18)">
                                <path
                                  d="M13,19 a1,0.75 0 0,0 10,0"
                                  fill="#000000"></path>
                                <rect
                                  x="11"
                                  y="14"
                                  width="1.5"
                                  height="2"
                                  rx="1"
                                  stroke="none"
                                  fill="#000000"></rect>
                                <rect
                                  x="23"
                                  y="14"
                                  width="1.5"
                                  height="2"
                                  rx="1"
                                  stroke="none"
                                  fill="#000000"></rect>
                              </g>
                            </g>
                          </svg>
                        )}
                        <span className="font-semibold">
                          {item.name || user?.displayName}
                        </span>
                      </div>
                    </th>
                    <td className="px-6 py-4 hidden md:block">
                      <div className="flex-1">
                        <div className="flex gap-1 items-center">
                          {item.range === "up" ? (
                            <IconArrowBadgeUpFilled size={20} />
                          ) : (
                            <IconArrowBadgeDownFilled size={20} />
                          )}
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
          <div className="border-t-2 border-gray flex justify-between">
            <div className="px-6 py-2 font-bold flex gap-5 items-center">
              <div className="flex items-center gap-3 size-12">
                {isLoading ? null : photo ? (
                  <img
                    src={user?.photoURL}
                    alt="avatar"
                    className="size-full object-cover rounded-full"
                  />
                ) : (
                  <svg
                    viewBox="0 0 36 36"
                    fill="none"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    className="size-full">
                    <mask
                      id=":r80:"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="36"
                      height="36">
                      <rect
                        width="36"
                        height="36"
                        rx="72"
                        fill="#FFFFFF"></rect>
                    </mask>
                    <g mask="url(#:r80:)">
                      <rect width="36" height="36" fill="#000428"></rect>
                      <rect
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                        transform="translate(-5 9) rotate(189 18 18) scale(1)"
                        fill="#f9a826"
                        rx="36"></rect>
                      <g transform="translate(-5 4.5) rotate(9 18 18)">
                        <path
                          d="M13,19 a1,0.75 0 0,0 10,0"
                          fill="#000000"></path>
                        <rect
                          x="10"
                          y="14"
                          width="1.5"
                          height="2"
                          rx="1"
                          stroke="none"
                          fill="#000000"></rect>
                        <rect
                          x="24"
                          y="14"
                          width="1.5"
                          height="2"
                          rx="1"
                          stroke="none"
                          fill="#000000"></rect>
                      </g>
                    </g>
                  </svg>
                )}
              </div>
              <span className="font-semibold">{user?.displayName}</span>
            </div>
            {/* cambiar el score segun redux de habitos los puntos */}
            <span className="px-6 py-4 mr-4">{user?.score}</span>
          </div>
        </div>
      </section>
    </>
  );
}