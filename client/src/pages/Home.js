import React from "react";

export function Home() {
  return (
    <div className="home-header">
      <div id="fade">
        <header>
          <img className ="imag1" src="/assets/images/pokemon2_logo.png" alt=""/>
        </header>
          <section className="container">
            <center>
              <input type="text" id='title' placeholder="Enter In Pokedex Number"/><br/>
              <a href="https://react-pokedex.firebaseapp.com/#/">
                  <button className="button1" id='call' type="submit">Pokedex</button>
                </a>
                <a href="/login">
                  <button className="button1" id='battle' type="submit">Battle!!</button>
                </a>
                <br/>
            </center>
            <div className="row">
            <div className='results col-4 '>
                <h3>Top 5 Player</h3>
                <div id='results'>
                </div>
            </div>
            <div className='enemy offset-2 col-4'>
              <h3>Opponent:</h3>
              <div id='enemy'></div>
            </div>
            </div>
           </section>
      </div>
      
    </div>
   
  );
}

