import React from 'react';
import '../css/poketype.css';

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
            <div className={`ui horizontal ${this.state.type} label`}> 
                    {this.state.type} 
            </div>
        );
    }
}

export default PokeType;