import { IconUser } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { Image } from "../../shared/Image";
import { obtenerUsuario } from "../../../utils/consultasDb";

export function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    setIsLoading(true);
    const currentUser = await obtenerUsuario();
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
          <h3 className="font-bold text-xl text-[#000428] font-primary">
            My Profile
          </h3>
          <IconUser className="text-gray-900" />
        </div>
        <div className="w-full grid place-items-center mt-6">
          <div className="max-w-[275px] w-full rounded-full max-h-[300px] flex justify-center">
            <Image user={user} width={40} height={40} isLoading={isLoading} />
          </div>
          <p className="text-2xl font-semibold text-[#000428] font-primary">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-sm text-gray-500 font-primary">{user?.email}</p>
        </div>
      </section>
    </>
  );
}
