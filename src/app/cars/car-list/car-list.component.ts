import { Component, OnInit } from '@angular/core';
import {CarService} from '../../shared/car.service';
import {Car} from '../../shared/car.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  private carList: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
    this.carList = this.carService.getCarList();
  }

}
