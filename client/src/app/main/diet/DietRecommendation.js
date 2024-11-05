import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import TinderCard from 'react-tinder-card';
import Hammer from 'hammerjs';

const mealData = [
  {
    meal: "Breakfast",
    image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a",
    title: "Fluffy Pancakes",
    calories: "420",
    macros: { protein: "10g", fats: "14g", carbs: "45g" },
  },
  {
    meal: "Lunch",
    image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74",
    title: "Grilled Salmon Salad",
    calories: "520",
    macros: { protein: "30g", fats: "20g", carbs: "40g" },
  },
  {
    meal: "Dinner",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    title: "Pasta Carbonara",
    calories: "700",
    macros: { protein: "25g", fats: "30g", carbs: "70g" },
  },
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DietApp = () => {
  const [currentDay, setCurrentDay] = useState('Monday');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chosenMeals, setChosenMeals] = useState({
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
  });

  const handleSwipe = (direction, meal) => {
    if (direction === 'right') {
      setChosenMeals((prev) => ({
        ...prev,
        [currentDay]: [...prev[currentDay], meal],
      }));
    }
  };

  const handleDayChange = (day) => {
    setCurrentDay(day);
  };

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const renderTinderCards = () => (
    mealData.map((meal, index) => (
      <TinderCard key={index} onSwipe={(dir) => handleSwipe(dir, meal)} preventSwipe={["up", "down"]}>
        <Card sx={{ maxWidth: 450, margin: '0 auto', mb: 3, position: 'relative' }}>
          <CardMedia
            component="img"
            height="180"
            image={meal.image}
            alt={meal.title}
            sx={{ objectFit: 'cover' }}
          />
          <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: '#4CAF50', color: 'white', p: 0.5, borderRadius: '20px', fontSize: 12, fontWeight: 'bold' }}>
            🔥 {meal.calories} Calories
          </Box>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{meal.meal}</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>{meal.title}</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Protein: {meal.macros.protein}</Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Fats: {meal.macros.fats}</Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>Carbs: {meal.macros.carbs}</Typography>
            </Box>
          </CardContent>
        </Card>
      </TinderCard>
    ))
  );

  return (
    <Box sx={{ bgcolor: '#CCFBFE', minHeight: '100vh', py: 3 }}>
      {/* Day Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, py: 2, bgcolor: '#006064' }}>
        {weekDays.map((day) => (
          <Button
            key={day}
            onClick={() => handleDayChange(day)}
            variant="contained"
            sx={{
              backgroundColor: currentDay === day ? '#00838F' : '#004d5a',
              color: 'white',
              px: 2,
              py: 1,
              fontSize: '16px',
              '&:hover': { backgroundColor: '#00ACC1' },
            }}
            disabled={chosenMeals[day].length > 0}
          >
            {day} {chosenMeals[day].length > 0 && <span style={{ color: '#4CAF50', fontSize: '16px' }}>✔</span>}
          </Button>
        ))}
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
          sx={{
            backgroundColor: '#00838F',
            color: 'white',
            px: 2,
            py: 1,
            fontSize: '16px',
            '&:hover': { backgroundColor: '#00ACC1' },
          }}
        >
          Chosen Diet Plan
        </Button>
      </Box>

      {/* Tinder Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Swipe Meals for {currentDay}</Typography>
        <Box sx={{ width: '90vw', maxWidth: 450 }}>
          {renderTinderCards()}
        </Box>
      </Box>

      {/* Dialog for chosen meals */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Chosen Diet Plan</DialogTitle>
        <DialogContent>
          {weekDays.map((day) => (
            <Box key={day} sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{day}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                {chosenMeals[day].length > 0 ? (
                  chosenMeals[day].map((meal, idx) => (
                    <Card key={idx} sx={{ display: 'flex', mb: 1 }}>
                      <CardMedia
                        component="img"
                        sx={{ width: '50%', objectFit: 'cover' }}
                        image={meal.image}
                        alt={meal.title}
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary">
                          {meal.title} - {meal.calories} Calories
                        </Typography>
                        <Typography variant="body2">Protein: {meal.macros.protein}, Fats: {meal.macros.fats}, Carbs: {meal.macros.carbs}</Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">No meals selected</Typography>
                )}
              </Box>
            </Box>
          ))}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
            <Button variant="contained" onClick={handleCloseDialog}>Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DietApp;
