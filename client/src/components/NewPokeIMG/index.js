import React from "react";

class NewPokeIMG extends React.Component{
	constructor(props){
		super(props);
		this.state ={

		}
	}
	render(){
		const {imageSRC, pokeChosen, pokeId} = this.props;
		// console.log(typeof this.props.pokeToggleChosen);
		return(
			<div>
			  <img src={`./assets/images/${imageSRC}`} alt={pokeId} className={pokeChosen}  onClick={() => this.props.pokeToggleChosen(pokeId)}/>
			</div>
		);
	}
}

export default NewPokeIMG;
	