import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(annotationPlugin);

const LineChart = ({ chartData, goalWeight }) => {
  const options = {
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: goalWeight,
            yMax: goalWeight,
            borderColor: "rgb(144, 238, 144)",
            borderWidth: 1,
          },
        },
      },
    },
  };
  return <Line data={chartData} options={options} />;
};

export default LineChart;
