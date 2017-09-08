import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {
  @Input() weather: object = {};

  private hours(date) {
    return this.date(date).toLocaleTimeString('en-GB', {
      timeZone: 'Europe/London',
      hour12: false,
      formatMatcher: 'basic'
    }).replace(':00', '');
  }

  private date(date) {
    return new Date(date * 1000);
  }

  ngOnInit() {
  }

}
