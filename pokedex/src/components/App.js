import React from 'react';
import Router from '../router/router'

import GlobalFonts from '../fonts/fonts';

class App extends React.Component {
    render() {
        return (
            <div>
                <GlobalFonts />
                <Router />
            </div>
        );
    }
}

export default App;