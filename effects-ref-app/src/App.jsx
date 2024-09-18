import React, { useState } from "react";

import "./App.css";
import CardPage from "./CardPage";
import Card from "./Card";

function App() {
  const [card, setCard] = useState("");
  const handleDrawnCard = (cardData) => {
    setCard(cardData);
  };
  return (
    <div className="App">
      <div className="CardPage-wrapper">
        <div className="CardPage">
          <h5>Please click start to start drawing cards!</h5>
          <CardPage drawnCard={handleDrawnCard} />
        </div>
        <div className="CardPage-Card">
          <Card card={card} />
        </div>
      </div>
    </div>
  );
}

export default App;
