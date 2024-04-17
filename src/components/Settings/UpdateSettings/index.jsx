export default function UpdateSettings() {
    return (
        <>
          <section class="flex justify-between gap-5 w-full items-center py-5 border-b border-b-gray-300">
            <div class="w-full flex-1 lg:flex-[3_3_0%]">
              <h2 class="font-semibold text-base">General Details</h2>
              <p class="text-sm text-[#4E4B4B] md:text-md">
                Update your photo and personal details here
              </p>
            </div>
            <div class="flex gap-3 md:gap-5 w-full flex-1 font-semibold tracking-wide">
              <button class="text-[#4E4B4B] bg-[#F0F0F0] flex-1 py-2 rounded-md  hover:bg-[#F0F0F0]/70">
                Cancel
              </button>
              <button class="bg-[#000428] text-white flex-1 rounded-md py-2 hover:bg-[#000428]/80">
                Save
              </button>
            </div>
          </section>
        </>
      );
}