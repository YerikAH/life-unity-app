import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { data } from "./data";
import { IconChevronDown, IconUsersGroup } from "@tabler/icons-react";

export function ChartCalories() {
  const chartRef = useRef(null);

  const getChartOptions = () => {
    return data;
  };

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, getChartOptions());
    chart.render();
  }, []);

  return (
    <>
      <section className="shadow-xl rounded-xl px-5 flex flex-col justify-center font-semibold h-auto bg-white lg:row-start-2 lg:col-start-2">
        <div className="max-w-sm w-full bg-white rounded-lg dark:bg-gray-800 p-4">
          <div className="flex items-center justify-between border-b border-gray dark:border-gray-700 pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center ">
                <IconUsersGroup stroke={2} />
              </div>
              <div>
                <h5 className="leading-none text-xl font-bold text-gray-900 dark:text-white pb-1">
                  Stats of progress
                </h5>
              </div>
            </div>
              <div className="flex justify-between items-center">
                {/* <!-- Button --> */}
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="lastDaysdropdown"
                  data-dropdown-placement="bottom"
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white gap-2"
                  type="button">
                  Last 7 days
                  <IconChevronDown stroke={2} />
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="lastDaysdropdown"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Yesterday
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Today
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Last 7 days
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Last 30 days
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Last 90 days
                      </a>
                    </li>
                  </ul>
                </div>
            </div>
          </div>

          <div id="column-chart" ref={chartRef}></div>
        </div>
      </section>
    </>
  );
}
