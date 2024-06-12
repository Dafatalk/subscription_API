import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewperiodComponent } from './newperiod.component';

describe('NewperiodComponent', () => {
  let component: NewperiodComponent;
  let fixture: ComponentFixture<NewperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewperiodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
