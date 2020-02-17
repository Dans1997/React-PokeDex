import React from 'react';

class Fetch extends React.Component {

    constructor (props) {
        super(props);

        this.state = { apiResponse: {} , search: "pokemon/ditto/", lastSearch: " "};
    }

    renderJSON = (json) => {
    
        // JSON is an object
    
        // This pretty prints all the JSON from the API
    
        var jsonKeys = [];
        var aux = 0;
    
        Object.keys(json).forEach((key) => {
          jsonKeys[aux] = key.split('_').join(' ');
    
          var splitStr = jsonKeys[aux].toLowerCase().split(' ');
        
          for (var i = 0; i < splitStr.length; i++) {
              splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
          }
    
          splitStr.push( ': ' + json[key]);
          
          // Directly return the joined string
          jsonKeys[aux] =  splitStr.join(' '); 
    
          aux++
        }) 
    
        return jsonKeys.map( elem => <div key={elem}> {` ${elem} `} </div>);
    }

    componentDidMount() {
       this.fetchPokedex(this.state.search);
    }

    componentDidUpdate() {
        //console.log(this.props.search)
        this.fetchPokedex(this.props.search);
    }

    fetchPokedex = (search) => {

        if(!search) { return; }

        let fetchTerm = `https://pokeapi.co/api/v2/${search}`;

        // Don't search the same term twice
        if( search == this.state.lastSearch ) { 
            //console.log("Detected same GET request. Denied.")
            return; 
        }

        console.log("Last Search: " + this.state.lastSearch)
        console.log("This Search: " + search)

        // Save last search
        this.setState( { lastSearch: search } )

        console.log(fetchTerm);

        fetch(fetchTerm)
            .then(res => res.json())
            .then((data) => {
                this.setState({ apiResponse: data })
        })
        .catch(console.log())
    }

    render () {
        return (
            <div> 
                { this.renderJSON(this.state.apiResponse) }
            </div>
        );
    }
}

export default Fetch;

// { this.renderJSON(this.state.apiResponse).map( elem =>  <div key={elem}> {` ${elem} `} </div>) }

// {this.fetchPokedex(this.props.search)}