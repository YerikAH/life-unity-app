import { jwtDecode } from "jwt-decode";
import googleLogo from "../../../assets/googleLogo.svg";
import { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { obtenerUsuario, updateUser } from "../../../utils";
export const AditionalConfig = () => {
  const [withGoogle, setWithGoogle] = useState(false);
  const [error, setError] = useState(false);

  useEffect( () => {
    const checkGoogle = async () => {
      const user =  await obtenerUsuario();
      if (user?.provider ==="google"){
        setWithGoogle(true);
      }
    }
    checkGoogle();
  }, []);

  const loginGoogle = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const form = new FormData();
    form.append("first_name", decoded.given_name);
    form.append("last_name", decoded.family_name);
    form.append("username", decoded.name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9@.+_-]/g, ""));
    form.append("email", decoded.email);
    form.append("password", decoded.sub);
    form.append("is_active", true);
    try {
      const imageResponse = await fetch(decoded.picture);
      const imageBlob = await imageResponse.blob();
      const imageFile = new File([imageBlob], "profile_picture.jpg", {
        type: "image/jpeg",
      });
      form.append("image", imageFile);
      const userCreated = await updateUser(form);
      if (userCreated.error) {
        setError(true);
        return;
      }
      setError(false);
    } catch (error) {
      setError(true);
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
          <div className="flex items-center justify-between w-full gap-5 font-primary flex-col md:flex-row">
            <div>
              <h3 className="font-semibold text-lg font-primary">Google</h3>
              <p className="text-gray-500 font-primary">
                Use Google to sign in to your acount
              </p>
            </div>
            {!withGoogle && (
              <div className="w-full flex md:justify-end justify-center">
              <GoogleLogin
                theme="filled_black"
                size="large"
                shape="circle"
                width="275px"
                logo_alignment="center"
                onSuccess={async (credentialResponse) => {
                  await loginGoogle(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            )}
            {
              error && (
                <div className="w-fit bg-red-100 text-red-500 p-2 rounded-md font-semibold font-primary text-center md:text-right">
                  Error al conectar con google, intente de nuevo
                </div>
              )
            }
          </div>
        </div>
      </section>
    </>
  );
};
