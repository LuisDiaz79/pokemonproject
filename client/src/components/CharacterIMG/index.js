import React from "react";

class CharacterIMG extends React.Component{
	constructor(props){
		super(props);
		this.state ={

		}
	}
	render(){
		const {gender, chosen} = this.props;

		return(
			<div>
			  <img src={`./assets/images/${gender}.png`} alt={gender} className={chosen} onClick={() => this.props.toggleChosen(gender)}/>
			</div>
		);
	}
}

export default CharacterIMG;
	