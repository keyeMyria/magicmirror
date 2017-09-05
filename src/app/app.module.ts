import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {KeysPipe, StateToStringPipe, StateToClassPipe} from './pipes';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment';

import {
  MqttMessage,
  MqttModule,
  MqttService,
  MqttServiceOptions,
  OnMessageEvent
} from 'ngx-mqtt';

import {WeatherComponent} from './weather/weather.component';
import {WeatherIconComponent} from './weather-icon/weather-icon.component';
import {CamerasComponent} from './cameras/cameras.component';
import {AlarmComponent} from './alarm/alarm.component';
import {AlarmStateToStringPipe} from './alarm/alarm.pipes';
import {DoorbellComponent} from './doorbell/doorbell.component';

export function mqttServiceFactory() {
  let env = environment['__zone_symbol__value'];
  const MQTT_SERVICE_OPTIONS: MqttServiceOptions = {
    hostname: env['MQTT_HOST'],
    username: env['MQTT_USER'],
    password: env['MQTT_PASS'],
    protocol: 'wss',
    path: '/mqtt',
    port: 443
  };
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  declarations: [
    AppComponent,
    KeysPipe,
    StateToStringPipe,
    StateToClassPipe,
    WeatherComponent,
    WeatherIconComponent,
    CamerasComponent,
    AlarmComponent,
    AlarmStateToStringPipe,
    DoorbellComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  public load() {
    console.log('foo');
  }
}