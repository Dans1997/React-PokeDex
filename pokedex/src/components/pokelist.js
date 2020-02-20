import React from 'react';
import axios from 'axios';
import PokeCard from './pokecard';

//import '../css/pokelist.css';

// This component will print a list of PokeCards with their respective data

class PokeList extends React.Component {

    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/?limit=151',
        apiResponse: null
    }

    async componentDidMount () {
        const apiResponse = await axios.get(this.state.url);
        this.setState( { apiResponse: apiResponse.data['results'] } );
    }

    printList = () => {
        if(this.state.apiResponse) 
        {
            return (
                <div className="ui centered very relaxed vertically divided five column grid">
                    <div className="row">
                        { this.state.apiResponse.map(pokemon =>
                            <PokeCard 
                                key={pokemon.name}
                                name={pokemon.name}
                                url={pokemon.url}
                            /> ) 
                        }
                    </div>
                </div>
            );
        }
    }

    render () {
        return(
            <div>
                    { this.printList() }
            </div>
        );
    }
}

export default PokeList;