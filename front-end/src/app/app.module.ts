import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { IngredientService } from './ingredient.service';
import { MessageService } from './message.service';
import { IngredientComponent } from './ingredient/ingredient.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { MealComponent } from './meal/meal.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealService } from './meal.service';
import { RecipeService } from './recipe.service';
import { UnitService } from './unit.service';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { UnitsComponent } from './units/units.component';
import { IngredientUnitsComponent } from './ingredient/ingredient-units/ingredient-units.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
    DashboardComponent,
    IngredientComponent,
    RecipeComponent,
    MealComponent,
    MealListComponent,
    RecipeListComponent,
    MealComponent,
    MealListComponent,
    UnitsComponent,
    IngredientUnitsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    
    
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [IngredientService, MessageService, MealService, RecipeService, UnitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
