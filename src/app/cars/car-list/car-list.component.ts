import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarService} from '../../shared/car/car.service';
import {Car} from '../../shared/car/car.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit, OnDestroy {

  private showBrandOptionsText = 'Opcje Marek';
  private hideBrandOptionsText = 'Zamknij Opcje Marek';

  private manageBrands: boolean = false;
  private brandOptionsButtonText: string = this.showBrandOptionsText;
  private carList: Car[];
  private carListSubscription: Subscription;

  constructor(private carService: CarService) {
  }

  ngOnInit() {
    this.carService.fetchCarList();
    this.carListSubscription = this.carService.carListChanged
      .subscribe((carList: Car[]) =>
        this.carList = carList);
    this.carList = this.carService.getCarList();
  }

  ngOnDestroy(): void {
    this.carListSubscription.unsubscribe();
  }

  onManageBrandsClicked() {
    if (this.brandOptionsButtonText === this.showBrandOptionsText) {
      this.brandOptionsButtonText = this.hideBrandOptionsText;
      this.manageBrands = true;
    } else {
      this.brandOptionsButtonText = this.showBrandOptionsText;
      this.manageBrands = false;
    }
  }
}
