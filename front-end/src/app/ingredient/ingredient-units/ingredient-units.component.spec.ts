import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientUnitsComponent } from './ingredient-units.component';

describe('IngredientUnitsComponent', () => {
  let component: IngredientUnitsComponent;
  let fixture: ComponentFixture<IngredientUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
