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

    processEvolutionDetails = (details) => {
        /* EXAMPLE EVOLUTION DETAIL
        gender: null
        held_item: null
        item: null
        known_move: null
        known_move_type: null
        location: null
        min_affection: null
        min_beauty: null
        min_happiness: null
        min_level: 16
        needs_overworld_rain: false
        party_species: null
        party_type: null
        relative_physical_stats: null
        time_of_day: ""
        trade_species: null
        trigger: {name: "level-up", url: "https://pokeapi.co/api/v2/evolution-trigger/1/"}
        turn_upside_down: false
        */
    }

    renderEvolutionChain = (evolutionArray) => {
        if(!evolutionArray) { return; }

        console.log(evolutionArray);

        let firstPokemon = evolutionArray[0];
        let secondPokemonArray = evolutionArray[1];
            var aux = 0;
            var secondInstanceEvolutions = [" "];
             secondPokemonArray.forEach((element) => {
                if(!element[0]) return " "; 

                if(element[0].length > 1 && typeof(element[0]) !== typeof "string") 
                {
                    console.log(element[0]);
                    let aux2 = element[0];
                    secondInstanceEvolutions.push(aux2[0]);
                    // let details = this.processEvolutionDetails(aux[1]);
                }
                else
                {
                    secondInstanceEvolutions.push(element[0]);
                }

                console.log(secondInstanceEvolutions[aux], aux)
                aux++;
                return aux;
            });
            console.log(secondInstanceEvolutions.slice(1));

        return (
            <div>
                {firstPokemon} evolves to {} at level {}
            </div>
        );
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
                        Evolves from: {this.state.evolvesFrom}
                    </div> <br/>

                    <div className="description">
                        Evolves to 
                        <div className="lel" style={{margin: "auto", height: "96px"}}>
                            <div className="img"> <img src={this.state.imageUrl} /></div>
                        </div> 
                        at level 
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

    renderMoves = () => {
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
                                <p style={{color:"black"}}>Height: {this.state.pokemonHeight} cm</p>
                            </div>
                            <div className="column">
                                <p style={{color:"black"}}>Weight: {this.state.pokemonWeight} Kg</p>
                            </div>
                        </div>
                        <div className="ui vertical divider"></div>
                    </div>  

                    <div className="ui horizontal divider">BREEDING</div>

                    <div className="description"><h4> Gender Ratio: <i className="ui man icon"></i>{this.state.pokemonGenderRate} - 1<i className="ui woman icon"></i> </h4> </div>
                    <div className="description"><h4> Gender Differences: {this.state.hasGenderDiffs} </h4> </div>                   
                    <div className="description"><h4> Egg Groups: {this.state.pokemonEggGroups} </h4> </div>
                    <div className="description" ><h4> Hatch Counter: {this.state.pokemonHatchCounter} Steps </h4>
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
        var moves = 'hidden';

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
            case "Moves":
                moves = 'visible';
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
                    <Menu.Item
                    name='Moves'
                    active={activeItem === 'Moves'}
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

                    <Card className={moves}>
                        { this.renderMoves() }
                    </Card>
                    
                </Card.Group>
            </div>
        );
    }
}

export default PokeDetails;