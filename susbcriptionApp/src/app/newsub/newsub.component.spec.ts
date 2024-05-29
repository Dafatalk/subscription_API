import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { NewsubComponent } from './newsub.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from '../../service/subscription.service';



describe('NewsubComponent', () => {
  let component: NewsubComponent;
  let fixture: ComponentFixture<NewsubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsubComponent],
       imports:[
        SubscriptionService]
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
