import profileBillie from '../../../assets/img/profileBillie.png';

export default function Leader() {
  return (
    <>
      <section className="overflow-hidden">
        { /* bg-[#F5F7FB] */}
        <div className="max-w-full px-6 pb-8 bg-white rounded-lg">
          <div className="flex justify-between items-center pb-3 pt-3">
            <h3 className="font-semibold text-xl text-[#000428]">
              Leader Board
            </h3>
            <a className="text-[#000428] font-bold text-sm px-1 py-2.5 text-center inline-flex items-center">
              English
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </a>
          </div>

          <div className="relative overflow-hidden rounded-xl">
            <table className="w-full sm:text-sm xl:text-[11px] text-left rtl:text-right text-[#000428]">
              <thead className="text-xs text-[#000428] bg-white">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white text-[#000428]">
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold whitespace-nowrap"
                  >
                    <div className="flex items-center gap-3 h-full">
                      <img
                        className="rounded-[50%]"
                        width="35"
                        height="35"
                        src={profileBillie}
                        alt=""
                      />
                      <span className="font-semibold">Howard Grimsley</span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex-1">
                      <div className="flex gap-1 items-center">
                        <svg
                          className="fill-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          // eslint-disable-next-line react/jsx-no-duplicate-props, react/no-unknown-property
                          class="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-up"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M11.375 6.22l-5 4a1 1 0 0 0 -.375 .78v6l.006 .112a1 1 0 0 0 1.619 .669l4.375 -3.501l4.375 3.5a1 1 0 0 0 1.625 -.78v-6a1 1 0 0 0 -.375 -.78l-5 -4a1 1 0 0 0 -1.25 0z" />
                        </svg>
                        <span>1</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">198</td>
                </tr>
                <tr className="bg-white text-[#000428]">
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold whitespace-nowrap"
                  >
                    <div className="flex items-center gap-3 h-full">
                      <img
                        className="rounded-[50%]"
                        width="35"
                        height="35"
                        src={profileBillie}
                        alt=""
                      />
                      <span className="font-semibold">Major Speller</span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex-1">
                      <div className="flex gap-1 items-center">
                        <svg
                          className="fill-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          // eslint-disable-next-line react/no-unknown-property
                          class="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-up"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M11.375 6.22l-5 4a1 1 0 0 0 -.375 .78v6l.006 .112a1 1 0 0 0 1.619 .669l4.375 -3.501l4.375 3.5a1 1 0 0 0 1.625 -.78v-6a1 1 0 0 0 -.375 -.78l-5 -4a1 1 0 0 0 -1.25 0z" />
                        </svg>
                        <span>2</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">189</td>
                </tr>
                <tr className="bg-white border-b text-[#000428]">
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold whitespace-nowrap"
                  >
                    <div className="flex items-center gap-3 h-full">
                      <img
                        className="rounded-[50%]"
                        width="35"
                        height="35"
                        src={profileBillie}
                        alt=""
                      />
                      <span className="font-semibold">Marquis Lowe</span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex-1">
                      <div className="flex gap-1 items-center">
                        <svg
                          className="fill-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          // eslint-disable-next-line react/no-unknown-property
                          class="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-down"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z" />
                        </svg>
                        <span>3</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">187</td>
                </tr>
                <tr className="bg-white text-[#000428]">
                  <th
                    scope="row"
                    className="px-6 py-4 font-bold whitespace-nowrap"
                  >
                    <div className="flex items-center gap-3 h-full">
                      <img
                        className="rounded-[50%]"
                        width="35"
                        height="35"
                        src={profileBillie}
                        alt=""
                      />
                      <span className="font-semibold">Chandra Mattis</span>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    <div className="flex-1">
                      <div className="flex gap-1 items-center">
                        <svg
                          className="fill-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          // eslint-disable-next-line react/no-unknown-property
                          class="icon icon-tabler icons-tabler-filled icon-tabler-arrow-badge-up"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M11.375 6.22l-5 4a1 1 0 0 0 -.375 .78v6l.006 .112a1 1 0 0 0 1.619 .669l4.375 -3.501l4.375 3.5a1 1 0 0 0 1.625 -.78v-6a1 1 0 0 0 -.375 -.78l-5 -4a1 1 0 0 0 -1.25 0z" />
                        </svg>
                        <span>8</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">161</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
