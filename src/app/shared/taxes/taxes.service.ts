import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class TaxesService {

  constructor(private http: HttpClient) {}

  getTaxForCountry(index: number, carVin: string) {
    return this.http.get<number>("https://localhost:5001/api/CountryItems/" + index + '/' + carVin );
  }
}
