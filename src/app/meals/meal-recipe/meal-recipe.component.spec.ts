import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealRecipeComponent } from './meal-recipe.component';

describe('MealRecipeComponent', () => {
  let component: MealRecipeComponent;
  let fixture: ComponentFixture<MealRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
