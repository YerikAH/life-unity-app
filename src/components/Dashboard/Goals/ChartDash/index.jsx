/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useSelector } from "react-redux";

export function ChartDash() {
  const chartRef = useRef(null);
  const totalValues = useSelector((state) => state.nutrition.totalValues);
  const caloriesRecommended = useSelector(
    (state) => state.nutrition.valuesRecommended?.cal || 0
  );
  const caloriesConsumed = useSelector(
    (state) => state.nutrition.totalValues?.totalCal || 0
  );

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, dataRadial);
    chart.render();

    chart.updateSeries([caloriesConsumed, caloriesRecommended]);
  }, [totalValues, caloriesRecommended, caloriesConsumed]);

  const dataRadial = {
    series: [caloriesConsumed, caloriesRecommended],
    colors: ["#000428", "#FDBA8C"],
    chart: {
      height: "380px",
      width: "100%",
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        track: {
          background: "#E5E7EB",
        },
        dataLabels: {
          show: false,
        },
        hollow: {
          margin: 0,
          size: "32%",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -23,
        bottom: -20,
      },
    },
    labels: ["Completed", "Total"],
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
  };

  return <div id="donut-chart" ref={chartRef} className="text-sm"></div>;
}

export default ChartDash;