import {Car} from './car.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CarService {

  private carList: Car[] = [];
  carListChanged = new Subject<Car[]>();

  constructor(private http: HttpClient) { };

  getCarList() {
    return this.carList.slice();
  }

  fetchCarList() {
    this.http.get<Car[]>('https://localhost:5001/api/CarItems')
      .subscribe((cars: Car[]) => {
        this.carList = cars;
        this.carListChanged.next(this.carList.slice());
      });
  }

  getCar(carId: number) {
    this.fetchCarList();
    return this.carList[carId];
  }

  addCar(car: Car) {
    this.http.post("https://localhost:5001/api/CarItems", car).subscribe(
          () => this.fetchCarList()
        );
  }

  deleteCar(vin: string) {
    this.http.delete('https://localhost:5001/api/CarItems/' + vin).subscribe(
          () => this.fetchCarList()
        );
  }

  updateCarDetails(vin: string, updatedCar: Car) {
    this.http.put('https://localhost:5001/api/CarItems/' + vin, updatedCar)
      .subscribe(() => this.fetchCarList());
  }
}
