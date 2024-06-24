import { IconUser } from "@tabler/icons-react";
import { auth } from "../../../services/firebase";
import { useState, useEffect } from "react";
import { Image } from "../../shared/Image";

export function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    setIsLoading(true);
    const currentUser = auth.currentUser;
    setUser(currentUser);
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
          <Image user={user} width={64} height={64} isLoading={isLoading} />
          <p className="text-2xl font-semibold text-[#000428] font-primary">
            {user?.displayName}
          </p>
          <p className="text-sm text-gray-500 font-primary">{user?.email}</p>
        </div>
      </section>
    </>
  );
}
