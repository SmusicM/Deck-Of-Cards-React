import React, { useState, useEffect } from "react";
import "./App.css";


const Card = ({card}) =>{

  console.log("console log card ar Card",card)
  return(
    <div>
      {card? (
        <div className="CardPage-card-div">
          <h3></h3>
          <img src={card.src}></img>
        </div>
      ):(
        <p>No cards Drawn yet! Start drawing</p>
      )}
    </div>
  )
}

  export default Card;
  