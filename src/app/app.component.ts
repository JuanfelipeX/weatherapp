import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  location = { cityName: 'Bogota', countryCode: 'Col' };
  weather: any;
  zone: any;
  //weather: Object;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather(this.location.cityName, this.location.countryCode);
  }

  getWeather(cityName: string, countryCode: string) {
    this.weatherService.getWeather(cityName, countryCode).subscribe(
      (res) => {
        console.log(res);
        this.weather = res;

        this.findingTime();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  submitLocation(cityName: HTMLInputElement, countryCode: HTMLInputElement) {
    if (cityName.value || countryCode.value) {
      this.getWeather(cityName.value, countryCode.value);

      cityName.value = '';
      countryCode.value = '';
    } else {
      alert('Please. Insert some values');
    }
    cityName.focus();
    return false;
  }

  changeBackground() {
    let spanEl = <HTMLElement>document.querySelector('.weather-app');
    let weatherMain = this.weather.weather[0].main;

    if (weatherMain == 'Rain') {
      spanEl.style.backgroundImage = "url('../assets/Rain.jpg')";
    } else if (weatherMain == 'Drizzle') {
      spanEl.style.backgroundImage = "url('../assets/Drizzle.jpg')";
    } else if (weatherMain == 'Thunderstorm') {
      spanEl.style.backgroundImage = "url('../assets/Thunderstorm.jpg')";
    } else if (weatherMain == 'Snow') {
      spanEl.style.backgroundImage = "url('../assets/Snow.jpg')";
    } else if (weatherMain == 'Clear') {
      spanEl.style.backgroundImage = "url('../assets/Clear.jpg')";
    } else if (weatherMain == 'Clouds') {
      spanEl.style.backgroundImage = "url('../assets/Clouds.jpg')";
    }
  }

  findingTime() {
    var localDay = this.weather.dt;
    var time = (this.zone = new Date(new Date().getTime()));
    this.zone = moment(time).format('MM-DD-YYYY ; hh:mm');
    console.log(localDay )
  }

  changeIconWeather() {
    let spanEl = <HTMLElement>document.querySelector('.iconWeather');
    let weatherMain = this.weather.weather[0].main;

    if (weatherMain == 'Rain') {
      spanEl.setAttribute('class', 'fa fa-cloud-rain iconWeather');
    } else if (weatherMain == 'Drizzle') {
      spanEl.setAttribute('class', 'fa fa-umbrella iconWeather');
    } else if (weatherMain == 'Thunderstorm') {
      spanEl.setAttribute('class', 'fa fa-bolt iconWeather');
    } else if (weatherMain == 'Snow') {
      spanEl.setAttribute('class', 'fa fa-snowflake iconWeather');
    } else if (weatherMain == 'Clear') {
      spanEl.setAttribute('class', 'fa fa-sun iconWeather');
    } else if (weatherMain == 'Clouds') {
      spanEl.setAttribute('class', 'fa fa-cloud iconWeather');
    }
  }
}
