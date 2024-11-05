import React from "react";
import { Paper, Typography } from "@mui/material";

const KeyInsights = () => {
  return (
    <Paper style={{ padding: "20px" }}>
      <Typography variant="h6">Key Insights</Typography>
      <ul>
        <li>Your water consumption today is below the recommended amount.</li>
        <li>You successfully completed your planned workout for today.</li>
      </ul>
    </Paper>
  );
};

export default KeyInsights;
