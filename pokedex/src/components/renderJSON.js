import React from 'react';

class JSONRenderer extends React.Component {

    constructor(props) {
        super(props);

        this.state = { apiResponse: {}, search: " "};
    }

    /*untitled = (json) => {
        return this.renderJSON(json);
    }*/

    renderJSON = (json) => {
        // JSON is an object

        // This pretty prints all the JSON from the API

        if (this.state.err === 1) {
            return <div>  </div>
        }

        var jsonKeys = [];
        var aux = 0;

        Object.keys(json).forEach((key) => {
            jsonKeys[aux] = key.split('_').join(' ');

            var splitStr = jsonKeys[aux].toLowerCase().split(' ');

            for (var i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }

            if (typeof json[key] === "object" && json[key] !== null) {
                if(json[key] && typeof json[key] !== 'string' && json[key].length){
                    // JSON[KEY] IS AN ARRAY
                    json[key].forEach((elem) => {
                        let jsonObj = this.renderJSON(elem);
                        splitStr.push(': ' + jsonObj);
                    })
                } else {
                    // JSON[KEY] IS AN OBJECT
                    let jsonObj = this.renderJSON(json[key]);
                    splitStr.push(': ' + jsonObj);
                }            
            } else {
                splitStr.push(': ' + json[key]);
            }

            jsonKeys[aux] = splitStr.join(' ');

            aux++
        })

        return jsonKeys;
    }

    // Send an API GET Request every time component updates
    componentDidUpdate() {
        this.fetchPokedex(this.props.search);
    }

    fetchPokedex = (search) => {

        if (!search) {
            search = " ";
        }

        // Don't search the same term twice
        if (search === this.state.lastSearch) {
            //console.log("Detected same GET request. Denied.")
            return;
        }

        // Save last search
        this.setState({ lastSearch: search })

        fetch(`https://pokeapi.co/api/v2/${search}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({ apiResponse: data })
            })
            .catch(this.setState({ apiResponse: { data: null } }))
    }

    render() {
        return (
            <div>
                { this.renderJSON(this.state.apiResponse).map(elem => <div key={elem}> {` ${elem} `} <br /> <br /> </div>) }
            </div>
        );
    }
}

export default JSONRenderer;

// { this.renderJSON(this.state.apiResponse).map( elem =>  <div key={elem}> {` ${elem} `} </div>) }

// { this.fetchPokedex(this.props.search) }