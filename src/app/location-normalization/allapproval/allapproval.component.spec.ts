import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllapprovalComponent } from './allapproval.component';

describe('AllapprovalComponent', () => {
  let component: AllapprovalComponent;
  let fixture: ComponentFixture<AllapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
