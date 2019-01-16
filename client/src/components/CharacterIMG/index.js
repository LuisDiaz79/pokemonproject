import React from "react";

class CharacterIMG extends React.Component{
	constructor(props){
		super();
	}
	
	render(){
		return(
			<div>
			  <img src={`./assets/images/${gender}.jpg`} alt={props.gender} className={this.props.chosen} onClick={this.props.toggleChosen(props.gender)} />
			</div>
		);
	}
}

export default CharacterIMG;
