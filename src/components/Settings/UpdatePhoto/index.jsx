import avatar from '../../../assets/avatar.svg'

export const UpdatePhoto = () => {
  return (
    <section className="flex flex-[2_2_0%] flex-col md:flex-row justify-between lg:gap-12 md:justify-normal py-5 border-b border-b-gray-300">
      <div className="py-2 md:w-[300px]">
        <h2 className="font-semibold text-base">Your Profile Photo</h2>
        <p className="text-sm text-[#4E4B4B] md:text-md">
          Update your public photo here to make it easier for people to
          recognize you
        </p>
      </div>
      <div className="py-5 md:p-0 flex gap-5 lg:gap-10 items-center justify-center">
        <div className="flex flex-col gap-3 items-center">
          <div className="size-28 lg:size-32 shadow-lg rounded-full p-1">
            <img
              src={avatar}
              alt="Profile"
              className="rounded-full size-full"
            />
          </div>
          <div>
            <button className="text-[#4E4B4B] bg-[#F0F0F0] px-6 py-2 rounded-md  hover:bg-[#F0F0F0]/70 font-semibold ">
              Delete
            </button>
          </div>
        </div>
        {/*Uso de dropzone de blowbite */}
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-30 md:h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-5 text-center">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
    </section>
  );
}
