import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as axios from 'axios';

interface IAppState { 
    weatherData: {main: { temp: number; }; }
}

class AppComponent extends React.Component<{}, IAppState> {
    constructor(props: Readonly<{}>){
        super(props);

        this.state = {
            weatherData: {
                main: {
                    temp: 273.15+22
                }
            }
        };
    }
    componentDidMount(){
        axios.default.get(`/api/weather`).then((value) => {
            console.log('weather data');
            console.log(value);
            this.setState({
                weatherData: value.data
            });
        });
    }
    render(){
        return <main>
            <WeatherInfo data={this.state.weatherData} />
        </main>;
    }
}

interface WeatherInfoProps {
    data: {
        main: {
            temp: number
        }
    }
}


class WeatherInfo extends React.Component<WeatherInfoProps, {}> {
    render(){
        let temp = this.props.data.main.temp - 273.15;
        temp = Math.round(temp*100)/100;
        return <section>
            <div>
                {temp} &deg;C
            </div>
        </section>;
    }
}

ReactDOM.render(<AppComponent />, document.getElementById('weather-app'));

/*
    TODO:
    - get the users location.
    - display weather conditions.
    - display location.
    - button to toggle between celsius and fahrenheit
*/