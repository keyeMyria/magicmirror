import {Pipe, PipeTransform} from '@angular/core';

const alarm_state_map = {
  Disarm: 'Disarmed',
  Home: 'Armed Home',
  Away: 'Armed Away',
  ExitDelayAway: 'Arming Away',
  ExitDelayHome: 'Arming Home'
};

@Pipe({name: 'alarmStateToString'})
export class AlarmStateToStringPipe implements PipeTransform {
  transform(value: string): string {
    return alarm_state_map[value] || value;
  }
}