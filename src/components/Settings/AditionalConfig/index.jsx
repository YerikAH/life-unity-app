import googleLogo from '../../../assets/google.svg'

export const AditionalConfig = () => {
  return (
    <>
      <section className="pt-5">
        <div className="flex flex-col gap-5 items-start ">
          <div className="flex items-center justify-between w-full gap-5 text-right">
            <div className="w-20">
              <img src={googleLogo} alt="" className="w-full" />
            </div>
            <span className="hidden bg-[#E7F8F0] text-[#75D6A9] p-2 rounded-md font-semibold">
              Connected
            </span>
            <span className="bg-[#F8E7E7] text-[#D67575] p-2 rounded-md font-semibold">
              Not Connected
            </span>
          </div>
          <div className="flex items-center justify-between w-full gap-5">
            <div>
              <h3 className="font-semibold text-lg">Google</h3>
              <p className="text-gray-500">
                Use Google to sign in to your acount
              </p>
            </div>
            <button className="text-[14px] rounded-md bg-[#000428] text-white py-3 px-7 font-semibold flex-none">
              Connect to Google
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
