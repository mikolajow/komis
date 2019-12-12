import {FuelType} from './fuel.type.model';

export class FuelTypeService {
  fuelTypeList: FuelType[] = [
    new FuelType('Benzyna'),
    new FuelType('Ropa'),
    new FuelType('Gaz'),
    new FuelType('Elektryczny'),
    new FuelType('Hybrydowy'),
  ];

  getFuelTypeList() {
    return this.fuelTypeList.slice();
  }
}
