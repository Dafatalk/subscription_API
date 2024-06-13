import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NewplanComponent } from './newplan.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../../core/services/subscription.service';
import { PlanService } from 'src/app/core/services/plan.service';



describe('NewplanComponent', () => {
  let component: NewplanComponent;
  let fixture: ComponentFixture<NewplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewplanComponent],
       imports:[
        PlanService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
