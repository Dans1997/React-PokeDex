import React from 'react';
import axios from 'axios';
import PokeType from './poketype';
import '../css/pokecard.css'

// PROPS
// Name, Number, Brief Description and Image

class PokeCard extends React.Component {

    state = {
        name: " ",
        imageUrl: " ",
        pokemonIndex: " ",
        pokemonDescription: " ",
        types: null,
        typesa: [],
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
        var flavorTexts = apiResponse2.data.flavor_text_entries.map((flavorText, index) => {
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
            types
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

        typesArray.map(element => {
            var str = element.type.name;
            var nameUpperCase = str[0].toUpperCase() + str.slice(1);
            this.setState({ typesa: [...this.state.typesa, nameUpperCase] })
        })
        /*
                typesArray.forEach(element => {
                    var str = element.type.name;
                    var nameUpperCase = str[0].toUpperCase() + str.slice(1);
                    console.log(nameUpperCase)
                    return <PokeType type={nameUpperCase}/>;
                });*/

        // return <PokeType type="Poison"/>
    }

    render() {
        let { typesa } = this.state;
        return (
            <div className="three wide column" >
                <div className={`ui link card`} >
                    <div className="ui image"><img src={this.state.imageUrl} style={{ width: "250px" }} /> </div>
                    <a className="ui orange left ribbon label">Some Other Info</a>
                    <div className="content" >
                        <div className="header">{this.state.name}</div>
                        <div className="meta"><span className="date">No. {`${this.state.pokemonIndex}`}</span></div>
                        <div className="description">
                            {this.state.pokemonDescription}
                            <div className="types">
                                {typesa.length > 0 && typesa.map(item => <PokeType type={item} />)}
                            </div>
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
