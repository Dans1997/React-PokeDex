import React from 'react';
import PokeType from './poketype';
import { renderPokeType } from "./pokecard";
import axios from 'axios';
import '../css/pokedetails.css'

import { Input, Menu, Button, Card, Image } from 'semantic-ui-react';

class PokeDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state =  {
            name : null,
            imageUrl: null,
            pokemonIndex: null,
            pokemonDescription: null,
            types: null,
            pokemonAbilities: null,
            pokemonMoves: null,
            pokemonStats: null,
            activeItem: 'About'
        }
    }

    componentDidMount() {
        const 
        {
            name,
            imageUrl,
            pokemonIndex,
            pokemonDescription,
            types,
            pokemonAbilities,
            pokemonMoves,
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
        } = this.props.location.state;


        this.setState({
            name,
            imageUrl,
            pokemonIndex,
            pokemonDescription,
            types,
            pokemonAbilities,
            pokemonMoves,
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
        })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    renderAbout = () => {
        return(
            <div className="ui centered main card">
                <div className="content">
                    <div className="ui centered header"><h1>{this.state.name}</h1></div>

                    <div className="ui centered header" style={{margin: "auto"}}>
                        {renderPokeType(this.state.types).map(item => <PokeType key={item} type={item} />)}
                    </div>

                    <div className="ui centered header" style={{margin: "auto", height: "250px"}}>
                        <div className="ui image"> <img src={this.state.imageUrl} /></div>
                    </div>                    
                    <div className="meta"><span className="date">#{`${this.state.pokemonIndex}`}</span></div>


                    <div className="ui horizontal divider">DESCRIPTION</div>

                    <div className="description">
                        {this.state.pokemonDescription}
                    </div>

                    <div className="ui segment">
                        <div className="ui very relaxed two column grid">
                            <div className="column">
                                <p style={{color:"black"}}>{this.state.pokemonHeight} CM</p>
                            </div>
                            <div className="column">
                                <p style={{color:"black"}}>{this.state.pokemonWeight} KG</p>
                            </div>
                        </div>
                        <div className="ui vertical divider"></div>
                    </div>  

                    <div className="ui horizontal divider">ABILITIES</div>
                    <div className="description">
                        {this.state.pokemonAbilities}
                    </div>

                    <div className="ui horizontal divider">BREEDING</div>

                    <div className="description">
                        <p>Gender Ratio: <i className="ui man icon"></i>{this.state.pokemonGenderRate} - 1<i className="ui woman icon"></i> </p>
                        <p>Gender Differences: {this.state.hasGenderDiffs} </p>
                        <p>Egg Groups: {this.state.pokemonEggGroups} </p>
                        <p>Hatch Counter: {this.state.pokemonHatchCounter} Steps </p>
                    </div>
                </div>
            </div>
        );
    }

    renderBaseStats = () => {

        var stats = [];
        this.state.pokemonStats? stats = this.state.pokemonStats : stats = ['0', '0', '0', '0', '0'];

        return(
            <div className="ui centered main card">
                <div className="content">
                    <div className="ui centered header"><h1>{this.state.name}</h1></div>

                    <div className="ui centered header" style={{margin: "auto"}}>
                        {renderPokeType(this.state.types).map(item => <PokeType key={item} type={item} />)}
                    </div>

                    <div className="ui centered header" style={{margin: "auto", height: "250px"}}>
                        <div className="ui image"> <img src={this.state.imageUrl} /></div>
                    </div>                    
                    <div className="meta"><span className="date">#{`${this.state.pokemonIndex}`}</span></div>


                    <div className="ui horizontal divider">Base Stats</div>

                    <div className="description">
                        <p>Speed: {stats[0]}</p>
                        <p>Special Defense: {stats[1]}</p>
                        <p>Special Attack: {stats[2]}</p>
                        <p>Defense: {stats[3]}</p>
                        <p>Attack: {stats[4]}</p>
                        <p>HP: {stats[5]}</p>
                    </div>
                </div>
            </div>
        );
    }

    isOdd = (num) => {
        return num % 2;
    }

    processEvolutionDetails = (details) => {
        if(!details) { 
            return "No Details"; 
        }

        if (!details.trigger) {
            return "Error";
        }

        var detailsArray = [];

        if (details.gender) detailsArray.push("Requires gender " + details.gender) ;
        if (details.held_item) detailsArray.push("Requires holding " + details.held_item.name) ;
        if (details.item) detailsArray.push("Requires " + details.item.name);
        if (details.known_move) detailsArray.push("Requires known move " + details.known_move.name);
        if (details.known_move_type) detailsArray.push("Requires known move type " + details.known_move_type.name);
        if (details.location) detailsArray.push("Requires levelling up at " + details.location.name); //TODO: WHEN LOCATION LENGTH IS BIGGER THAN 1
        if (details.min_affection) detailsArray.push("Requires minimum affection of " + details.min_affection);
        if (details.min_beauty) detailsArray.push("Requires minimum beauty of " + details.min_beauty);
        if (details.min_happiness) detailsArray.push("Requires minimum happiness of " + details.min_happiness);
        if (details.min_level) detailsArray.push("Requires minimum level of " + details.min_level);
        if (details.needs_overworld_rain !== null) {
            if (details.needs_overworld_rain === true)
            detailsArray.push("Requires overworld rain");
        }
        //if (details.party_species) 
        //if (details.party_type)
        //if (details.relative_physical_stats)
        if (details.time_of_day) detailsArray.push("Requires levelling up at " + details.time_of_day);
        //if (details.trade_species)
        if (details.turn_upside_down !== null) {
            if (details.turn_upside_down === true)
            detailsArray.push("Requires to turn upside down");
        }

        if(detailsArray.length > 1) {
            let detailsString = "";
            detailsArray.forEach((element, index) => {
                if (index === 0) {
                    detailsString += element;
                } else {
                    detailsString += " & " + element;
                }
            })
            return detailsString;
        }

        return detailsArray[0];
    }

    renderEvolutionChain = (evolutionArray) => {
        if(!evolutionArray) { return; }

        console.log(evolutionArray);

        let firstPokemon = evolutionArray[0];
            firstPokemon = firstPokemon[0].toUpperCase() + firstPokemon.slice(1)
        let secondPokemonArray = evolutionArray[1];
            var aux = 0;
            var secondInstanceEvolutions = [" "];
             secondPokemonArray.forEach((element) => {
                if(!element[0]) return " "; 

                if(element[0].length > 1 && typeof(element[0]) !== typeof "string") 
                {
                    // Get Pokemon Name
                    console.log(element[0]);
                    let aux2 = element[0];
                    secondInstanceEvolutions.push(aux2[0]);

                    // Process Evolution Details (Second Instance)
                    let detailsObj = aux2[1];
                    let processedDetails = this.processEvolutionDetails(detailsObj[0]);
                    secondInstanceEvolutions.push(processedDetails);
                }
                else
                {
                    // Get Pokemon Name
                    secondInstanceEvolutions.push(element[0]);

                    // Get Evolution Details (First Instance)
                    let aux2 = element[1];
                    if(aux2) 
                    {
                        let detailsObj = aux2[0];
                        let processedDetails = this.processEvolutionDetails(detailsObj);
                        secondInstanceEvolutions.push(processedDetails);
                    }
                }

                console.log(secondInstanceEvolutions[aux], aux)
                aux++;
                return aux;
            });
            secondInstanceEvolutions = secondInstanceEvolutions.slice(1);
            console.log(secondInstanceEvolutions);

        return secondInstanceEvolutions.map((elem,index) => {
            if(!this.isOdd(index))
            {
                let evolutionName = elem[0].toUpperCase() + elem.slice(1);
                let details = secondInstanceEvolutions[index + 1];

                return (
                    <div>
                        <p> {firstPokemon} evolves to {evolutionName} </p>
                        <p> {details} </p>
                        <div className="ui horizontal divider"> </div>
                    </div>
                );
            }
        }); 
    }

    renderEvolution = () => {
        return(
            <div className="ui centered main card">
                <div className="content">
                    <div className="ui centered header"><h1>{this.state.name}</h1></div>

                    <div className="ui centered header" style={{margin: "auto"}}>
                        {renderPokeType(this.state.types).map(item => <PokeType key={item} type={item} />)}
                    </div>

                    <div className="ui centered header" style={{margin: "auto", height: "250px"}}>
                        <div className="ui image"> <img src={this.state.imageUrl} /></div>
                    </div>                    
                    <div className="meta"><span className="date">#{`${this.state.pokemonIndex}`}</span></div>

                    <div className="ui horizontal divider">EVOLUTION CHAIN</div>

                    <div className="description"> 
                        {this.renderEvolutionChain(this.state.evolutionArray)}
                    </div>

                    <div className="ui horizontal divider">GROWTH RATE</div>
                    <div className="description">
                        {this.state.pokemonGrowthRate}
                    </div>

                    <div className="ui horizontal divider">BABY</div>
                    <div className="description">
                        {this.state.isPokemonBaby}
                    </div>
                </div>
            </div>
        );
    }

    render(){
        const { activeItem } = this.state;

        var about = 'hidden';
        var stats = 'hidden';
        var evolution = 'hidden';

        switch (activeItem) {
            case "About":
                about = 'visible';
                break;
            case "Base Stats":
                stats = 'visible';
                break;
            case "Evolution":
                evolution = 'visible';
                break;
            default:
                about = 'visible';
                break;
        }

        return(
            <div className="ui centered header"> 
                <Menu secondary >
                    <Menu.Item
                    name='About'
                    active={activeItem === 'About'}
                    onClick={this.handleItemClick}
                    style={{color: "ivory"}}
                    />
                    <Menu.Item
                    name='Base Stats'
                    active={activeItem === 'Base Stats'}
                    onClick={this.handleItemClick}
                    style={{color: "ivory"}}
                    />
                    <Menu.Item
                    name='Evolution'
                    active={activeItem === 'Evolution'}
                    onClick={this.handleItemClick}
                    style={{color: "ivory"}}
                    />
                </Menu>

                <Card.Group>

                    <Card className={about}>
                        { this.renderAbout() }
                    </Card>

                    <Card className={stats}>
                        { this.renderBaseStats() }
                    </Card>

                    <Card className={evolution}>
                        { this.renderEvolution() }
                    </Card>
                    
                </Card.Group>
            </div>
        );
    }
}

export default PokeDetails;