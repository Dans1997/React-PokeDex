import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import PokeType from './poketype';
import '../css/pokecard.css'
import '../css/poketype.css';

// PROPS
// Name, Number, Brief Description and Image

class PokeCard extends React.Component {

    constructor(props) 
    {
        super(props);
        this.state = {
            name: " ",
            imageUrl: " ",
            pokemonIndex: " ",
            pokemonDescription: " ",
            types: null,
            pokemonResponse: {},
            pokemonSpeciesResponse: {}
        }
    }


    async componentDidMount() {
        const { name, url } = await this.props;
        var str = name;
        var nameUpperCase = str[0].toUpperCase() + str.slice(1);
        const pokemonIndex = url.split('/')[Object.keys(url.split('/')).length - 2]

        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`;

        // pokemon/pokemonIndex
        const pokemonResponse = await axios.get(url);
        var types = pokemonResponse.data.types;

        // pokemon-species/pokemonIndex -> Where the Flavor Texts are stored
        const pokemonSpeciesResponse = await axios.get(pokemonResponse.data.species.url);

        // Get all flavor texts in English
        var flavorTexts = pokemonSpeciesResponse.data.flavor_text_entries.map((flavorText, index) => {
            if (flavorText.language.name === 'en') {
                return flavorText.flavor_text;
            }
            else return 0;
        });

        var pokemonDescriptionsEn = [];
        var aux = 0;

        for (var i = 0; i < flavorTexts.length; i++) {
            if (flavorTexts[i] !== 0) {
                pokemonDescriptionsEn.push(flavorTexts[i]);
            }
        }

        var pokemonDescription = pokemonDescriptionsEn[Math.floor(Math.random() * pokemonDescriptionsEn.length)];

        this.setState({
            name: nameUpperCase,
            imageUrl,
            pokemonIndex,
            pokemonDescription,
            types,
            pokemonResponse,
            pokemonSpeciesResponse,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.types !== this.state.types) {
            this.renderPokeType(this.state.types);
        }
    }

    renderPokeType = (types) => {

        var typesArray = [];

        if (types) {
            typesArray = types;
        }

        const auxArray = typesArray.map(element => {
            var str = element.type.name;
            var nameUpperCase = str[0].toUpperCase() + str.slice(1);
            return nameUpperCase;
        })

        return auxArray;
    }

    onClick = (event) => {
        event.preventDefault();

        console.log("Clicked on card!");

        let {name, imageUrl, pokemonIndex, pokemonDescription, types} = this.state;
        let pokemonAbilities = this.state.pokemonResponse.abilities
        let pokemonMoves = this.state.pokemonResponse.moves
        let pokemonStats = this.state.pokemonResponse.stats

        this.props.history.push({
            pathname: `/details/${this.state.pokemonIndex}`,
            state: {
                name,
                imageUrl,
                pokemonIndex,
                pokemonDescription,
                types,
                pokemonAbilities: pokemonAbilities,
                pokemonMoves : pokemonMoves,
                pokemonStats : pokemonStats
                }
        })
    }

    render() {
        return (
            <div className="three wide column" >
                <div className={`ui link card`} onClick={this.onClick}>
                    <div className="ui image"><img src={this.state.imageUrl} /> </div>
                    <a className={`ui orange left ribbon label`}>Summary</a>
                    <div className="content" >
                        <div className="header">{this.state.name}</div>
                        <div className="meta"><span className="date">No. {`${this.state.pokemonIndex}`}</span></div>
                        <div className="description" >
                            {this.state.pokemonDescription}
                        </div>
                        <div className="types" style={{marginTop: '100%'}}>
                                {this.renderPokeType(this.state.types).map(item => <PokeType key={item} type={item} />)}
                        </div>
                    </div>
                    <div className="extra content">
                        Click to see more about this Pokémon!
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PokeCard);
