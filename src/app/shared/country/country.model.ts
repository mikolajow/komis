export class Country {
  name: string;
  id: number;

  constructor(countryName: string)
  constructor(countryName: string, id: number)
  constructor(countryName: string, id?: number) {
    this.name = countryName;
    this.id = id;
  }
}
