import {
  IconArrowBadgeUpFilled,
  IconArrowBadgeDownFilled,
  IconGraph,
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
    <section className="shadow rounded-xl py-5  flex flex-col justify-center font-semibold bg-white border">
      <div className="flex justify-between items-center mb-4 px-5">
        <h2 className="text-xl font-bold text-center md:text-left w-full font-primary">
          Leader Board
        </h2>
        <IconGraph className="text-gray-900" />
      </div>
      <div >
        <div>
          <div className="grid justify-between grid-cols-3 w-full border-b border-gray-200 px-5 py-2">
            <h2 className="font-primary font-bold text-left">Name</h2>
            <h2 className="font-primary font-bold text-right">Rank</h2>
            <h2 className="font-primary font-bold text-right">Score</h2>
          </div>
          <div className="grid gap-2 h-[300px] overflow-auto py-4">
            {dataScore.map((item, idx) => (
              <div key={item.name} className="grid grid-cols-3 gap-2 justify-between px-5">
                <div className="flex gap-2 items-center">
                  <img
                    src={user?.photoURL}
                    className="size-8 rounded-full"
                  />
                  <p className="font-primary text-sm truncate text-gray-500"> {item.name || user?.displayName}</p>
                </div>
                <div className="flex justify-end items-center">
                  {item.range === "up" ? (
                    <IconArrowBadgeUpFilled size={16} className="text-gray-500" />
                  ) : (
                    <IconArrowBadgeDownFilled size={16} className="text-gray-500" />
                  )}
                  <p className="font-primary text-sm truncate text-gray-500 text-right">{idx + 1}</p>
                </div>
                <p className="font-primary text-sm truncate text-gray-500 text-right">{item.score}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-gray flex justify-between items-center pt-4">
          <div className="px-5 font-bold flex gap-5 items-center">
            <div className="flex items-center gap-3 size-10">
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
            <span className="font-semibold font-primary text-sm">{user?.displayName}</span>
          </div>
          {/* cambiar el score segun redux de habitos los puntos */}
          <span className="px-6 font-primary text-sm">{user?.score}</span>
        </div>
      </div>
    </section>
  );
}