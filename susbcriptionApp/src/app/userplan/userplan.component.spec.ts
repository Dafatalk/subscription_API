import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserplanComponent } from './userplan.component';

describe('UserplanComponent', () => {
  let component: UserplanComponent;
  let fixture: ComponentFixture<UserplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
