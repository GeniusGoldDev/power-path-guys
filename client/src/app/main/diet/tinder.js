import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Paper,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './MealSwipeComponent.css';
import Hammer from 'hammerjs';

const MealSwipeComponent = () => {
  const [openRedoPopup, setOpenRedoPopup] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);
  const [showTinder, setShowTinder] = useState(false);
  const [chosenMeals, setChosenMeals] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const tinderCardsContainerRef = useRef(null);
  const chosenPlanSectionRef = useRef(null);
  const tinderContainerRef = useRef(null);
  
  const tinderCardTemplate1 = `
    <div class="tinder--card" data-swiped="false">
      <div class="mini-card" data-meal="Breakfast">
        <div class="meal-image-container">
          <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38" alt="Pasta Carbonara" class="meal-image">
          <div class="calorie-badge"><i>🔥</i> 300 Calories</div>
        </div>
        <div class="meal-info">
          <div class="meal-title">Breakfast</div>
          <div style="color:grey">Fluffy Pancakes</div>
          <div class="macros">
            <div class="macro-item protein"><span class="dot"></span> <span>8g Protein</span></div>
            <div class="macro-item fats"><span class="dot"></span> <span>15g Fats</span></div>
            <div class="macro-item carbs"><span class="dot"></span> <span>32g Carbs</span></div>
          </div>
        </div>
        <div class="meal-image-container">
          <img src="https://images.unsplash.com/photo-1516100882582-96c3a05fe590" alt="Avocado Toast" class="meal-image">
          <div class="calorie-badge"><i>🔥</i> 450 Calories</div>
        </div>
        <div class="meal-info">
          <div class="meal-title">Lunch</div>
          <div style="color:grey">Veggie Burger</div>
          <div class="macros">
            <div class="macro-item protein"><span class="dot"></span> <span>40g Protein</span></div>
            <div class="macro-item fats"><span class="dot"></span> <span>15g Fats</span></div>
            <div class="macro-item carbs"><span class="dot"></span> <span>50g Carbs</span></div>
          </div>
        </div>
        <div class="meal-image-container">
          <img src="https://images.unsplash.com/photo-1506354666786-959d6d497f1a" alt="Smoothie Bowl" class="meal-image">
          <div class="calorie-badge"><i>🔥</i> 500 Calories</div>
        </div>
        <div class="meal-info">
          <div class="meal-title">Dinner</div>
          <div style="color:grey">Vegetable Stir Fry</div>
          <div class="macros">
            <div class="macro-item protein"><span class="dot"></span> <span>60g Protein</span></div>
            <div class="macro-item fats"><span class="dot"></span> <span>35g Fats</span></div>
            <div class="macro-item carbs"><span class="dot"></span> <span>30g Carbs</span></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const handleDayClick = (day) => {
    showTinderCard(day);
    console.log('showTinderCard:clicked');
  };

  const showTinderCard = (day) => {
    setCurrentDay(day);
    setShowTinder(true);

    if (tinderContainerRef.current && chosenPlanSectionRef.current) {
      tinderContainerRef.current.style.display = "flex";
      chosenPlanSectionRef.current.style.display = "none";
    } else {
      console.error("One of the elements is not found in the DOM.");
    }

    if (tinderCardsContainerRef.current) {
      tinderCardsContainerRef.current.innerHTML = tinderCardTemplate1;
      initCards();
    } else {
      console.error("Tinder cards container not found.");
    }
  };

  const initCards = () => {
    const allCards = Array.from(tinderCardsContainerRef.current.querySelectorAll('.tinder--card'));
    allCards.forEach((el, index) => {
      const hammertime = new Hammer(el);

      hammertime.on('pan', function (event) {
        el.classList.add('moving');
        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;
        el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
      });

      hammertime.on('panend', function (event) {
        el.classList.remove('moving');
        const keep = Math.abs(event.deltaX) < 100 && Math.abs(event.velocityX) < 0.5;

        if (keep) {
          el.style.transform = '';
        } else {
          const endX = event.deltaX > 0 ? 1000 : -1000;
          const rotate = (event.deltaX * 0.03) * (event.deltaY / 80);

          if (event.deltaX > 0 && el.getAttribute("data-swiped") === "false") {
            el.setAttribute("data-swiped", "true");
            el.style.transition = "transform 0.3s ease-out";
            el.style.transform = "translate(0px, 0px) rotate(0deg)";
            setChosenMeals(prev => {
              const updatedMeals = { ...prev };
              updatedMeals[currentDay].push(...el.querySelectorAll('.mini-card'));
              return updatedMeals;
            });

            allCards.forEach((card, idx) => {
              if (idx !== index) {
                card.style.display = "none";
              } else {
                card.style.pointerEvents = "none";
              }
            });

            const dayButton = document.getElementById(currentDay);
            dayButton.disabled = true;
            dayButton.innerHTML += ` <span class="tick-icon">✔</span>`;
          } else if (event.deltaX < 0) {
            el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
            el.style.transform = `translate(${endX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
            el.style.opacity = '0';
            el.classList.add('removed');
            setTimeout(() => el.remove(), 300);
          }
          updateCards();
        }
      });
    });
    updateCards();
  };

  const handleSwipeButton = (direction) => {
    const cards = Array.from(tinderCardsContainerRef.current.querySelectorAll('.tinder--card:not(.removed)'));
    if (cards.length === 0) return;

    const card = cards[0];
    const moveOutWidth = document.body.clientWidth * 1.5;

    if (direction === 'left') {
      card.style.transform = `translate(-${moveOutWidth}px, -100px) rotate(-30deg)`;
      card.classList.add('removed');
      updateCards();
    } else if (direction === 'right') {
      card.style.transform = `translate(${moveOutWidth}px, -100px) rotate(30deg)`;
      card.classList.add('removed');

      // const currentIndex = weekDays.indexOf(currentDay);
      // const nextDay = (currentIndex >= 0 && currentIndex < weekDays.length - 1) ? weekDays[currentIndex + 1] : "Sunday";
      // setCurrentDay(nextDay);
      const currentIndex = weekDays.indexOf(currentDay);
      let nextDay;

      if (currentIndex === weekDays.length - 2) {
        // If the current day is Friday, skip to Saturday
        nextDay = weekDays[weekDays.length - 1];
      } else if (currentIndex >= 0 && currentIndex < weekDays.length - 1) {
        // If the current day is not Friday, move to the next day
        nextDay = weekDays[currentIndex + 1];
      } else {
        // If the currentDay is not found in weekDays, start from Monday
        nextDay = "Monday";
      }

      setCurrentDay(nextDay);

      setTimeout(() => {
        if (nextDay === "Sunday") {
          showChosenPlan();
        } else {
          showTinderCard(nextDay);
        }
      }, 300);

      // updateCards();
    }
    console.log('handleSwipeButton:clicked');
  };

  const updateCards = () => {
    const allCards = Array.from(tinderCardsContainerRef.current.querySelectorAll('.tinder--card:not(.removed)'));

    allCards.forEach((card, index) => {
      card.style.zIndex = allCards.length - index;
      card.style.transform = `scale(${1 - index * 0.05}) translateY(${-index * 20}px)`;
      card.style.opacity = '1';
    });

    if (allCards.length === 0 && currentDay) {
      setOpenRedoPopup(true);
    }
  };

  const showChosenPlan = () => {
    if (tinderContainerRef.current) {
      tinderContainerRef.current.style.display = "none";
    }
    if (chosenPlanSectionRef.current) {
      chosenPlanSectionRef.current.style.display = "block";
    }
    displayChosenMeals();
    console.log('showChosenPlan:clicked');
  };

  // const displayChosenMeals = () => {
  //   for (const [day, meals] of Object.entries(chosenMeals)) {
  //     const daySection = document.getElementById(`chosen${day}`).querySelector('.chosen-meals-row');
  //     daySection.innerHTML = ''; // Clear previous meals
  //     meals.forEach(meal => daySection.appendChild(meal.cloneNode(true))); // Append chosen meals
  //   }
  // };
  const displayChosenMeals = () => {
    for (const [day, meals] of Object.entries(chosenMeals)) {
      const daySection = document.getElementById(`chosen${day}`).querySelector('.chosen-meals-row');
      daySection.innerHTML = ''; // Clear previous meals
  
      meals.forEach(meal => {
        // Check if the meal element already exists in the daySection
        if (!daySection.querySelector(`[data-meal="${meal.dataset.meal}"]`)) {
          daySection.appendChild(meal.cloneNode(true)); // Append the meal element
        }
      });
    }
  };

  const redoDay = () => {
    console.log(`Redoing selection for ${currentDay}`);
    setOpenRedoPopup(false);
  };

  const closeRedoPopup = () => {
    setOpenRedoPopup(false);
  };

  return (
    <Box sx={{ background: '#CCFBFE', padding: '20px' }}>
      <Box display="flex" justifyContent="center" gap={2} mb={2}>
        {weekDays.map((day) => (
          <Button
            key={day}
            variant="contained"
            color="primary"
            onClick={() => handleDayClick(day)}
            id={day}
          >
            {day}
          </Button>
        ))}
        <Button variant="contained" color="secondary" onClick={showChosenPlan}>
          Chosen Diet Plan
        </Button>
      </Box>

      {showTinder && (
        <Box className="tinder" ref={tinderContainerRef} sx={{ display: 'none' }}>
          <Box className="tinder--cards" ref={tinderCardsContainerRef} sx={{ position: 'relative', width: '90vw', maxWidth: '850px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Tinder cards will be injected here */}
          </Box>
          <Box className="tinder--buttons" display="flex" justifyContent="space-around" mt={2}>
            <Button variant="contained" color="error" onClick={() => handleSwipeButton('left')}>Nope</Button>
            <Button variant="contained" color="success" onClick={() => handleSwipeButton('right')}>Love</Button>
          </Box>
        </Box>
      )}

      {/* Chosen Plan Section */}
      <Box ref={chosenPlanSectionRef} id="chosenPlanSection" sx={{ display: 'none', marginTop: '20px' }}>
        {weekDays.map(day => (
          <Box key={day} id={`chosen${day}`} sx={{ marginBottom: '10px' }}>
            <Typography variant="h6">{day}</Typography>
            <Box className="chosen-meals-row" sx={{ display: 'flex', flexDirection: 'column' }} />
          </Box>
        ))}
      </Box>

      {/* Redo Popup */}
      <Modal open={openRedoPopup} onClose={closeRedoPopup}>
        <Paper sx={{ padding: 2, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '350px' }}>
          <IconButton onClick={closeRedoPopup} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>Select Your Option</Typography>
          <Typography variant="body1" gutterBottom>Do you want to redo?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="primary" onClick={redoDay}>Yes</Button>
            <Button variant="outlined" color="secondary" onClick={closeRedoPopup}>No</Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};

export default MealSwipeComponent;
