import React from 'react';
import '../css/pokecard.css';

// PROPS
// Name, Number, Brief Description and Image

class PokeCard extends React.Component {

    render () {
        return(
            <div className="card">
                <img src={this.props.imageSrc} alt="Avatar" style={{width: "100%"}} />
                <div class="container">
                    <div className="black">
                        <h1><b>{this.props.name}</b></h1>
                        <p>Order #{`${this.props.number}`}</p>
                        <p>{this.props.desc}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokeCard;