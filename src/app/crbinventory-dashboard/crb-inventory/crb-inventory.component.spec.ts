import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrbInventoryComponent } from './crb-inventory.component';

describe('CrbInventoryComponent', () => {
  let component: CrbInventoryComponent;
  let fixture: ComponentFixture<CrbInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrbInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrbInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
