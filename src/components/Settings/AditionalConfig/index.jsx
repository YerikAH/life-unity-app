import googleLogo from "../../../assets/googleLogo.svg";
import { auth } from "../../../services/firebase";
import { useEffect, useState } from "react";
import { loginWithGoogle } from "../../../services/auth";

export const AditionalConfig = () => {
  const [withGoogle, setWithGoogle] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      const providerData = auth.currentUser.providerData;
      if (providerData.length > 0) {
        if (providerData[0].providerId === "google.com") {
          setWithGoogle(true);
        }
      }
    }
  }, []);

  const loginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      <section className="py-6">
        <div className="flex flex-col gap-5 items-start ">
          <div className="flex items-center justify-between w-full gap-5 text-right">
            <div className="w-20">
              <img src={googleLogo} alt="" className="w-full" />
            </div>
            {withGoogle ? (
              <span className="bg-[#E7F8F0] text-[#75D6A9] p-2 rounded-md font-semibold font-primary">
                Connected
              </span>
            ) : (
              <span className="bg-[#F8E7E7] text-[#D67575] p-2 rounded-md font-semibold font-primary">
                Not Connected
              </span>
            )}
          </div>
          <div className="flex items-center justify-between w-full gap-5 font-primary">
            <div>
              <h3 className="font-semibold text-lg font-primary">Google</h3>
              <p className="text-gray-500 font-primary">
                Use Google to sign in to your acount
              </p>
            </div>
            {!withGoogle && (
              <button
                className="text-[16px] rounded-md bg-[#000428] text-white py-3 px-5 font-semibold flex-none font-primary"
                onClick={loginGoogle}
              >
                Connect to Google
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
