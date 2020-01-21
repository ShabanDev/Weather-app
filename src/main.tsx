import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as axios from 'axios';

interface IAppState { 
    weatherData: { 
        temp: number,
        status: string,
        city: string
     },
    position: {
        latitude: number,
        longitude: number
    }
}

class AppComponent extends React.Component<{}, IAppState> {
    constructor(props: Readonly<{}>){
        super(props);

        this.state = {
            weatherData: {
                temp: 273.15+22,
                status: 'Clear',
                city: 'Manama'
            },
            position: {
                latitude: 26.2266124,
                longitude: 50.5540067
            }
        };

        this.onGetLocationSuccess = this.onGetLocationSuccess.bind(this);
        this.onGetLocationFail = this.onGetLocationFail.bind(this);
    }

    onGetLocationSuccess(position: Position){
        this.getWeather(position.coords.latitude, position.coords.longitude);
        this.setState({
            position: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        });
    }

    onGetLocationFail(positionError: PositionError){
        // if fail, get the weather at Manama, Bahrain
        this.getWeather(this.state.position.latitude, this.state.position.longitude);
    }

    getLocation(){
        navigator.geolocation.getCurrentPosition(this.onGetLocationSuccess, this.onGetLocationFail);
    }

    getWeather(lat: number, lon: number){
        axios.default.get(`/api/weather?lat=${lat}&lon=${lon}`).then((value) => {
            console.log('weather data');
            console.log(value);
            this.setState({
                weatherData: {
                    temp: value.data.main.temp,
                    status: value.data.weather[0].main,
                    city: `${value.data.name}, ${value.data.sys.country}`
                }
            });
        });
    }

    componentDidMount(){
        this.getLocation();
    }

    render(){
        return <main>
            <WeatherInfo temp={this.state.weatherData.temp} status={this.state.weatherData.status} city={this.state.weatherData.city} />
        </main>;
    }
}

interface WeatherInfoProps {
    temp: number,
    status: string,
    city: string
}


class WeatherInfo extends React.Component<WeatherInfoProps, {}> {
    render(){
        let temp = this.props.temp - 273.15;
        temp = Math.round(temp*100)/100;
        return <section>
            <div>
                {this.props.city}
            </div>
            <div>
                {temp} &deg;C
            </div>
            <div>
                {this.props.status}
            </div>
        </section>;
    }
}

ReactDOM.render(<AppComponent />, document.getElementById('weather-app'));

/*
    TODO:
    - button to toggle between celsius and fahrenheit
    - use unicode symbols to show the current weather status
    - finalize design
*/