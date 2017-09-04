import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorbellComponent } from './doorbell.component';

describe('DoorbellComponent', () => {
  let component: DoorbellComponent;
  let fixture: ComponentFixture<DoorbellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoorbellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorbellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
