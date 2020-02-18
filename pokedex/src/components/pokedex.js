import React from 'react';
import PokeCard from './pokecard';
import JSONRenderer from './renderJSON';
import { withRouter } from "react-router-dom";

class Pokedex extends React.Component
{
    constructor(props) 
    {
        super(props);

        this.state = { search: "", finalSearch: " " }
    }

    renderLoginCredentials = () => {
        return (
            <div>
                Your email: {this.props.location.state.email} <br />
                Your password: {this.props.location.state.password}
            </div>
        );
    }

    // Updates search bar term
    onChange = (event) => {
        this.setState( { search: event.target.value } )
    }

    // Calls API
    onSubmit = (event) => {
        event.preventDefault(); 
        let aux = this.state.search;
        this.setState( { finalSearch: aux } )
    }

    render () 
    {
        return (
            <div>
                <h1> This is the Pokedex!</h1>
                <h2> Everything you need to know about Pokemon! </h2>
                <form>
                    <input type="text" placeholder="Search something..." size="50" value={this.state.search} onChange={this.onChange} /> 
                    <p> Need a hint? Try pokemon/ditto/, pokemon/1/ , type/3/ or ability/4/. </p>
                    <input type="submit" value={"Search"} onClick={this.onSubmit}></input>
                </form> <br />
                <JSONRenderer search={this.state.finalSearch} />
                <PokeCard name="Bulbasaur" number="1" desc="Grass Pokémon" imageSrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"/>
            </div>
        );
    }
}

export default withRouter(Pokedex);

/*
    <PokeCard name="Bulbasaur" number="1" desc="Grass Pokémon" imageSrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"/>
    <PokeCard name="Charmander" number="4" desc="Fire Pokémon" imageSrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"/>
    <PokeCard name="Squirtle" number="7" desc="Water Pokémon" imageSrc="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"/>
*/