import React from 'react';
import axios from 'axios';
import '../css/pokecard.css'

// PROPS
// Name, Number, Brief Description and Image

class PokeCard extends React.Component {

    state = {
        name: " ",
        imageUrl: " ",
        pokemonIndex: " ",
        pokemonDescription: " "
    }

    async componentDidMount() {
        const { name, url } = await this.props;

        var str = name;

        var nameUpperCase = str[0].toUpperCase() + str.slice(1);

        const pokemonIndex = url.split('/')[Object.keys(url.split('/')).length - 2]

        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

        // API Request to get pokemon description
        const apiResponse1 = await axios.get(url);
        const apiResponse2 = await axios.get(apiResponse1.data.species.url);
        //const pokemonDescription = apiResponse2.data.flavor_text_entries.flavor_text.en;

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
            if(flavorTexts[i] != 0)
            {
                pokemonDescriptionsEn.push( flavorTexts[i] );
            }
        }

        var pokemonDescription = pokemonDescriptionsEn[Math.floor(Math.random() * pokemonDescriptionsEn.length)];

        //console.log(pokemonDescriptionEn)

        this.setState({
            name: nameUpperCase,
            imageUrl,
            pokemonIndex,
            pokemonDescription
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

        //console.log(color);

        return(
            <div className="three wide column" >
                <div className={`ui ${color} link card`} >
                    <div className="ui image"><img src={this.state.imageUrl} style={{width: "250px"}}/> </div>
                    <div className="content" >
                        <div className="header">{this.state.name}</div>
                        <div className="meta"><span className="date">No. {`${this.state.pokemonIndex}`}</span></div>
                        <div className="description">{this.state.pokemonDescription}</div>
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
