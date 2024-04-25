  import avatar from '../../../assets/avatar.svg'

export const SettingsHeader = () => {
  return (
    <>
      <header>
        <div className="relative h-24">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#E8AA42_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>
        <div className="flex items-start justify-between  lg:h-20 flex-col lg:flex-row">
          <div className="flex gap-5 h-20 lg:flex-[3_3_0%]">
            <div className="bg-white p-1 rounded-full shadow-lg size-36 md:size-40 relative bottom-24 ">
              <img src={avatar} alt="" className="size-full" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Elena Suarez</h1>
              <p className="text-gray-500">easp0104@gmail.com</p>
            </div>
          </div>
          <div className="w-full md:w-auto flex flex-1 flex-colgap-2 flex-col gap-2 py-5 md:py-0 border-b border-b-gray-300 md:border-0">
            <label htmlFor="full-name" className="font-semibold">
              Change your Timezone
            </label>
            <div className="flex w-full">
              <input
                type="time"
                id="time"
                className="flex-shrink-0 rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block text-sm border-gray-300 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min="09:00"
                max="18:00"
                defaultValue="00:00"
                required
              />
              <select
                id="timezones"
                name="timezone"
                className="flex-1 rounded-none rounded-e-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block text-sm border-gray-300 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required>
                <option defaultValue="America/New_York">EST - GMT-5 (New York)</option>
                <option defaultValue="America/Los_Angeles">
                  PST - GMT-8 (Los Angeles)
                </option>
                <option defaultValue="Europe/London">GMT - GMT+0 (London)</option>
                <option defaultValue="Europe/Paris">CET - GMT+1 (Paris)</option>
              </select>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
