import * as React from 'react';
import * as ReactDOM from 'react-dom';

class AppComponent extends React.Component {
    render(){
        return <h1>AppComponent</h1>;
    }
}

ReactDOM.render(<AppComponent />, document.getElementById('weather-app')) ;