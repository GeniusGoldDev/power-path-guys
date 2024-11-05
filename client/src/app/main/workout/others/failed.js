// "use client";

// import React from "react";
// import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

// const Workout = () => {
//     // To move the card as the user drags the cursor
//     const motionValue = useMotionValue(0);

//     // To rotate the card as the card moves on drag
//     const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);

//     // To decrease opacity of the card when swiped
//     const opacityValue = useTransform(
//         motionValue,
//         [-200, -150, 0, 150, 200],
//         [0, 1, 1, 1, 0]
//     );

//     // Framer animation hook
//     const animControls = useAnimation();

//     // Some styling for the card
//     const style = {
//         backgroundImage: "url(https://img.icons8.com/color/452/GeeksforGeeks.png)",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "contain",
//         backgroundColor: "#55ccff",
//         boxShadow: "5px 10px 18px #888888",
//         borderRadius: 10,
//         height: 300,
//         width: 200,
//         margin: "20px auto"
//     };

//     return (
//         <div className="Workout">
//             <h1>WORKOUT PAGE</h1>
//             <motion.div
//                 // Card can be dragged only on the x-axis
//                 drag="x"
//                 style={{ ...style, x: motionValue, rotate: rotateValue, opacity: opacityValue }}
//                 dragConstraints={{ left: -1000, right: 1000 }}
//                 onDragEnd={(event, info) => {
//                     // If the card is dragged only up to 150 on x-axis
//                     // bring it back to the initial position
//                     if (Math.abs(info.point.x) <= 150) {
//                         animControls.start({ x: 0 });
//                     } else {
//                         // If the card is dragged beyond 150, make it disappear
//                         animControls.start({ x: info.point.x < 0 ? -200 : 200 });
//                     }
//                 }}
//             />
//         </div>
//     );
// };

// export default Workout;













// // Workout.js
// "use client"; // Use this if you're in a Next.js environment

// import React, { useEffect, useRef } from 'react';
// import './swipestyle.css'; // Ensure this file exists with your styles

// const Workout = () => {
//     const workoutContainerRef = useRef(null);
//     const allCardsRef = useRef([]);

//     useEffect(() => {
//         const workoutContainer = workoutContainerRef.current;
//         const allCards = allCardsRef.current;
        
//         function initCards(card, index) {
//             const newCards = document.querySelectorAll('.workout--card:not(.removed)');
//             newCards.forEach((card, index) => {
//                 card.style.zIndex = allCards.length - index;
//                 card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
//                 card.style.opacity = (10 - index) / 10;
//             });
//             workoutContainer.classList.add('loaded');
//         }

//         allCards.forEach((el, index) => {
//             el.style.transform = 'translate(0, 0)'; // Reset position
//             initCards(el, index);
//             el.addEventListener('pan', (event) => {
//                 if (event.deltaX === 0) return;
//                 workoutContainer.classList.toggle('workout_love', event.deltaX > 0);
//                 workoutContainer.classList.toggle('workout_nope', event.deltaX < 0);
                
//                 const xMulti = event.deltaX * 0.03;
//                 const yMulti = event.deltaY / 80;
//                 const rotate = xMulti * yMulti;

//                 el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
//             });

//             el.addEventListener('panend', (event) => {
//                 workoutContainer.classList.remove('workout_love');
//                 workoutContainer.classList.remove('workout_nope');

//                 const moveOutWidth = document.body.clientWidth;
//                 const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

//                 el.classList.toggle('removed', !keep);

//                 if (keep) {
//                     el.style.transform = '';
//                 } else {
//                     const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
//                     const toX = event.deltaX > 0 ? endX : -endX;
//                     el.style.transform = `translate(${toX}px, -100px)`;
//                     initCards();
//                 }
//             });
//         });
        
//         initCards();
//     }, []);

//     return (
//         <div className="workout" ref={workoutContainerRef}>
//             <div className="workout--status">
//                 <i className="fa fa-remove"></i>
//                 <i className="fa fa-heart"></i>
//             </div>

//             <div className="workout--cards">
//                 {Array.from({ length: 5 }, (_, index) => (
//                     <div
//                         className="workout--card"
//                         key={index}
//                         ref={(el) => allCardsRef.current[index] = el}
//                     >
//                         <img src={`https://placeimg.com/600/300/${index % 2 === 0 ? 'people' : 'nature'}`} alt={`Demo card ${index + 1}`} />
//                         <h3>Demo card {index + 1}</h3>
//                         <p>This is a demo for Tinder-like swipe cards</p>
//                     </div>
//                 ))}
//             </div>

//             <div className="workout--buttons">
//                 <button id="nope"><i className="fa fa-remove"></i></button>
//                 <button id="love"><i className="fa fa-heart"></i></button>
//             </div>
//         </div>
//     );
// };

// export default Workout;






















// HAVE CARD, NO SWIPE

// "use client"; // This line enables the component to use hooks

// import React, { useEffect, useRef, useState } from 'react';
// import './swipestyle.css';

// const Workout = () => {
//     const [cards, setCards] = useState(Array.from({ length: 5 }, (_, index) => index));
//     const workoutContainerRef = useRef(null);

//     const initCards = () => {
//         const newCards = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         newCards.forEach((card, index) => {
//             card.style.zIndex = cards.length - index;
//             card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
//             card.style.opacity = (10 - index) / 10;
//         });
//         workoutContainerRef.current.classList.add('loaded');
//     };

//     const handleSwipe = (direction) => {
//         const cardsArray = document.querySelectorAll('.workout--card:not(.removed)');
//         if (cardsArray.length === 0) return;

//         const card = cardsArray[0];
//         card.classList.add('removed');

//         const moveOutWidth = document.body.clientWidth * 1.5;
//         card.style.transform = direction === 'left'
//             ? `translate(-${moveOutWidth}px, -100px) rotate(-30deg)`
//             : `translate(${moveOutWidth}px, -100px) rotate(30deg)`;

//         // Update cards state
//         setCards((prevCards) => prevCards.slice(1)); // Remove the first card from the array
//         initCards();
//     };

//     useEffect(() => {
//         initCards();
//     }, [cards]);

//     return (
//         <div className="workout" ref={workoutContainerRef}>
//             <div className="workout--status">
//                 <i className="fa fa-remove"></i>
//                 <i className="fa fa-heart"></i>
//             </div>
//             <div className="workout--cards">
//                 {cards.map((index) => (
//                     <div className="workout--card" key={index}>
//                         <img src={`https://placeimg.com/600/300/${index % 2 === 0 ? 'people' : 'nature'}`} alt={`Demo card ${index + 1}`} />
//                         <h3>Demo card {index + 1}</h3>
//                         <p>This is a demo for Tinder-like swipe cards</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="workout--buttons">
//                 <button onClick={() => handleSwipe('left')} id="nope"><i className="fa fa-remove"></i> Nope</button>
//                 <button onClick={() => handleSwipe('right')} id="love"><i className="fa fa-heart"></i> Love</button>
//             </div>
//         </div>
//     );
// };

// export default Workout;




















// CAN SWIPE, NO CARD

// "use client"; // Ensure this is at the top of your file

// import React, { useEffect, useRef, useState } from 'react';
// import './swipestyle.css'; // Ensure your styles are correctly linked
// import Hammer from 'hammerjs';

// const TinderSwipe = () => {
//     const [cards, setCards] = useState([
//         { id: 1, img: "https://placeimg.com/600/300/people", title: "Demo card 1", description: "This is a demo for Tinder-like swipe cards" },
//         { id: 2, img: "https://placeimg.com/600/300/animals", title: "Demo card 2", description: "This is a demo for Tinder-like swipe cards" },
//         { id: 3, img: "https://placeimg.com/600/300/nature", title: "Demo card 3", description: "This is a demo for Tinder-like swipe cards" },
//         { id: 4, img: "https://placeimg.com/600/300/tech", title: "Demo card 4", description: "This is a demo for Tinder-like swipe cards" },
//         { id: 5, img: "https://placeimg.com/600/300/arch", title: "Demo card 5", description: "This is a demo for Tinder-like swipe cards" },
//     ]);
    
//     const tinderContainerRef = useRef(null);
//     const [removedCards, setRemovedCards] = useState(new Set());

//     // Define initCards function
//     const initCards = () => {
//         if (tinderContainerRef.current) {
//             const allCards = tinderContainerRef.current.querySelectorAll('.tinder--card:not(.removed)');
//             allCards.forEach((card, index) => {
//                 card.style.zIndex = cards.length - index;
//                 card.style.transform = `scale(${20 - index} / 20) translateY(-${30 * index}px)`;
//                 card.style.opacity = (10 - index) / 10;
//             });
//             tinderContainerRef.current.classList.add('loaded');
//         }
//     };

//     useEffect(() => {
//         // Initialize cards only on the client
//         if (typeof window !== 'undefined') {
//             initCards(); // Call initCards on mount
//             const allCards = document.querySelectorAll('.tinder--card');
//             allCards.forEach((el) => {
//                 const hammertime = new Hammer(el);
//                 hammertime.on('pan', (event) => handlePan(el, event));
//                 hammertime.on('panend', (event) => handlePanEnd(el, event));
//             });
//         }
//     }, [cards]);

//     const handleSwipe = (card, direction) => {
//         const moveOutWidth = document.body.clientWidth * 1.5;
//         card.classList.add('removed');

//         card.style.transform = direction === 'left'
//             ? `translate(-${moveOutWidth}px, -100px) rotate(30deg)`
//             : `translate(${moveOutWidth}px, -100px) rotate(-30deg)`;

//         setRemovedCards((prev) => new Set(prev).add(card.id));
//         initCards();
//     };

//     const handlePan = (el, event) => {
//         el.classList.add('moving');
//         const xMulti = event.deltaX * 0.03;
//         const yMulti = event.deltaY / 80;
//         const rotate = xMulti * yMulti;

//         el.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
//     };

//     const handlePanEnd = (el, event) => {
//         el.classList.remove('moving');
//         const moveOutWidth = document.body.clientWidth;
//         const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

//         el.classList.toggle('removed', !keep);
//         if (keep) {
//             el.style.transform = '';
//         } else {
//             const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
//             const toX = event.deltaX > 0 ? endX : -endX;
//             const endY = Math.abs(event.velocityY) * moveOutWidth;
//             const toY = event.deltaY > 0 ? endY : -endY;

//             el.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${event.deltaX * 0.03 * event.deltaY / 80}deg)`;
//             initCards();
//         }
//     };

//     const handleNopeClick = () => {
//         const cards = document.querySelectorAll('.tinder--card:not(.removed)');
//         if (cards.length) {
//             handleSwipe(cards[0], 'left');
//         }
//     };

//     const handleLoveClick = () => {
//         const cards = document.querySelectorAll('.tinder--card:not(.removed)');
//         if (cards.length) {
//             handleSwipe(cards[0], 'right');
//         }
//     };

//     return (
//         <div className="tinder" ref={tinderContainerRef}>
//             <div className="tinder--status">
//                 <i className="fa fa-remove"></i>
//                 <i className="fa fa-heart"></i>
//             </div>

//             <div className="tinder--cards">
//                 {cards.length > 0 ? (
//                     cards.map((card) => (
//                         <div key={card.id} className={`tinder--card ${removedCards.has(card.id) ? 'removed' : ''}`}>
//                             <img src={card.img} alt={`Demo card ${card.id}`} />
//                             <h3>{card.title}</h3>
//                             <p>{card.description}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No cards available</p>
//                 )}
//             </div>

//             <div className="tinder--buttons">
//                 <button id="nope" onClick={handleNopeClick}>
//                     <i className="fa fa-remove"></i>
//                 </button>
//                 <button id="love" onClick={handleLoveClick}>
//                     <i className="fa fa-heart"></i>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TinderSwipe;











































// SWIPING TOO MANY CARDS AT ONCE

// "use client"; // This line enables the component to use hooks

// import React, { useEffect, useRef, useState } from 'react';
// import Hammer from 'hammerjs'; // Import Hammer.js
// import './swipestyle.css';

// const Workout = () => {
//     const [cards, setCards] = useState(Array.from({ length: 5 }, (_, index) => index));
//     const workoutContainerRef = useRef(null);

//     const initCards = () => {
//         const newCards = workoutContainerRef.current.querySelectorAll('.workout--card:not(.removed)');
//         newCards.forEach((card, index) => {
//             card.style.zIndex = cards.length - index;
//             card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
//             card.style.opacity = (10 - index) / 10;
//         });
//         workoutContainerRef.current.classList.add('loaded');
//     };

//     const handleSwipe = (direction) => {
//         const cardsArray = document.querySelectorAll('.workout--card:not(.removed)');
//         if (cardsArray.length === 0) return;

//         const card = cardsArray[0];
//         card.classList.add('removed');

//         const moveOutWidth = document.body.clientWidth * 1.5;
//         card.style.transform = direction === 'left'
//             ? `translate(-${moveOutWidth}px, -100px) rotate(-30deg)`
//             : `translate(${moveOutWidth}px, -100px) rotate(30deg)`;

//         // Update cards state
//         setCards((prevCards) => prevCards.slice(1)); // Remove the first card from the array
//         initCards();
//     };

//     const handlePan = (event) => {
//         const card = event.target;
//         const xMulti = event.deltaX * 0.03;
//         const yMulti = event.deltaY / 80;
//         const rotate = xMulti * yMulti;

//         card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
//         workoutContainerRef.current.classList.toggle('tinder_love', event.deltaX > 0);
//         workoutContainerRef.current.classList.toggle('tinder_nope', event.deltaX < 0);
//     };

//     const handlePanEnd = (event) => {
//         const card = event.target;
//         workoutContainerRef.current.classList.remove('tinder_love', 'tinder_nope');
        
//         const moveOutWidth = document.body.clientWidth;
//         const keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

//         if (keep) {
//             card.style.transform = ''; // Reset the position
//         } else {
//             const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
//             const toX = event.deltaX > 0 ? endX : -endX;
//             const endY = Math.abs(event.velocityY) * moveOutWidth;
//             const toY = event.deltaY > 0 ? endY : -endY;

//             card.style.transform = `translate(${toX}px, ${toY + event.deltaY}px) rotate(${event.deltaX * 0.03 * event.deltaY / 80}deg)`;
//             handleSwipe(event.deltaX > 0 ? 'right' : 'left'); // Trigger swipe function
//         }
//     };

//     useEffect(() => {
//         initCards();

//         // Add Hammer.js support for swipe gestures
//         const cardsElements = workoutContainerRef.current.querySelectorAll('.workout--card');
//         cardsElements.forEach((el) => {
//             const hammertime = new Hammer(el);
//             hammertime.on('pan', handlePan);
//             hammertime.on('panend', handlePanEnd);
//         });
//     }, [cards]);

//     return (
//         <div className="workout" ref={workoutContainerRef}>
//             <div className="workout--status">
//                 <i className="fa fa-remove"></i>
//                 <i className="fa fa-heart"></i>
//             </div>
//             <div className="workout--cards">
//                 {cards.map((index) => (
//                     <div className="workout--card" key={index}>
//                         <img src={`https://placeimg.com/600/300/${index % 2 === 0 ? 'people' : 'nature'}`} alt={`Demo card ${index + 1}`} />
//                         <h3>Demo card {index + 1}</h3>
//                         <p>This is a demo for Tinder-like swipe cards</p>
//                     </div>
//                 ))}
//             </div>
//             <div className="workout--buttons">
//                 <button onClick={() => handleSwipe('left')} id="nope"><i className="fa fa-remove"></i> Nope</button>
//                 <button onClick={() => handleSwipe('right')} id="love"><i className="fa fa-heart"></i> Love</button>
//             </div>
//         </div>
//     );
// };

// export default Workout;