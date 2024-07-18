/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useSelector } from "react-redux";

export function ChartDash() {
  const chartRef = useRef(null);
  const totalValues = useSelector((state) => state.nutrition.totalValues);
  const valuesRecommended = useSelector(
    (state) => state.nutrition.valuesRecommended
  );

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, dataRadial);
    chart.render();

    const carbsPercentage =
      (totalValues.total_carbs / valuesRecommended.carbs) * 100;
    const proteinPercentage =
      (totalValues.total_protein / valuesRecommended.protein) * 100;
    const calPercentage = (totalValues.total_cals / valuesRecommended.cals) * 100;
    const fatPercentage = (totalValues.total_fat / valuesRecommended.fat) * 100;
    const waterPercentage =
      (totalValues.total_water / valuesRecommended.water_cups) * 100;

    chart.updateSeries([
      carbsPercentage,
      proteinPercentage,
      calPercentage,
      fatPercentage,
      waterPercentage,
    ]);
  }, [totalValues]);

  const dataRadial = {
    series: [0, 0, 0, 0, 0],
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#A91D3A", "#240A34"],
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
    labels: ["Carbs", "Protein", "Calories", "Fat", "Water"],
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "M PLUS Rounded 1c",
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
          return value.toFixed(2) + "%";
        },
      },
    },
  };

  return <div id="radial-chart" ref={chartRef} className="text-sm"></div>;
}

export default ChartDash;
