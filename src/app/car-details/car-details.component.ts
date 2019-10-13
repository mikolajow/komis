import { Component, OnInit } from '@angular/core';
import {Car} from '../shared/car.model';
import {CarService} from '../shared/car.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  private car: Car;
  private carId: number;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.carId = +params['id'];
          this.car = this.carService.getCar(this.carId);
        }
      )
  }
}
