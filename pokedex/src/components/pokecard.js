import React from 'react';
import '../css/pokecard.css'

// PROPS
// Name, Number, Brief Description and Image

class PokeCard extends React.Component {

    state = {
        name: " ",
        imageUrl: " ",
        pokemonIndex: " "
    }

    componentDidMount() {
        const { name, url } = this.props;

        var str = name;

        var nameUpperCase = str[0].toUpperCase() + str.slice(1);

        const pokemonIndex = url.split('/')[Object.keys(url.split('/')).length - 2]

        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`

        this.setState({
            name: nameUpperCase,
            imageUrl,
            pokemonIndex
        })
    }

    render () {

        var color = ' ';

        switch(this.props.desc)
        {
            case 'Grass':
                color = 'green';
                break;
            case 'Fire':
                color = 'orange';
                break;
            case 'Water':
                color = 'blue';
                break;
        }

        console.log(color);

        return(
            <div className="three wide column" >
                <div className={`ui ${color} card`} >
                    <div className="image"><img src={this.state.imageUrl} style={{width: "250px"}}/> </div>
                    <div className="content" >
                        <div className="header">{this.state.name}</div>
                        <div className="meta"><span className="date">No. {`${this.state.pokemonIndex}`}</span></div>
                        <div className="description">{`${this.props.desc} Pokémon`}</div>
                    </div>
                    <div className="extra content">
                        <a>
                            Details
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokeCard;

/** 
 <div className={`card ${ this.props.desc }` }>
                <img src={this.props.imageSrc} alt="Avatar" style={{width: "100%"}} />
                <div className="container">
                    <div className="black">
                        <h1><b>{this.props.name}</b></h1>
                        <p>No. {`${this.props.number}`}</p>
                        <p>{`${this.props.desc} Pokémon`}</p>
                    </div>
                </div>
            </div>
*/