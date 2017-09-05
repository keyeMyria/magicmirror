import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DoorbellComponent} from './doorbell.component';

describe('DoorbellComponent', () => {
  let component: DoorbellComponent;
  let fixture: ComponentFixture<DoorbellComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoorbellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorbellComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be disabled when its off', () => {
    component.status = {nvalue: 0};
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent).toContain('disabled');
    expect(compiled.querySelector('p').className).toContain('off');
  });

  it('should its enabled when its on', () => {
    component.status = {nvalue: 1};
    fixture.detectChanges();
    expect(compiled.querySelector('p').textContent).toContain('enabled');
    expect(compiled.querySelector('p').className).toContain('on');
  });
});
