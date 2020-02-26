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

        // Get the evolution chain data
        let evolutionChainURL = pokemonSpeciesResponse.data.evolution_chain.url;
            let evolutionChainResponse = await axios.get(evolutionChainURL);
            let evolutionChainResponseData = evolutionChainResponse.data.chain;

            let evolutionArray = [];
            evolutionArray.push(evolutionChainResponseData.species.name);

            let thirdEvolutionArray = [];
            let secondEvolutionArray = evolutionChainResponseData.evolves_to.map(element => {

                if(element.evolves_to.length >= 1)
                {
                    let auxArray = element.evolves_to.map(otherElement => {
                        return [otherElement.species.name, otherElement.evolution_details];
                    })
                    thirdEvolutionArray = auxArray;
                }

                return [element.species.name, element.evolution_details];
            });
            secondEvolutionArray.push(thirdEvolutionArray);
            evolutionArray.push(secondEvolutionArray)

        var pokemonDescriptionsEn = [];
        var aux = 0;

        for (var i = 0; i < flavorTexts.length; i++) {
            if (flavorTexts[i] !== 0) {
                pokemonDescriptionsEn.push(flavorTexts[i]);
            }
        }

        var pokemonDescription = pokemonDescriptionsEn[Math.floor(Math.random() * pokemonDescriptionsEn.length)];
        console.log(evolutionArray)
        this.setState({
            name: nameUpperCase,
            imageUrl,
            pokemonIndex,
            pokemonDescription,
            types,
            evolutionArray, 
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
        let pokemonAbilities = this.state.pokemonResponse.abilities.map((ability,index) => {
            var str = ability.ability.name; 
            if(index >= Object.keys(this.state.pokemonSpeciesResponse.egg_groups).length - 1) return str[0].toUpperCase() + str.slice(1) + ' ';
            return str[0].toUpperCase() + str.slice(1) + ', ';
        });
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

        let evolutionArray = this.state.evolutionArray;
        let pokemonGenderRate = this.state.pokemonSpeciesResponse.gender_rate;
        let str2 = this.state.pokemonSpeciesResponse.growth_rate.name;
            str2 = str2.split('-').join(' ');
            var splitStr = str2.toLowerCase().split(' ');

            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            let pokemonGrowthRate = splitStr.join(' ');
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
                evolutionArray,
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
