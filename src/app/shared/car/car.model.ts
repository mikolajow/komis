import {Brand} from '../brand/brand.model';

export class Car {
  public brand: Brand;
  public vin: string;
  public brandId: number;
  public model: string;
  public productionYear: number;
  public mileage: number;
  public fuel: string;
  public enginePower: number;
  public color: string;
  public photo: string;
  public description: string;
  public netPrice: number;

  constructor(vin: string, brandId: number, model: string, productionYear: number,
              mileage: number, fuel: string, enginePower: number, color: string,
              description: string, netPrice: number)
  constructor(vin: string, brandId: number, model: string, productionYear: number,
              mileage: number, fuel: string, enginePower: number, color: string,
              description: string, netPrice: number, photo: string)
  constructor(vin: string, brandId: number, model: string, productionYear: number,
              mileage: number, fuel: string, enginePower: number, color: string,
              description: string, netPrice: number, photo: string, brand: Brand)
  constructor(vin: string, brandId: number, model: string, productionYear: number,
              mileage: number, fuel: string, enginePower: number, color: string,
              description: string, netPrice: number, photo?: string, brand?: Brand) {
    this.vin = vin;
    this.brandId = brandId;
    this.model = model;
    this.productionYear = productionYear;
    this.mileage = mileage;
    this.fuel = fuel;
    this.enginePower = enginePower;
    this.color = color;
    this.photo = photo;
    this.description = description;
    this.brand = brand;
    this.netPrice = netPrice;
  }
}
