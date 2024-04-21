import profileBillie from '../../../assets/img/profileBillie.png';

export default function Profile() {
  return (
    <>
      <section className="overflow-hidden">
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
