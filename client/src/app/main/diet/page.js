"use client";

import React, { useState } from "react";
import { Box, Grid, Button, TextField, Typography, Paper, Tabs, Tab } from "@mui/material";
import TinderComponent from "./tinder"

const Diet = () => {
  let today = new Date().getDay(); // 0 (Sunday) - 6 (Saturday)

  // Adjust week to start from Monday (0 = Monday, 6 = Sunday)
  today = today === 0 ? 6 : today - 1;

  // Full names of the days of the week starting from Monday
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Static data for other days
  const staticDayData = {
    0: { calories: 1200, carbs: 160, fat: 50, protein: 60, water: 1000 }, // Monday
    1: { calories: 1200, carbs: 100, fat: 40, protein: 50, water: 1000 }, // Tuesday
    2: { calories: 1300, carbs: 150, fat: 55, protein: 65, water: 1100 }, // Wednesday
    3: { calories: 1600, carbs: 220, fat: 70, protein: 80, water: 1300 }, // Thursday
    4: { calories: 1400, carbs: 190, fat: 60, protein: 75, water: 1200 }, // Friday
    5: { calories: 1700, carbs: 250, fat: 80, protein: 90, water: 1500 }, // Saturday
    6: { calories: 1500, carbs: 180, fat: 60, protein: 70, water: 1200 }, // Sunday
  };

  // Initialize selectedDay with the adjusted today value
  const [selectedDay, setSelectedDay] = useState(today);
  const [selectedTab, setSelectedTab] = useState(0);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [water, setWater] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const updateProgress = (value, total) => Math.min((value / total) * 100, 100);

  const formatText = (category, value, total, unit) => {
    if (value > total) {
      return (
        <Typography>
          <span style={{ color: "black" }}>{category}: </span>
          <span style={{ color: "red" }}>
            {value}{unit} over {total}{unit} goal
          </span>
        </Typography>
      );
    }
    return (
      <Typography style={{ color: "black" }}>
        {category}: {value} / {total}{unit}
      </Typography>
    );
  };

  const handleWaterAdd = (event) => {
    event.preventDefault();
    const waterInput = parseInt(document.getElementById("waterInput").value);
    if (!isNaN(waterInput)) {
      setWater((prev) => prev + waterInput);
      document.getElementById("waterInput").value = "";
    }
  };

  const handleFoodAdd = (event) => {
    event.preventDefault();
    const foodInput = document.getElementById("foodInput").value;
    if (foodInput && isNaN(foodInput)) {
      setCalories((prev) => prev + 100);
      setCarbs((prev) => prev + 30);
      setFat((prev) => prev + 10);
      setProtein((prev) => prev + 5);
      document.getElementById("foodInput").value = "";
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 4 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered aria-label="diet navigation tabs">
          <Tab label="Diet Tracker" />
          <Tab label="Diet Plan Recommendation" />
        </Tabs>
      </Box>

      {selectedTab === 0 && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            {selectedDay === today ? `Today: ${daysOfWeek[today]}` : daysOfWeek[selectedDay]}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
            {daysOfWeek.map((d, index) => (
              <Button
                key={index}
                onClick={() => setSelectedDay(index)}
                disabled={index > today}  // Disable future days
                sx={{
                  color: index === selectedDay || index === today ? "white" : "#888",  // Highlight today
                  backgroundColor: index === selectedDay || index === today ? "#007bff" : "transparent",  // Blue background for today
                  boxShadow: index === today ? "0px 4px 15px rgba(0, 123, 255, 0.6)" : "none",  // Shadow for today
                  "&:hover": { backgroundColor: index !== selectedDay ? "#007bff" : "transparent", color: "white" },
                  margin: "0 10px",
                }}
              >
                {d}
              </Button>
            ))}
          </Box>

          {/* Only the "Today" page starts with dynamic input (all values are zero initially) */}
          {selectedDay === today ? (
            <Paper elevation={3} sx={{ padding: 4 }}>
              <Grid container spacing={4} alignItems="center">
                {/* Calorie Tracker */}
                <Grid item xs={12} md={6} sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h6" gutterBottom>Calorie Tracker</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", height: "240px" }}>
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                      <circle cx="100" cy="100" r="70" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                      <circle cx="100" cy="100" r="50" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                      <circle cx="100" cy="100" r="30" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                      <circle cx="100" cy="100" r="90" stroke={calories > 1520 ? "red" : "#6A1B9A"} strokeDasharray="565" strokeDashoffset={565 - (updateProgress(calories, 1520) * 565) / 100} strokeWidth="10" fill="none" strokeLinecap="round" />
                      <circle cx="100" cy="100" r="70" stroke={carbs > 175 ? "red" : "#FBC02D"} strokeDasharray="440" strokeDashoffset={440 - (updateProgress(carbs, 175) * 440) / 100} strokeWidth="10" fill="none" strokeLinecap="round" />
                      <circle cx="100" cy="100" r="50" stroke={fat > 55 ? "red" : "#8BC34A"} strokeDasharray="314" strokeDashoffset={314 - (updateProgress(fat, 55) * 314) / 100} strokeWidth="10" fill="none" strokeLinecap="round" />
                      <circle cx="100" cy="100" r="30" stroke={protein > 70 ? "red" : "#03A9F4"} strokeDasharray="188" strokeDashoffset={188 - (updateProgress(protein, 70) * 188) / 100} strokeWidth="10" fill="none" strokeLinecap="round" />
                    </svg>
                    <Box sx={{ marginLeft: 3 }}>
                      {formatText("Calories", calories, 1520, "kcal")}
                      {formatText("Carbs", carbs, 175, "g")}
                      {formatText("Fat", fat, 55, "g")}
                      {formatText("Protein", protein, 70, "g")}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", marginTop: 2 }}>
                    <TextField id="foodInput" label="Enter food item" variant="outlined" sx={{ width: "80%", height: 48 }} />
                    <Button onClick={handleFoodAdd} variant="contained" sx={{ width: "80%", height: 48 }}>Submit</Button>
                  </Box>
                </Grid>

                {/* Water Tracker */}
                <Grid item xs={12} md={6} sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h6" gutterBottom>Water Tracker</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", height: "240px" }}>
                    <Box sx={{ width: 100, height: 200, border: "3px solid #e6e6e6", borderRadius: 1, position: "relative" }}>
                      <Box sx={{ height: `calc(${Math.min(water, 1320) / 1320 * 100}%)`, backgroundColor: water >= 1320 ? "green" : "#00BFFF", position: "absolute", bottom: 0, width: "100%" }}></Box>
                    </Box>
                    <Box sx={{ marginLeft: 3 }}>
                      <Typography variant="h6" align="center">{water} / 1320 ml</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", marginTop: 2 }}>
                    <TextField id="waterInput" label="Add Water (ml)" type="number" variant="outlined" sx={{ width: "80%", height: 48 }} />
                    <Button onClick={handleWaterAdd} variant="contained" sx={{ width: "80%", height: 48 }}>Add</Button>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ) : (
            <Paper elevation={3} sx={{ padding: 4 }}>
              {/* Static view for other days */}
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h6" gutterBottom>Calorie Tracker</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", height: "240px" }}>
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="90" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                      <circle cx="100" cy="100" r="70" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                      <circle cx="100" cy="100" r="50" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                      <circle cx="100" cy="100" r="30" stroke="#e6e6e6" strokeWidth="10" fill="none" />
                      <circle cx="100" cy="100" r="90" stroke="#6A1B9A" strokeDasharray="565" strokeDashoffset={565 - (updateProgress(staticDayData[selectedDay].calories, 1520) * 565) / 100} strokeWidth="10" fill="none" strokeLinecap="round" />
                      <circle cx="100" cy="100" r="70" stroke="#FBC02D" strokeDasharray="440" strokeDashoffset={440 - (updateProgress(staticDayData[selectedDay].carbs, 175) * 440) / 100} strokeWidth="10" fill="none" strokeLinecap="round" />
                      <circle cx="100" cy="100" r="50" stroke="#8BC34A" strokeDasharray="314" strokeDashoffset={314 - (updateProgress(staticDayData[selectedDay].fat, 55) * 314) / 100} strokeWidth="10" fill="none" strokeLinecap="round" />
                      <circle cx="100" cy="100" r="30" stroke="#03A9F4" strokeDasharray="188" strokeDashoffset={188 - (updateProgress(staticDayData[selectedDay].protein, 70) * 188) / 100} strokeWidth="10" fill="none" strokeLinecap="round" />
                    </svg>
                    <Box sx={{ marginLeft: 3 }}>
                      <Typography style={{ color: "#6A1B9A" }}>Calories: {staticDayData[selectedDay].calories} kcal</Typography>
                      <Typography style={{ color: "#FBC02D" }}>Carbs: {staticDayData[selectedDay].carbs} g</Typography>
                      <Typography style={{ color: "#8BC34A" }}>Fat: {staticDayData[selectedDay].fat} g</Typography>
                      <Typography style={{ color: "#03A9F4" }}>Protein: {staticDayData[selectedDay].protein} g</Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6} sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h6" gutterBottom>Water Tracker</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", height: "240px" }}>
                    <Box sx={{ width: 100, height: 200, border: "3px solid #e6e6e6", borderRadius: 1, position: "relative" }}>
                      <Box sx={{ height: `calc(${Math.min(staticDayData[selectedDay].water, 1320) / 1320 * 100}%)`, backgroundColor: staticDayData[selectedDay].water >= 1320 ? "green" : "#00BFFF", position: "absolute", bottom: 0, width: "100%" }}></Box>
                    </Box>
                    <Box sx={{ marginLeft: 3 }}>
                      <Typography variant="h6" align="center">{staticDayData[selectedDay].water} / 1320 ml</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          )}
        </>
      )}

      {selectedTab === 1 && (
        <>
          <TinderComponent/>
        </>
      )}
    </Box>
  );
};

export default Diet;
