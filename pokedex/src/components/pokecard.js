import React from 'react';
import axios from 'axios';
import '../css/pokecard.css'

// PROPS
// Name, Number, Brief Description and Image

const TYPE_COLORS = {  
    bug: 'B1C12E',  
    dark: '4F3A2D',  
    dragon: '755EDF',  
    electric: 'FCBC17',  
    fairy: 'F4B1F4',  
    fighting: '823551D',  
    fire: 'E73B0C',  
    flying: 'A3B3F7',  
    ghost: '6060B2',  
    grass: '74C236',  
    ground: 'D3B357',  
    ice: 'A3E7FD',  
    normal: 'C8C4BC',  
    poison: '934594',  
    psychic: 'ED4882',  
    rock: 'B9A156',  
    steel: 'B5B5C3',  
    water: '3295F6'
};

class PokeCard extends React.Component {

    state = {
        name: " ",
        imageUrl: " ",
        pokemonIndex: " ",
        pokemonDescription: " ",
        types: null
    }

    async componentDidMount() {
        const { name, url } = await this.props;

        var str = name;
        var nameUpperCase = str[0].toUpperCase() + str.slice(1);
        const pokemonIndex = url.split('/')[Object.keys(url.split('/')).length - 2]

        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

        // pokemon/pokemonIndex
        const apiResponse1 = await axios.get(url);
        var types = apiResponse1.data.types;

        // pokemon-species/pokemonIndex -> Where the Flavor Texts are stored
        const apiResponse2 = await axios.get(apiResponse1.data.species.url);

        // Get all flavor texts in English
        var flavorTexts = apiResponse2.data.flavor_text_entries.map( (flavorText, index) => {
            if (flavorText.language.name === 'en' ) {
                return flavorText.flavor_text;
            }
            else return 0;
        });

        var pokemonDescriptionsEn = [];
        var aux = 0;

        for (var i = 0; i < flavorTexts.length; i++) {
            if(flavorTexts[i] !== 0)
            {
                pokemonDescriptionsEn.push( flavorTexts[i] );
            }
        }

        var pokemonDescription = pokemonDescriptionsEn[Math.floor(Math.random() * pokemonDescriptionsEn.length)];

        this.setState({
            name: nameUpperCase,
            imageUrl,
            pokemonIndex,
            pokemonDescription,
            types
        })
    }

    renderTypeLabels = () => {

        if(!this.state.types) { return; }

        var types = this.state.types;

        console.log(types.map(type => type.type.name))

        types.map(type => {

            var typeUpperCase = (type.type.name)[0].toUpperCase() + (type.type.name).slice(1);

            return <div className={`ui horizontal ${type.type.name} label`}>{typeUpperCase}} </div>
        })
    }

    render () {
        return(
            <div className="three wide column" >
                <div className={`ui link card`} >
                    <div className="ui image"><img src={this.state.imageUrl} style={{width: "250px"}}/> </div>
                    <a className="ui orange left ribbon label">Some Other Info</a>
                    <div className="content" >
                        <div className="header">{this.state.name}</div>
                        <div className="meta"><span className="date">No. {`${this.state.pokemonIndex}`}</span></div>
                        <div className="description">
                            {this.state.pokemonDescription}
                            { this.renderTypeLabels() }
                        </div>
                    </div>
                    <div className="extra content">
                        <a href={this.state.url}>
                            Details
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokeCard;
