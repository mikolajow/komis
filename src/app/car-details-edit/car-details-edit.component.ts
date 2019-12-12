import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../shared/car/car.model';
import {ActivatedRoute, Params} from '@angular/router';
import {CarService} from '../shared/car/car.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-car-details-edit',
  templateUrl: './car-details-edit.component.html',
  styleUrls: ['./car-details-edit.component.css']
})
export class CarDetailsEditComponent implements OnInit, OnDestroy {

  private car: Car;
  private carId: number;
  private carListSubscription: Subscription;

  constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.carId = +params['id'];
        this.carService.fetchCarList();
        this.car = this.carService.getCar(this.carId);
      });
    this.carListSubscription = this.carService.carListChanged
      .subscribe((carList: Car[]) => {
        this.car = carList[this.carId];
      }
  );
  }

  ngOnDestroy(): void {
    this.carListSubscription.unsubscribe();
  }
}
