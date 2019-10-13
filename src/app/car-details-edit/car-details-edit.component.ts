import { Component, OnInit } from '@angular/core';
import {Car} from '../shared/car.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CarService} from '../shared/car.service';

@Component({
  selector: 'app-car-details-edit',
  templateUrl: './car-details-edit.component.html',
  styleUrls: ['./car-details-edit.component.css']
})
export class CarDetailsEditComponent implements OnInit {

  private car: Car;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.car = this.carService.getCar(+params['id']);
      })
  }

}
