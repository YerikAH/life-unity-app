import { IconUser } from "@tabler/icons-react";
import { auth } from "../../../services/firebase";
import { useState, useEffect } from "react";

export function Profile() {
  const [photo, setPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    setPhoto(false);
    setIsLoading(true);
    const currentUser = auth.currentUser;
    setUser(currentUser);
    if (currentUser?.photoURL) {
      setPhoto(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <section className="shadow border rounded-xl py-5 px-5  bg-white order-first xl:order-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-[#000428] font-primary">My Profile</h3>
          <IconUser className='text-gray-900' />
        </div>
        <div className="w-full grid place-items-center mt-6">
          {isLoading ? null : photo ? (
            <img
              className="object-cover size-56 rounded-full mb-5"
              src={user?.photoURL}
              alt="avatar"
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
                <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
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
                  <path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path>
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
          <p className="text-2xl font-semibold text-[#000428] font-primary">
            {user?.displayName}
          </p>
          <p className="text-sm text-gray-500 font-primary">{user?.email}</p>
        </div>
      </section>
    </>
  );
}
