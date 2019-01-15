import React from "react";

export function CharacterIMG({ gender, selected }) {
  return (
    <div>
      <img src={`./assets/images/${gender}.jpg`} alt={gender} className={`hvr-grow char-selected ${selected ===0 ? 'imgNoSelected' : 'imgSelected'}`}/>
    </div>
  );
}

