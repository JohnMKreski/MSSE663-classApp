import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaAppComponent } from './pizza-app.component';

describe('PizzaAppComponent', () => {
  let component: PizzaAppComponent;
  let fixture: ComponentFixture<PizzaAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzaAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
