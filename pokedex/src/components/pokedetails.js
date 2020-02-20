import React from 'react';
import '../css/pokedetails.css'
import { withRouter } from "react-router-dom";

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
            pokemonStats: null
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
            pokemonStats
        } = this.props.location.state;


        this.setState({
            name,
            imageUrl,
            pokemonIndex,
            pokemonDescription,
            types,
            pokemonAbilities,
            pokemonMoves,
            pokemonStats
        })
    }

    render(){
        return(
            <div className="ui centered main card">
                <div className="content">
                    <div className="ui secondary menu">
                        <a className="active item">
                            About
                            <div className="content">
                            </div>
                        </a>
                        <a className="item">Base Stats</a>
                        <a className="item">Evolution</a>
                        <a className="item">Moves</a>
                    </div>
                    <div className="ui centered header">{this.state.name}</div>
                    <div className="ui image"> <img src={this.state.imageUrl} /></div>
                    <div className="meta"><span className="date">No. {`${this.state.pokemonIndex}`}</span></div>
                    <div className="description">
                        {this.state.pokemonDescription}
                    </div>
                    <div className="ui centered header">
                        <div class="ui centered cards">
                            <div class="small card">
                                <div class="content">
                                    <div class="header">Height</div>
                                    <div class="description">
                                        70cm
                                    </div>
                                </div>
                                <div class="content">
                                    <div class="header">Weight</div>
                                    <div class="description">
                                        70kg
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PokeDetails;