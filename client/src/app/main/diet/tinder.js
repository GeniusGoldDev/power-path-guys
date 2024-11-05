import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import Hammer from 'hammerjs';

const mealsData = {
  Monday: [
    {
      meal: "Breakfast",
      title: "Fluffy Pancakes",
      calories: 420,
      macros: { protein: 10, fats: 14, carbs: 45 },
      image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a",
    },
    {
      meal: "Lunch",
      title: "Grilled Salmon Salad",
      calories: 520,
      macros: { protein: 30, fats: 20, carbs: 40 },
      image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74",
    },
    {
      meal: "Dinner",
      title: "Pasta Carbonara",
      calories: 700,
      macros: { protein: 25, fats: 30, carbs: 70 },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    },
  ],
  Tuesday: [
    {
      meal: "Breakfast",
      title: "Greek Yogurt Parfait",
      calories: 350,
      macros: { protein: 20, fats: 5, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Chicken Caesar Wrap",
      calories: 600,
      macros: { protein: 35, fats: 25, carbs: 45 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Stir-Fried Tofu and Vegetables",
      calories: 450,
      macros: { protein: 20, fats: 15, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Wednesday: [
    {
      meal: "Breakfast",
      title: "Oatmeal with Berries",
      calories: 250,
      macros: { protein: 10, fats: 5, carbs: 45 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Quinoa Salad",
      calories: 400,
      macros: { protein: 15, fats: 10, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Beef Stir-Fry",
      calories: 700,
      macros: { protein: 40, fats: 30, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Thursday: [
    {
      meal: "Breakfast",
      title: "Smoothie Bowl",
      calories: 300,
      macros: { protein: 15, fats: 8, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Turkey Sandwich",
      calories: 500,
      macros: { protein: 30, fats: 15, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Vegetable Curry",
      calories: 600,
      macros: { protein: 15, fats: 20, carbs: 85 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Friday: [
    {
      meal: "Breakfast",
      title: "Egg and Spinach Wrap",
      calories: 350,
      macros: { protein: 20, fats: 15, carbs: 30 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Poke Bowl",
      calories: 600,
      macros: { protein: 30, fats: 20, carbs: 65 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Shrimp Tacos",
      calories: 500,
      macros: { protein: 25, fats: 15, carbs: 55 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Saturday: [
    {
      meal: "Breakfast",
      title: "French Toast",
      calories: 400,
      macros: { protein: 12, fats: 18, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Caprese Salad",
      calories: 350,
      macros: { protein: 15, fats: 20, carbs: 30 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "BBQ Chicken",
      calories: 700,
      macros: { protein: 40, fats: 30, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Sunday: [
    {
      meal: "Breakfast",
      title: "Avocado Toast",
      calories: 300,
      macros: { protein: 8, fats: 12, carbs: 40 },
      image: "https://images.unsplash.com/photo-1555685812-4f7e1b0e1b58",
    },
  ],
};

const TinderComponent = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [tinderVisible, setTinderVisible] = useState(false);
  const [chosenMeals, setChosenMeals] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [swipingStarted, setSwipingStarted] = useState(false);
  const [tinderCards, setTinderCards] = useState([]);
  const [showChosenMeals, setShowChosenMeals] = useState(false);

  useEffect(() => {
    if (tinderCards.length > 0) {
      const allCards = Array.from(document.querySelectorAll('.tinder--card'));
      allCards.forEach((el, index) => {
        const hammertime = new Hammer(el);

        hammertime.on('pan', function (event) {
          el.classList.add('moving');
          const xMulti = event.deltaX * 0.03;
          const yMulti = event.deltaY / 80;
          const rotate = xMulti * yMulti;
          el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
          setSwipingStarted(true);
        });

        hammertime.on('panend', function (event) {
          el.classList.remove('moving');
          const keep = Math.abs(event.deltaX) < 100 && Math.abs(event.velocityX) < 0.5;

          if (keep) {
            el.style.transform = '';
          } else {
            const endX = event.deltaX > 0 ? 1000 : -1000;
            el.style.transform = `translate(${endX}px, ${event.deltaY}px)`;
            el.classList.add('removed');
            setTinderCards(prev => prev.slice(1));
            if (event.deltaX > 0) {
              setChosenMeals(prev => ({
                ...prev,
                [currentDay]: [...prev[currentDay], mealsData[currentDay][index]],
              }));
            }
            updateCards();
          }
        });
      });
    }
  }, [tinderCards]);

  const showTinderCard = (day) => {
    setCurrentDay(day);
    setSwipingStarted(false);
    setTinderVisible(true);
    setTinderCards(mealsData[day]);
    setShowChosenMeals(false); // Hide chosen meals when showing new cards
  };

  const updateCards = () => {
    const allCards = Array.from(document.querySelectorAll('.tinder--card:not(.removed)'));
    allCards.forEach((card, index) => {
      card.style.zIndex = allCards.length - index;
      card.style.transform = `scale(${1 - index * 0.05}) translateY(${-index * 20}px)`;
      card.style.opacity = '1';
    });

    if (allCards.length === 0 && currentDay && swipingStarted) {
      showRedoPopup();
    }
  };

  const showRedoPopup = () => {
    setOpenDialog(true);
  };

  const closeRedoPopup = () => {
    setOpenDialog(false);
    const dayButton = document.getElementById(currentDay);
    if (dayButton) {
      dayButton.disabled = true;
      dayButton.innerHTML += ` <span style="color: red; font-size: 16px;">✘</span>`;
    }
  };
const groupedMeals = {
  Breakfast: [],
  Lunch: [],
  Dinner: [],
};

tinderCards.forEach(meal => {
  groupedMeals[meal.meal].push(meal);
});
  const redoDay = () => {
    setOpenDialog(false);
    setTinderCards(mealsData[currentDay]);
  };

  const showChosenPlan = () => {
    setShowChosenMeals(true);
    setTinderVisible(false);
  };

  const handleSwipeButton = (direction) => {
    const allCards = Array.from(document.querySelectorAll('.tinder--card:not(.removed)'));
    if (allCards.length > 0) {
      const card = allCards[0]; // Get the first card
      const endX = direction === 'right' ? 1000 : -1000; // Right or left swipe
      card.style.transform = `translate(${endX}px, 0)`;
      card.classList.add('removed');
      setTinderCards(prev => prev.slice(1)); // Remove the card from the state
      if (direction === 'right') {
        setChosenMeals(prev => ({
          ...prev,
          [currentDay]: [...prev[currentDay], mealsData[currentDay][0]], // Add the first meal
        }));
      }
      updateCards();
    }
  };

  return (
    <Box>
        <style>
        {`
          * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
            font-family: Arial, sans-serif;
          }
          body {
            background: #CCFBFE;
            font-family: sans-serif;
          }
          .day-buttons {
            display: flex;
            justify-content: center;
            gap: 10px;
            padding: 10px;
            background-color: #006064;
          }
          .day-button {
            background: #00838F;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .day-button:hover:not(:disabled) {
            background: #00ACC1;
          }
          .day-button:disabled {
            background: #004d5a;
            cursor: not-allowed;
          }
          .tick-icon {
            color: #4CAF50;
            font-size: 16px;
          }
          .tinder--cards {
            position: relative;
            width: 90vw;
            max-width: 450px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .tinder--card {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #FFF;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, opacity 0.3s ease;
            cursor: grab;
            z-index: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            padding: 20px;
          }

          .mini-card {
            width: 100%;
            height: 180px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            background-color: #fff;
            display: flex;
            font-size: 14px;
            margin: 10px 0;
          }

          .meal-image-container {
            width: 50%;
            height: 100%;
            overflow: hidden;
            position: relative;
          }

          .meal-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .calorie-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: linear-gradient(135deg, #4CAF50, #83e68c);
            color: #fff;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 5px;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
          }
            .meal-info {
            width: 50%;
            padding: 15px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .meal-title {
            font-weight: bold;
            font-size: 16px;
            margin: 10px 0;
          }

          .macros {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .macro-item {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            display: inline-block;
          }

          .protein .dot {
            background-color: #F3A830;
          }

          .fats .dot {
            background-color: #5C85D6;
          }

          .carbs .dot {
            background-color: #68B168;
          }

          .chosen-plan {
            display: none;
            margin-top: 20px;
            padding: 20px;
          }

          .day-section {
            margin-bottom: 20px;
          }

          .day-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .chosen-meals-row {
            display: flex;
            gap: 10px;
          }

          .tinder--buttons {
            display: flex;
            justify-content: space-around;
            margin-top: 20px;
            width: 100%;
          }

          .tinder--buttons button {
            background-color: #00838F;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            width: 100px;
          }

          .tinder--buttons button:hover {
            background-color: #00ACC1;
          }

          #redoPopup {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }
        .tinder {
        width: 100vw;
        height: calc(30vh - 60px);
        display: ${tinderVisible ? 'block' : 'none'};
        flex-direction: column;
        justify-content: center !important;
        align-items: center;
        position: center;
        }
        `}
      </style>
      <Box className="day-buttons" sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        {Object.keys(mealsData).map(day => (
          <Button key={day} className="day-button" onClick={() => showTinderCard(day)}>
            {day}
          </Button>
        ))}
        <Button variant="contained" onClick={showChosenPlan}>
          Chosen Diet Plan
        </Button>
      </Box>

        
      <Box className="tinder" id="tinderContainer" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box className="tinder--cards" id="tinderCardsContainer">
          {tinderCards.map((meal, index) => (
            <div className="tinder--card" key={index}>
              <div className="mini-card" data-meal={meal.meal}>
                <div className="meal-image-container">
                  <img src={meal.image} alt={meal.title} className="meal-image" />
                  <div className="calorie-badge">🔥 {meal.calories} Calories</div>
                </div>
                <div className="meal-info">
                  <div className="meal-title">{meal.meal}</div>
                  <div style={{ color: 'grey' }}>{meal.title}</div>
                  <div className="macros">
                    <div className="macro-item protein"><span>{meal.macros.protein}g Protein</span></div>
                    <div className="macro-item fats"><span>{meal.macros.fats}g Fats</span></div>
                    <div className="macro-item carbs"><span>{meal.macros.carbs}g Carbs</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Box>
        <Box className="tinder--buttons">
          <Button onClick={() => handleSwipeButton('left')}>Nope</Button>
          <Button onClick={() => handleSwipeButton('right')}>Love</Button>
        </Box>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Your Option</DialogTitle>
        <DialogContent>
          <Typography>Do you want to redo?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={redoDay}>Yes</Button>
          <Button onClick={closeRedoPopup}>No</Button>
        </DialogActions>
      </Dialog>

      {showChosenMeals && (
        <Box sx={{ marginTop: 2 }}>
          {Object.entries(chosenMeals).map(([day, meals]) => (
            <Box key={day} sx={{ marginBottom: 2 }}>
              <Typography variant="h6">{day}</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {meals.map((meal, index) => (
                  <Box key={index} className="mini-card" sx={{ width: '100px' }}>
                    <img src={meal.image} alt={meal.title} style={{ width: '100%' }} />
                    <Typography variant="body2">{meal.title}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TinderComponent;
