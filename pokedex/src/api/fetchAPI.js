import react from 'react';

class Fetch extends React.Component {
    constructor(props) {
        super(props);
        state = {} 
    }
}

/*
export default fetch = (jsonOBJ) => {
    if (!search) {
        search = " ";
    }

    let fetchTerm = `https://pokeapi.co/api/v2/${search}`;

    // Don't search the same term twice
    if (search === this.state.lastSearch) {
        //console.log("Detected same GET request. Denied.")
        return;
    }

    // Save last search
    this.setState({ lastSearch: search })

    fetch(fetchTerm)
        .then(res => res.json())
        .then((data) => {
            this.setState({ apiResponse: data })
        })
        .catch(this.setState({ apiResponse: { data: null } }))
}
*/