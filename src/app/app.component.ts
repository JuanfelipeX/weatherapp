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

        var localDay = this.weather.timezone;
        var time = (this.zone = new Date(new Date().getTime() + localDay));
        this.zone = moment(time).format('MM-DD-YYYY ; hh:mm');
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
}
