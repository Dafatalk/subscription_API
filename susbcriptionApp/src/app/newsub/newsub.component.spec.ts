import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsubComponent } from './newsub.component';

describe('NewsubComponent', () => {
  let component: NewsubComponent;
  let fixture: ComponentFixture<NewsubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
