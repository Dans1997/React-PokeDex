import React from 'react';
import '../css/poketype.css';

const TYPE_COLORS = {  
    Bug: '#B1C12E',  
    Dark: '#4F3A2D',  
    Dragon: '#755EDF',  
    Electric: '#FCBC17',  
    Fairy: '#F4B1F4',  
    Fighting: '#823551D',  
    Fire: '#E73B0C',  
    Flying: '#A3B3F7',  
    Ghost: '#6060B2',  
    Grass: '#74C236',  
    Ground: '#D3B357',  
    Ice: '#A3E7FD',  
    Normal: '#C8C4BC',  
    Poison: '#934594',  
    Psychic: '#ED4882',  
    Rock: '#B9A156',  
    Steel: '#B5B5C3',  
    Water: '#3295F6'
};

class PokeType extends React.Component {
    constructor(props) {
        super(props);
        this.state={type: " "};
    }

    componentDidMount() {
        this.setState( { type: this.props.type } )
    }

    render(){
        return(
            <div className={`ui horizontal ${this.state.type} label`} > 
                {this.state.type} 
            </div>
        );
    }
}

export default PokeType;