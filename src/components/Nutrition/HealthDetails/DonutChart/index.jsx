/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useSelector } from "react-redux";

export function DonutChart() {
  const chartRef = useRef(null);
  const totalValues = useSelector((state) => state.nutrition.totalValues);
  const caloriesRecommended = useSelector(
    (state) => state.nutrition.valuesRecommended?.cals || 0
  );
  const caloriesConsumed = useSelector(state => state.nutrition.totalValues?.total_cals || 0);

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, dataDonut);
    chart.render();

    chart.updateSeries([caloriesConsumed, caloriesRecommended]);
  }, [totalValues, caloriesRecommended, caloriesConsumed]);

  const dataDonut = {
    series: [caloriesConsumed, caloriesRecommended],
    colors: ["#000428", "#FDBA8C"],
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
    },
    stroke: {
      colors: ["transparent"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: 20,
            },
            total: {
              showAlways: true,
              show: true,
              label: "Calories Remaining",
              fontFamily: "Inter, sans-serif",
              formatter: function (w) {
                const res = w.globals.seriesTotals.reduce((a, b) => {
                  return b - a;
                }, 0);
                return res.toFixed(2) + " kcal";
              },
            },
            value: {
              show: true,
              fontFamily: "Inter, sans-serif",
              offsetY: -20,
              formatter: function (value) {
                return value + "k";
              },
            },
          },
          size: "80%",
        },
      },
    },
    grid: {
      padding: {
        top: -5,
      },
    },
    labels: ["Completed", "Total"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toFixed(2) + "kcal";
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "kcal";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };

  return <div id="donut-chart" ref={chartRef} className="text-sm font-primary"></div>;
}

export default DonutChart;
