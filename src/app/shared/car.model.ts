export class Car {
  public brand: string;
  public model: string;
  public productionYear: number;
  public mileage: number;
  public fuel: string;
  public enginePower: number;
  public color: string;
  public photo: string;
  public netPrice: number;
  public description: string;

  constructor(brand: string, model: string, productionYear: number,
              mileage: number, fuel: string, enginePower: number, color: string,
              photo: string, netPrice: number, description: string) {
    this.brand = brand;
    this.model = model;
    this.productionYear = productionYear;
    this.mileage = mileage;
    this.fuel = fuel;
    this.enginePower = enginePower;
    this.color = color;
    this.photo = photo;
    this.netPrice = netPrice;
    this.description = description;
  }
}
