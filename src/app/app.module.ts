import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CarListComponent} from './cars/car-list/car-list.component';
import {CarComponent} from './cars/car-list/car/car.component';
import {CarInfoComponent} from './cars/car-info/car-info.component';
import {PhotoComponent} from './shared/photo/photo.component';
import {CarService} from './shared/car/car.service';
import {RouterModule, Routes} from '@angular/router';
import {CarStartComponent} from './cars/car-list/car-start/car-start.component';
import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarDetailsEditComponent } from './car-details-edit/car-details-edit.component';
import { CarDescriptionComponent } from './car-details/car-description/car-description.component';
import {DropdownDirective} from './shared/dropdown.directive';
import { CarDescriptionEditComponent } from './car-details-edit/car-description-edit/car-description-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrandService} from './shared/brand/brand.service';
import {FuelTypeService} from './shared/fuel-type/fuel-type.service';
import {HttpClientModule} from '@angular/common/http';
import { BrandControlComponent } from './car-details-edit/car-description-edit/brand-control/brand-control.component';
import {CountryService} from './shared/country/country.service';
import {TaxesService} from './shared/taxes/taxes.service';

const routes: Routes = [
  {path: '', redirectTo: '/cars', pathMatch: 'full'},
  {
    path: 'cars',
    component: CarsComponent,
    children: [
      {path: '', component: CarStartComponent },
      {path: 'new', component: CarDescriptionEditComponent },
      {path: ':id', component: CarInfoComponent },
    ]
  },
  { path: 'car-details/:id', pathMatch: 'full', component: CarDetailsComponent },
  { path: 'car-details/:id/edit', component: CarDetailsEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarComponent,
    CarInfoComponent,
    PhotoComponent,
    CarStartComponent,
    CarsComponent,
    CarDetailsComponent,
    CarDetailsEditComponent,
    CarDescriptionComponent,
    DropdownDirective,
    CarDescriptionEditComponent,
    BrandControlComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [CarService, BrandService, FuelTypeService, CountryService, TaxesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
