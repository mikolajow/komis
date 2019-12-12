export class Brand {
  name: string;
  id: number;

  constructor(brandName: string)
  constructor(brandName: string, id: number)
  constructor(brandName: string, id?: number) {
    this.name = brandName;
    this.id = id;
  }
}
