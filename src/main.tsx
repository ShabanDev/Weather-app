import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as axios from 'axios';
import UnitToggleButton from './components/UnitToggleButton';


import './main.styl';

const weatherSymbols = new Map<number, JSX.Element>();
weatherSymbols.set(800, <span>&#9728;</span>);
weatherSymbols.set(801, <span>&#x26C5;</span>);
weatherSymbols.set(802, <span>&#x26C5;</span>);
weatherSymbols.set(800, <span>&#x26C5;</span>);
weatherSymbols.set(800, <span>&#x26C5;</span>);

function getWeatherSymbol(code: number) : JSX.Element{
    if(code > 800 && code <= 804){
        return <span>&#x26C5;</span>;
    }
    else if(code >= 210 && code <= 221){
        return <span>&#x1F329;</span>
    }
    else if(code >= 200 && code < 300){
        return <span>&#x26C8;</span>
    }
    else if(code >= 300 && code < 600){
        return <span>&#x1F327;</span>
    }
    else if(code >= 600 && code < 700){
        return <span>&#x1F328;</span>
    }
    else if(code >= 700 && code < 800){
        return <span>&#x1F32B;</span>
    }
    return <span>&#9728;</span>;
}

interface IAppState { 
    weatherData: {
        code: number, 
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
                code: 800,
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
        axios.default.get(`${location.href}api/weather?lat=${lat}&lon=${lon}`).then((value) => {
            console.log('weather data');
            console.log(value);
            this.setState({
                weatherData: {
                    code: value.data.weather[0].id,
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
            <WeatherInfo temp={this.state.weatherData.temp} status={this.state.weatherData.status} city={this.state.weatherData.city} code={this.state.weatherData.code} />
            <section className="nue-panel">
                <h2>About</h2>
                <p>This is a project created for the <a href="https://www.freecodecamp.org/guynumber9" target="_blank">freeCodeCamp</a> web development course.
                The source code for this project can be found on <a href="https://github.com/GuyNumber9/Weather-app" target="_blank">GitHub</a>.</p>
            </section>
        </main>;
    }
}

interface WeatherInfoProps {
    temp: number,
    status: string,
    city: string,
    code: number
}

interface WeatherInfoState {
    isCelsius: boolean
}


class WeatherInfo extends React.Component<WeatherInfoProps, WeatherInfoState> {
    constructor(props: Readonly<WeatherInfoProps>){
        super(props);

        this.state = {
            isCelsius: true
        }

        this.onUnitChange = this.onUnitChange.bind(this);
    }
    onUnitChange(checked: boolean){
        this.setState({
            isCelsius: checked
        });
    }
    render(){
        let temp = this.props.temp - 273.15;

        if(!this.state.isCelsius){
            temp = 9*temp/5 + 32;
        }

        temp = Math.round(temp*100)/100;
        return <section className="weather-info nue-panel">
            <div className="weather-city">
                {this.props.city}
            </div>
            <div className="weather-symbol">
                {getWeatherSymbol(this.props.code)}
            </div>
            <div className="weather-temperature">
                {temp} &deg;{this.state.isCelsius?'C':'F'}
            </div>
            <div className="weather-status">
                {this.props.status}
            </div>
            <UnitToggleButton onUnitChange={this.onUnitChange} isCelsius={this.state.isCelsius} />
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