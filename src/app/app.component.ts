import {Component, ChangeDetectorRef} from '@angular/core';
import {MqttService, MqttConnectionState, MqttMessage} from 'ngx-mqtt';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {set, get} from 'lodash';

export type QoS = 0 | 1 | 2;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public topic: string;
  public retain: boolean;
  public qos: QoS = 0;
  public filter: string;
  public message: string;

  public messages: object = {};

  public get state(): BehaviorSubject<MqttConnectionState> {
    return this.mqtt.state;
  }

  public get weather(): object {
    return get(this.messages, 'weather', {});
  }

  public get cameras(): Array<string> {
    console.log(this.messages);
    return get(this.messages, 'cameras', []);
  }


  public get doorbell(): object {
    return get(this.messages, 'zwave.switch[195]', {});
  }

  constructor(private mqtt: MqttService, private cdRef: ChangeDetectorRef) {
    // this.subscribe('alarm/#');


    this.thingSubscribe('alarm_status', 'alarm');
    this.thingSubscribe('camera_external_driveway', 'cameras[0]');
    this.thingSubscribe('camera_external_garden', 'cameras[1]');
    this.thingSubscribe('camera_external_porch', 'cameras[2]');
    this.thingSubscribe('weather_currently', 'weather.currently');
    this.thingSubscribe('weather_minutely', 'weather.minutely');
    this.thingSubscribe('weather_hourly', 'weather.hourly');
    this.thingSubscribe('weather_daily', 'weather.daily');
    // this.subscribe('zwave/switch/195');

  }

  public subscribe(filter: string): void {
    this.mqtt.observe(filter);
  }

  public thingSubscribe(thing: string, set_to: string): Observable<MqttMessage> {
    const foo = this.mqtt.observe(`$aws/things/${thing}/shadow/get/accepted`);

    foo.subscribe(message =>
      set(this.messages, set_to, JSON.parse(message.payload.toString()).state.reported)
    );
    this.mqtt.publish(`$aws/things/${thing}/shadow/get`, '{}').toPromise();
    return foo;
  }

  public publish(topic: string): void {
    this.mqtt.publish(topic, '{}');
  }

}
