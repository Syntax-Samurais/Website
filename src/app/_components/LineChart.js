import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(annotationPlugin);

const LineChart = ({ chartData, goalWeight, selectedTimePeriod }) => {
  let filteredData = chartData;
  if (selectedTimePeriod === "monthly") {
    filteredData = aggregateDataMonthly(chartData);
  } else if (selectedTimePeriod === "yearly") {
    filteredData = aggregateDataYearly(chartData);
  } else if (selectedTimePeriod === "weekly") {
    filteredData = aggregateDataLastWeek(chartData);
  }

  const annotations =
    goalWeight && goalWeight !== 0
      ? [
          {
            type: "line",
            yMin: goalWeight,
            yMax: goalWeight,
            borderColor: "rgb(24, 97, 165)",
            borderWidth: 1,
            label: {
              enabled: true,
              content: "Goal Weight",
            },
          },
        ]
      : [];

  const maxWeight = Math.max(
    ...chartData.datasets.flatMap((dataset) => dataset.data),
  ); // Get the maximum weight from your data

  const options = {
    plugins: {
      annotation: {
        annotations: annotations,
      },
    },

    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
          color: "#1861a5", // Adjust the color if needed
          font: {
            size: 16, // Adjust the font size if needed
            weight: "800", // Adjust the font weight if needed
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Weight in lbs",
          color: "#1861a5", // Adjust the color if needed
          font: {
            size: 16, // Adjust the font size if needed
            weight: "800", // Adjust the font weight if needed
          },
        },
        min: 70, // Set minimum value for y-axis
        max: Math.ceil(maxWeight / 10) * 10 + 10, // Adjust maximum value as needed
        stepSize: 1, // Adjust step size as needed
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return <Line data={filteredData} options={options} />;
};

const aggregateDataLastWeek = (data) => {
  if (!data || !Array.isArray(data.datasets) || data.datasets.length === 0) {
    return [];
  }

  const currentDate = new Date(); // Current date
  const lastWeekDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 7,
  ); // Last week's date

  // Filter the labels and datasets for the last week
  const filteredLabels = [];
  const filteredDatasets = data.datasets.map((dataset) => ({
    label: dataset.label,
    data: dataset.data.filter((entry, index) => {
      const entryDate = new Date(data.labels[index]);
      return entryDate >= lastWeekDate;
    }),
  }));

  // Only keep the labels that correspond to the filtered datasets
  data.labels.forEach((label, index) => {
    const entryDate = new Date(label);
    if (entryDate >= lastWeekDate) {
      filteredLabels.push(label);
    }
  });

  return { labels: filteredLabels, datasets: filteredDatasets };
};

const aggregateDataMonthly = (data) => {
  if (!data || !Array.isArray(data.datasets) || data.datasets.length === 0) {
    return [];
  }

  const currentDate = new Date(); // Current date
  const lastMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
  ); // First day of last month
  const filteredLabels = [];
  const filteredDatasets = data.datasets.map((dataset) => ({
    label: dataset.label,
    data: dataset.data.filter((entry, index) => {
      const entryDate = new Date(data.labels[index]);
      return entryDate >= lastMonthDate;
    }),
  }));

  // Only keep the labels that correspond to the filtered datasets
  data.labels.forEach((label, index) => {
    const entryDate = new Date(label);
    if (entryDate >= lastMonthDate) {
      filteredLabels.push(label);
    }
  });

  return { labels: filteredLabels, datasets: filteredDatasets };
};

const aggregateDataYearly = (data) => {
  if (!data || !Array.isArray(data.datasets) || data.datasets.length === 0) {
    return [];
  }
  const currentDate = new Date(); // Current date
  const lastYearDate = new Date(
    currentDate.getFullYear() - 1,
    currentDate.getMonth(),
    currentDate.getDate(),
  ); // Current date of last year

  // Filter the labels and datasets for the last year
  const filteredLabels = [];
  const filteredDatasets = data.datasets.map((dataset) => ({
    label: dataset.label,
    data: dataset.data.filter((entry, index) => {
      const entryDate = new Date(data.labels[index]);
      return entryDate >= lastYearDate;
    }),
  }));

  // Only keep the labels that correspond to the filtered datasets
  data.labels.forEach((label, index) => {
    const entryDate = new Date(label);
    if (entryDate >= lastYearDate) {
      filteredLabels.push(label);
    }
  });

  return { labels: filteredLabels, datasets: filteredDatasets };
};

export default LineChart;
