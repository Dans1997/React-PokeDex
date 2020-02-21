import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import PokeType from './poketype';
import '../css/pokecard.css'
import '../css/poketype.css';

// PROPS
// Name, Number, Brief Description and Image

export function renderPokeType (types) {

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
            pokemonResponse: pokemonResponse.data,
            pokemonSpeciesResponse: pokemonSpeciesResponse.data,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.types !== this.state.types) {
            renderPokeType(this.state.types);
        }
    }

    onClick = (event) => {
        event.preventDefault();

        console.log("Clicked on card!");

        let {name, imageUrl, pokemonIndex, pokemonDescription, types} = this.state;
        let pokemonAbilities = this.state.pokemonResponse.abilities
        let pokemonMoves = this.state.pokemonResponse.moves

        // Pokemon Stats
        let pokemonHeight = this.state.pokemonResponse.height * 10;
        let pokemonWeight = this.state.pokemonResponse.weight / 10;
        let pokemonStats = this.state.pokemonResponse.stats.map(elem=>elem.base_stat);

        // Pokemon Species Data
        let pokemonBaseHappiness = this.state.pokemonSpeciesResponse.base_hapiness;
        let pokemonCaptureRate = this.state.pokemonSpeciesResponse.capture_rate;
        let pokemonEggGroups = this.state.pokemonSpeciesResponse.egg_groups.map((elem,index) => {
            var str = elem.name; 
            if(index >= Object.keys(this.state.pokemonSpeciesResponse.egg_groups).length - 1) return str[0].toUpperCase() + str.slice(1) + ' ';
            return str[0].toUpperCase() + str.slice(1) + ', ';
        });
        let evolvesFrom = this.state.pokemonSpeciesResponse.evolves_from_species;
        let evolutionChainURL = this.state.pokemonSpeciesResponse.evolution_chain.url;
        let pokemonGenderRate = this.state.pokemonSpeciesResponse.gender_rate;
        let pokemonGrowthRate = this.state.pokemonSpeciesResponse.growth_rate.name;
        let pokemonGrowthRateUrl = this.state.pokemonSpeciesResponse.growth_rate.url;
        let hasGenderDiffs = this.state.pokemonSpeciesResponse.has_gender_differences ? 'Existent' : 'None';
        let pokemonHatchCounter = this.state.pokemonSpeciesResponse.hatch_counter * 250;
        let isPokemonBaby = this.state.pokemonSpeciesResponse.is_baby ? 'Yes' : 'No';

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
                pokemonHeight,
                pokemonWeight,
                pokemonGenderRate,
                hasGenderDiffs,
                pokemonHatchCounter,
                isPokemonBaby,
                pokemonStats,
                pokemonBaseHappiness,
                pokemonCaptureRate,
                evolvesFrom,
                evolutionChainURL,
                pokemonGrowthRate,
                pokemonGrowthRateUrl,
                pokemonEggGroups
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
                                {renderPokeType(this.state.types).map(item => <PokeType key={item} type={item} />)}
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
