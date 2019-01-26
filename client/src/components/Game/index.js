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
        const {opponentPokemon, playerPokemon, player} = this.props;
        return (
            <div className="game">
                { 
                    (!opponentPokemon || opponentPokemon.pokemonName ==="") ? console.log('out') : (
                        <div className="opponent">
                            <StatsContainer pokemonName={opponentPokemon.pokemonName} lvl={opponentPokemon.level} hp={opponentPokemon.hp}/>
                            <img className="pokemon" src={opponentPokemon.pokemonImg} alt="A sprite of charizard" />
                        </div>
                    )
                }
                {
                    (
                        !playerPokemon || playerPokemon.pokemonName ==="") ? console.log('out') : (
                        <div className="player">
                            <StatsContainer pokemonName={playerPokemon.name} lvl={player.level} hp={player.hp}/>
                        <img className="pokemon" src={playerPokemon.imageURL} alt="Player Pokemon" />
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
        let {pokemonName, lvl, hp} = this.props;
        return (
            <div>
            {
                (!this.props.pokemonName || this.props.pokemonName ==="")?"OUT" : (
                    
                <div className="stats">
                    <div className="top">
                        <PokeballContainer hp={hp} />
                        <div id="apHP" className="hp-count">
                            {hp};
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
            hp :0,
            pokeballs: 10
        }
    }

    componentDidMount(){
        this.setState({
            hp: this.props.hp
        });
    }


    showPokeballs = () => {

        // let hp = this.props.hp;
        // let pokeball = hp % 10;
        // console.log(pokeball);

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