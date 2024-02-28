import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ chartData }) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        yAlign: "top",
        xAlign: "left",
        caretPadding: 75,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
