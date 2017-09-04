import {Component, OnInit, Input} from '@angular/core';
import {filter, get} from 'lodash';

@Component({
  selector: 'alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.sass']
})
export class AlarmComponent implements OnInit {
  @Input() alarm: object = {};

  constructor() {
  }

  public get zones(): Array<object> {
    return filter(get(this, 'alarm.zones', []), zone => {
      if (!zone) return false;
      if (zone.subtype.includes('CONTACT')) return true;
      return false;
    });
  }

  public get troubledZones(): Array<object> {
    return filter(this.zones, zone => zone.troubles !== null);
  }

  ngOnInit() {
  }

}
