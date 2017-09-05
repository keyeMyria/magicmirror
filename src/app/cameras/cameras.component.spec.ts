import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CamerasComponent} from './cameras.component';

describe('CamerasComponent', () => {
  let component: CamerasComponent;
  let fixture: ComponentFixture<CamerasComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CamerasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamerasComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    component.cameras = ['one', 'two'];
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show a feed for each camera', () => {
    expect(compiled.querySelectorAll('img').length).toBe(2);
  });

  it('should inject the camera url into the img src', () => {
    expect(compiled.querySelector('img').src).toContain('one');
  });

});
