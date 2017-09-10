import {Component, ChangeDetectorRef} from '@angular/core';
import {MqttService, MqttConnectionState} from 'ngx-mqtt';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
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
    return get(this.messages, 'cameras', []);
  }


  public get doorbell(): object {
    return get(this.messages, 'zwave.switch[195]', {});
  }

  constructor(private mqtt: MqttService, private cdRef: ChangeDetectorRef) {
    mqtt.onMessage.subscribe(m => {
      let topic = m.topic.replace('/', '.');
      topic = topic.replace(/[\.|\/]?([\d]+)/g, '[$1]');
      this.messages = this.messages || new Object;
      try {
        set(this.messages, topic, JSON.parse(m.payload.toString()));
      }
      catch (e) {
        set(this.messages, topic, m.payload.toString());
      }
    });
    this.subscribe('alarm/#');
    this.subscribe('cameras/#');
    this.subscribe('weather/currently');
    this.subscribe('weather/minutely');
    this.subscribe('weather/hourly/data');
    this.subscribe('weather/daily/data');
    this.subscribe('zwave/switch/195');
  }

  public subscribe(filter: string): void {
    this.mqtt.observe(filter);
  }

}
