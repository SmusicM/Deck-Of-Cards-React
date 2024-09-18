import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
const BASE_URL = "https://deckofcardsapi.com/api/deck";
function CardPage({ drawnCard }) {
  const [deckId, setDeckId] = useState("");
  const [message, setMessage] = useState("");
  const [deckOver, setDeckOver] = useState(false);
  
  async function startDeck() {
    try {
      const resp = await axios.get(`${BASE_URL}/new`);
      console.log(resp.data.deck_id);
      setDeckId(resp.data.deck_id);
      //sets to null so doesnt dispolay prev card from prev deck when started again
      //could do this different so it ca say deck started and use state for this
      drawnCard(null)
      setDeckOver(false)
      setMessage("Deck started,start drawing!")
    } catch (e) {
      console.error("error with starting deck and retrieving deck_id", e);
    }
  }

  const drawCard = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/${deckId}/draw?count=1`);
      if (resp.data.remaining === 0) {
        setDeckOver(true);
        setMessage("No more cards remaining, click start to retart deck and get to drawing!")
      }
      const cardDrawn = resp.data.cards[0];
      drawnCard({
        src: cardDrawn.image,
        value: cardDrawn.value,
        suit: cardDrawn.suit,
      });
      setMessage("")
     
      console.log("cardDrawn", cardDrawn);
      console.log("cardDrawn image", cardDrawn.image);
    } catch (e) {
      console.error(e, "error in drawing card");
    }
  };

  const shuffleDeck = async () => {
    try {
      const resp = await axios.get(`${BASE_URL}/${deckId}/shuffle`);
      console.log("At shuffle", resp.data.deck_id);
      drawnCard(null)
      setMessage("Deck Shuffled!")
    } catch (e) {
      console.error(e, "error in shuffling deck");
    }
  };

useEffect(function startTimer(){
  if(message){
    const msgTimer = setTimeout(()=>setMessage(""),3000)
    return ()=> clearTimeout(msgTimer)
  }
},[message])

  return (
    <div className="CardPage-buttons">
      <button className="CardPage-buttons-start" onClick={startDeck}>
        Start
      </button>

      <button className="CardPage-buttons-draw" onClick={drawCard}>
        Draw
      </button>
      <button className="CardPage-buttons-shuffle" onClick={shuffleDeck}>
        Shuffle
      </button>
      {message&&<h5>{message}</h5>}
    </div>
  );
}

export default CardPage;
