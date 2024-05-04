import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { useSelector } from "react-redux";

export function DonutChart() {
  const chartRef = useRef(null);
  const totalValues = useSelector((state) => state.nutrition.totalValues);

  const caloriesRecommended = useSelector(
    (state) => state.nutrition.valuesRecommended?.cal || 0
  );

  const caloriesConsumed = useSelector(state => state.nutrition.totalValues?.totalCal || 0);

  // Asegúrate de que caloriesRecommended y caloriesConsumed sean números válidos
  const series = [
    isNaN(caloriesConsumed) ? 0 : caloriesConsumed,
    isNaN(caloriesRecommended) ? 0 : caloriesRecommended
  ];

  useEffect(() => {
    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, dataDonut);
      chart.render();
    }
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      ApexCharts.exec(chartRef.current.id, 'updateSeries', [series]);
    }
  }, [totalValues]);

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
                return res.toFixed(2) + " cal";
              },
            },
            //es para mostrar el valor de la serie
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
        top: -2,
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
    //yaxis cuando pasa por encima el mouse
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "cal";
        },
      },
    },
    //xaxis cuando pasa por encima el mouse
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "cal";
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

  return <div id="donut-chart" ref={chartRef} className="py-6"></div>;
}

export default DonutChart;
