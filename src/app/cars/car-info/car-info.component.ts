import {Component, OnInit} from '@angular/core';
import {Car} from '../../shared/car/car.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CarService} from '../../shared/car/car.service';
import {BrandService} from '../../shared/brand/brand.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  private car: Car;
  private carId: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private carService: CarService, private brandService: BrandService) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.carId = +params['id'];
          this.car = this.carService.getCar(this.carId);
        }
      );
    this.carService.carListChanged
      .subscribe((cars: Car[]) => {
        this.car = cars[this.carId];
      });
  }

  onDetailsClicked() {
    this.router.navigate(['/car-details/', this.carId]);
  }

  onDeleteCarClicked() {
    this.carService.deleteCar(this.car.vin);
    console.log(this.car.vin);
    this.router.navigate(['/cars']);
  }
}
