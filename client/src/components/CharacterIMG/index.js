import React from "react";

class CharacterIMG extends React.Component{
	constructor(props){
		super(props);
		this.state ={

		}
	}
	render(){
		const {gender, chosen} = this.props;
		console.log(typeof this.props.toggleChosen);
		return(
			<div>
			  <img src={`./assets/images/${gender}.jpg`} alt={gender} className={chosen} onClick={() => this.props.toggleChosen(gender)}/>
			</div>
		);
	}
}

export default CharacterIMG;
	