import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Brand} from './brand.model';

@Injectable()
export class BrandService {

  private brandList: Brand[] = [new Brand('Loading')];
  brandListChanged = new Subject<Brand[]>();

  constructor(private http: HttpClient) {
  };

  getBrandList() {
    return this.brandList.slice();
  }

  getBrandById(id: number) {
    for (let brand of this.brandList) {
      if (brand.id === id) {
        return brand;
      }
    }
    return this.brandList[0];
  }

  getBrandIndex(brandName: string) {
    for (let i in this.brandList) {
      if (this.brandList[i].name === brandName) {
        return this.brandList[i].id;
      }
    }
    return this.brandList[0].id;
  }


  fetchBrandList() {
    this.http.get<Brand[]>('https://localhost:5001/api/BrandItems')
      .subscribe((brands: Brand[]) => {
        this.brandList = brands;
        this.brandListChanged.next(this.brandList.slice());
      });
  }

  addBrand(brand: Brand) {
    this.http.post('https://localhost:5001/api/BrandItems', brand).subscribe(
      () => this.fetchBrandList()
    );
  }

  deleteBrand(brandId: number) {
    this.http.delete('https://localhost:5001/api/BrandItems/' + brandId).subscribe(
      () => this.fetchBrandList()
    );
  }
}
