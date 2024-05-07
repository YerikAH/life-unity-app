import profileBillie from '../../../assets/images/profileBillie.png';

export function Profile() {
  return (
    <>
      <section className="shadow-xl rounded-xl py-5 px-5 flex flex-col justify-between font-semibold h-auto bg-white lg:row-span-2 md:max-h-full">
        <div className="max-w-full px-6 flex flex-col items-center">
          <img
            className="mx-10 mt-10 mb-4 card-image object-fill rounded-[50%]"
            width="150"
            height="150"
            src={profileBillie}
            alt=""
          />

          <p className="text-xl font-semibold text-[#000428]">
            Bille Joe Amstrong
          </p>
          <p className="text-sm text-[#000428]">billie_joe@gmail.com</p>
        </div>
      </section>
    </>
  );
}
