import {Component, OnDestroy, OnInit} from '@angular/core';
import {Car} from '../../shared/car/car.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../shared/car/car.service';
import {BrandService} from '../../shared/brand/brand.service';
import {FuelTypeService} from '../../shared/fuel-type/fuel-type.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Brand} from '../../shared/brand/brand.model';
import {FuelType} from '../../shared/fuel-type/fuel.type.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-car-description-edit',
  templateUrl: './car-description-edit.component.html',
  styleUrls: ['./car-description-edit.component.css']
})
export class CarDescriptionEditComponent implements OnInit, OnDestroy {

  carId: number;
  car: Car;
  carForm: FormGroup;
  brandList: Brand[] = [new Brand('Loading')];
  fuelTypeList: FuelType[];
  editMode: boolean = false;
  image: string;
  brandServiceSubscription: Subscription;
  carServiceSubscription: Subscription;

  constructor(private carService: CarService,
              private brandService: BrandService,
              private fuelTypeService: FuelTypeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.brandService.fetchBrandList();
    this.fuelTypeList = this.fuelTypeService.getFuelTypeList();
    this.addBrandServiceSubscription();

    this.brandService.brandListChanged.subscribe((brands: Brand[]) => this.initEmptyForm())

    if (this.activatedRoute.snapshot.params['id']) {
      this.initializeComponentInEditMode();
    } else {
      this.initEmptyForm();
    }
  }

  onSubmit() {
    let values = this.carForm.value;
    let newCar;
    if(this.editMode) {
      newCar = this.initializeCarWithValuesEditeMode(values);
    } else {
      newCar = this.initializeCarWithValuesAddMode(values);
    }
    if (this.editMode) {
      console.log(newCar)
      this.updateCar(newCar);
    } else {
      this.createNewCar(newCar);
    }
  }

  updateCar(updatedCar: Car) {
    this.carService.updateCarDetails(this.car.vin, updatedCar);
    this.router.navigate(['/car-details/', this.carId]);
  }

  createNewCar(newCar: Car) {
    this.carService.addCar(newCar);
    this.router.navigate(['/cars']);
  }

  initFormAndPopulateWithData() {
    this.carForm = new FormGroup({
      brand: new FormControl(this.brandList[0].name, Validators.required),
      fuel: new FormControl(this.fuelTypeList[0].fuelType, Validators.required),
      image: new FormControl(null),
      model: new FormControl(this.car.model, Validators.required),
      productionYear: new FormControl(this.car.productionYear, Validators.required),
      mileage: new FormControl(this.car.mileage, Validators.required),
      enginePower: new FormControl(this.car.enginePower, Validators.required),
      color: new FormControl(this.car.color, Validators.required),
      vin: new FormControl({value: this.car.vin, disabled: this.editMode}, Validators.required),
      netPrice: new FormControl(this.car.netPrice, Validators.required),
      description: new FormControl(this.car.description),
    });
  }

  initEmptyForm() {
    this.carForm = new FormGroup({
      brand: new FormControl(this.brandList[0].name, Validators.required),
      fuel: new FormControl(this.fuelTypeList[0].fuelType, Validators.required),
      image: new FormControl(null, Validators.required),
      model: new FormControl('', Validators.required),
      productionYear: new FormControl(2019, Validators.required),
      mileage: new FormControl(0, Validators.required),
      enginePower: new FormControl(0, Validators.required),
      color: new FormControl('', Validators.required),
      vin: new FormControl('', Validators.required),
      netPrice: new FormControl(0, Validators.required),
      description: new FormControl(''),
    });
  }

  initializeCarWithValuesEditeMode(values) {
    if (this.image === null) {
      return new Car(
        this.car.vin,
        this.brandService.getBrandIndex(values.brand),
        values.model,
        values.productionYear,
        values.mileage,
        values.fuel,
        values.enginePower,
        values.color,
        values.description,
        values.netPrice
      );
    } else {
      return new Car(
        this.car.vin,
        this.brandService.getBrandIndex(values.brand),
        values.model,
        values.productionYear,
        values.mileage,
        values.fuel,
        values.enginePower,
        values.color,
        values.description,
        values.netPrice,
        this.image,
      );
    }
  }

  initializeCarWithValuesAddMode(values) {
    if (this.image === null) {
      return new Car(
        values.vin,
        this.brandService.getBrandIndex(values.brand),
        values.model,
        values.productionYear,
        values.mileage,
        values.fuel,
        values.enginePower,
        values.color,
        values.description,
        values.netPrice,
      );
    } else {
      return new Car(
        values.vin,
        this.brandService.getBrandIndex(values.brand),
        values.model,
        values.productionYear,
        values.mileage,
        values.fuel,
        values.enginePower,
        values.color,
        values.description,
        values.netPrice,
        this.image,
      );
    }
  }

  onFileSelected(event) {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let reader = new FileReader();
      let currentComponent = this;
      reader.readAsDataURL(file);
      reader.onload = function() {
        let result = reader.result;
        if (typeof result === 'string') {
          currentComponent.image = <string> reader.result;
        } else {
          currentComponent.image = String.fromCharCode.apply(null, new Uint16Array(<ArrayBuffer> reader.result));
        }
      };
    }
  }

  private addBrandServiceSubscription() {
    this.brandServiceSubscription = this.brandService.brandListChanged
      .subscribe((brandList: Brand[]) =>
        this.brandList = brandList
      );
  }

  private initializeComponentInEditMode() {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        this.carId = +params['id'];
        this.editMode = true;
        this.carService.fetchCarList();
      });
    this.carServiceSubscription = this.carService.carListChanged
      .subscribe((carList: Car[]) => {
        this.car = carList[this.carId];
        this.image = this.car.photo;
        this.initFormAndPopulateWithData();
      });

    this.carService.fetchCarList();
    this.car = this.carService.getCarList()[this.carId];
    this.image = this.car.photo;
    this.initFormAndPopulateWithData();
  }

  ngOnDestroy(): void {
    this.brandServiceSubscription.unsubscribe();
    if (this.carServiceSubscription) {
      this.carServiceSubscription.unsubscribe();
    }
  }

  onBackButtonClicked() {
    this.router.navigate(['/car-details/', this.carId]);
  }
}
