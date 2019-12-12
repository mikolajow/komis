import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../shared/car/car.model';
import {CarService} from '../shared/car/car.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Country} from '../shared/country/country.model';
import {CountryService} from '../shared/country/country.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit, OnDestroy {

  private car: Car;
  private carId: number;
  private carServiceSubscription: Subscription;
  private countryList: Country[];
  private countryServiceSubscription: Subscription;

  constructor(private carService: CarService,
              private activatedRoute: ActivatedRoute,
              private countryService: CountryService,
              private router: Router) {
  }

  ngOnInit() {
    this.countryService.fetchCountryList();
    this.countryList = this.countryService.getCountryList();
    this.countryServiceSubscription = this.countryService.countriesListChanged
      .subscribe((countries: Country[]) => {
        this.countryList = countries;
      });
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.carId = +params['id'];
          this.car = this.carService.getCar(this.carId);
        }
      );
    this.carServiceSubscription = this.carService.carListChanged
      .subscribe((cars: Car[]) => {
        this.car = cars[this.carId];
      });
  }

  ngOnDestroy(): void {
    this.carServiceSubscription.unsubscribe();
    this.countryServiceSubscription.unsubscribe();
  }

  onCarListClicked() {
    this.router.navigate(['/cars', this.carId]);
  }
}
