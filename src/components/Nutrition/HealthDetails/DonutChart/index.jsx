
  import { useEffect, useRef } from 'react';
  import ApexCharts from 'apexcharts';
  import { dataDonut } from './data';
  
  export function DonutChart() {
    const chartRef = useRef(null);
  
    const getChartOptions = () => {
      return dataDonut;
    }  
  
    useEffect(() => {
      const chart = new ApexCharts(chartRef.current, getChartOptions());
      chart.render();
    }, []);
  
    return <div id="donut-chart" ref={chartRef} className='py-6'></div>;
  }
  
  export default DonutChart;