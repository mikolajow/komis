import {Component, OnInit} from '@angular/core';
import {Car} from '../../shared/car.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CarService} from '../../shared/car.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  private car: Car;
  private carId: number;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private carService: CarService) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.carId = +params['id'];
          this.car = this.carService.getCar(this.carId);
        }
      );
  }

  onDetailsClicked() {
    this.router.navigate(['/car-details/', this.carId]);
  }
}
