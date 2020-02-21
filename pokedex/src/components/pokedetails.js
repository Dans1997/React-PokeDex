import React from 'react';
import PokeType from './poketype';
import { renderPokeType } from "./pokecard";
import '../css/pokedetails.css'

import { Tabs } from 'antd';
const { TabPane } = Tabs;

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
            evolvesFrom,
            evolutionChainURL,
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
            evolvesFrom,
            evolutionChainURL,
            pokemonGrowthRate,
            pokemonGrowthRateUrl,
            pokemonEggGroups
        })
    }

    render(){
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
                    <div className="meta"><span className="date">Pokédex No. {`${this.state.pokemonIndex}`}</span></div>


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
}

export default PokeDetails;

/** 
 *                         <i className="ui man icon"></i>80%
                        <i className="ui woman icon"></i>20%
*/