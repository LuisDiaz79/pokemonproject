import React from "react";

export class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oponentPokemon:{},
            playerPokemon:{},
            player: ""
        }
    }

    render() {
        const {oponentPokemon, playerPokemon, player} = this.props;
        return (
            <div className="game">
                { (!oponentPokemon || oponentPokemon.pokemonName ==="") ? console.log('out') : (
                    <div className="opponent">
                        <StatsContainer pokemonName={oponentPokemon.pokemonName} lvl={oponentPokemon.level}/>
                        <img className="pokemon" src={oponentPokemon.pokemonImg} alt="A sprite of charizard" />
                    </div>
                    
                )
        
                }
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
        let {pokemonName, lvl} = this.props;
        return (
            <div>
            {
                (!this.props.pokemonName || this.props.pokemonName ==="")?"OUT" : (
                    
                <div className="stats">
                    <div className="top">
                        <PokeballContainer hp={this.state.hp} />
                        <div id="apHP" className="hp-count">
                            {this.state.hp};
                        </div>
                    </div>
                    <span className="name">
                        {` ${pokemonName} `}
                    </span>
                    <span className="level">
                        {` ${lvl}`}
                    </span>
                </div>
                )
            }
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
            table.push( <div key={i} className="pokeball"></div>)
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