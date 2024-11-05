import React from "react";
import { Bar } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";

const WaterChart = () => {
  const data = {
    labels: ["Today"],
    datasets: [
      {
        label: "Water (ml)",
        data: [250],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1320,
      },
    },
  };

  return (
    <Paper elevation={3} style={{ padding: "20px" }}>
      <Typography variant="h6">Water Consumption</Typography>
      <Bar data={data} options={options} />
    </Paper>
  );
};

export default WaterChart;
