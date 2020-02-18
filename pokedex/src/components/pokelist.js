import React from 'react';
//import '../css/pokelist.css';

// This component will print a list of PokeCards with their respective data

class PokeCard extends React.Component {

    renderPokeList = () => {
        return(
            <div>
                I will become a list!
            </div>
        );
    }

    render () {
        return(
            <div>
                {this.renderPokeList()}
            </div>
        );
    }
}

export default PokeList;