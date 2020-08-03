import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstagingComponent } from './allstaging.component';

describe('AllstagingComponent', () => {
  let component: AllstagingComponent;
  let fixture: ComponentFixture<AllstagingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllstagingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllstagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
