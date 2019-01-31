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

    componentDidMount(){
        this.setState({
            oponentPokemon: this.props.opponentPokemon,
            playerPokemon: this.props.playerPokemon,
            player: this.props.player
        });
    }

    render() {
        const {opponentPokemon, playerPokemon, player} = this.props;
        return (
            <div className="game">
                { 
                    (!opponentPokemon || opponentPokemon.pokemonName ==="") ? console.log('out') : (
                        <div className="opponent">
                            <StatsContainer test="TOP" pokemonName={opponentPokemon.pokemonName} lvl={opponentPokemon.level} hp={opponentPokemon.hp} totalhp={opponentPokemon.totalhp}/>
                            <img className="pokemon" src={opponentPokemon.pokemonImg} alt="The pokemon ran" />
                        </div>
                    )
                }
                {
                    (
                        !playerPokemon && playerPokemon.pokemonName ==="" && player.hp) ? console.log('out') : (
                        <div className="player">
                            <StatsContainer test="BOT" pokemonName={playerPokemon.name} lvl={player.level} hp={player.hp} totalhp={player.totalhp}/>
                        <img className="pokemon" src={playerPokemon.animatedURL} alt="Player Pokemon" />
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
    }

    showPokeballs = () => {

        let totalhp = this.props.totalhp;
        let hp = this.props.hp;
        let pokeNum = 0;
        if(hp !== 0 ){
            pokeNum = totalhp/10;
            pokeNum = hp/pokeNum;
            pokeNum = parseInt((pokeNum === 10 )? 10:(pokeNum+1));
        }
        let table = []
        for (let i = 0; i < pokeNum; i++) {
            table.push( <div key={i} className="pokeball"></div>)
        }
        return table;
    }


    render() {
        let {pokemonName, lvl, hp} = this.props;
        return (
            <div>
            {
                (!pokemonName || pokemonName ==="")?"OUT" : (
                    
                <div className="stats">
                    <div className="top">
                        <div className="pokeballs">
                            {this.showPokeballs()}
                        </div>
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


