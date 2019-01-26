import React from "react";

export function Home() {
  return (
    <div>
      <div id="fade">
        <header>
          <img src="assets/pokemon_logo.png"/>
        </header>
          <section class="container">
            <center>
              <input type="text" id='title' placeholder="Enter In Pokedex Number"/><br/>
                <button id='call' type="submit">Pokedex</button>
                <button id='battle' type="submit">Battle!!</button>
                <br/>
            </center>
            <div class='results col-xs-offset-1 col-xs-4 '>
                <h3>Top 5 Player</h3>s
                <div id='results'>
                </div>
            </div>
            <div class='enemy col-xs-offset-2 col-xs-4'>
              <h3>Opponent:</h3>
              <div id='enemy'></div>
            </div>
           </section>
      </div>
    </div>
   
  );
}

