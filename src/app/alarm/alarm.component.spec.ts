import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlarmComponent} from './alarm.component';
import {AlarmStateToStringPipe} from './alarm.pipes';

describe('AlarmComponent', () => {
  let component: AlarmComponent;
  let fixture: ComponentFixture<AlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmComponent, AlarmStateToStringPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    component.alarm = {
      zones: [
        null,
        {subtype: 'V_CONTACT'},
        {subtype: 'SHOCK_CONTACT', troubles: ['something']},
        {subtype: 'MOTION_SENSOR'}
      ]
    };
  });
  describe('zones', () => {

    it('should filter null zones', () =>
      expect(component.zones).not.toContain(null)
    );
    it('should filter non contact zones', () =>
      expect(component.zones).not.toContain(jasmine.objectContaining({subtype: 'MOTION_SENSOR'}))
    );
    it('should retain contact sensors', () =>
      expect(component.zones).toContain(jasmine.objectContaining({subtype: 'V_CONTACT'}))
    );
  });
  describe('troubledZones', () => {
    it('should retain the troubled zones', () =>
      expect(component.troubledZones).toContain(jasmine.objectContaining({subtype: 'SHOCK_CONTACT'}))
    );
    it('should filter out untroubled zones', () =>
      expect(component.troubledZones).not.toContain(jasmine.objectContaining({subtype: 'V_CONTACT'}))
    );
  });
});
