import React from "react";

export class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonName: ""
        }
    }
    render() {
        const {oponentPokemon, playerPokemon} = this.props;
        return (
            <div>
                <div className="game">
                    <div className="opponent">
                        <StatsContainer name={oponentPokemon.name} />
                        <img className="pokemon" src="http://img.pokemondb.net/sprites/black-white/anim/normal/charizard.gif" alt="A sprite of charizard" />
                    </div>
                    <div className="player">
                        <StatsContainer name={playerPokemon.name} />
                        <img className="pokemon" src="http://bit.ly/blastoisegif" alt="A gif from blastoises back sprite" />
                    </div>
                </div>

                <div className="box">
                    <div id="message" className="message">
                        What should {"BLASTOIDE"} do?
                    </div>
                    <div className="actions">
                        <button onClick="waterCannon()">Water Cannon</button>
                        <button onClick="waterPulse()">Water Pulse</button>
                        <button onClick="surf()">Surf</button>
                        <button onClick="tackle()">Tackle</button>
                    </div>
                    <div className="continue">
                        <button onClick="compPokemon()">Continue</button>
                    </div>
                </div>
            </div>
        )
    }
}

export class StatsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonName: "",
            hp: 100,
            lvl : 1
        }
    }

    render() {
        return (
            <div>
                <div className="stats">
                    <div className="top">
                        <PokeballContainer hp={this.state.hp} />
                        <div id="apHP" className="hp-count">
                            {this.state.hp};
                        </div>
                    </div>
                    <span className="name">
                        {this.props.name}
                    </span>
                    <span className="level">
                        {this.state.lvl}
                    </span>
                </div>
            </div>
        )
    }
}


export class PokeballContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pokeballs: 10
        }
    }

    showPokeballs = () => {
        let table = []
        for (let i = 0; i < this.state.pokeballs; i++) {
            table.push(<Pokeball />)
        }
        return table;
    }

    render() {
        return (
            <div className="pokeballs">
                {this.showPokeballs()}
            </div>
        )
    }
}
export function Pokeball() {
    return <div className="pokeball"></div>;
}