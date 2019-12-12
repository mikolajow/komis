import {Country} from './country.model';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class CountryService {
  private countryList: Country[] = [new Country('Loading')];
  countriesListChanged = new Subject<Country[]>();

  constructor(private http: HttpClient) {
  };

  getCountryList() {
    return this.countryList.slice();
  }

  fetchCountryList() {
    this.http.get<Country[]>('https://localhost:5001/api/CountryItems')
      .subscribe((countries: Country[]) => {
        this.countryList = countries;
        this.countriesListChanged.next(this.countryList.slice());
      });
  }

  addCountry(country: Country) {
    this.http.post('https://localhost:5001/api/CountryItems', country).subscribe(
      () => this.fetchCountryList()
    );
  }

  deleteCountry(countryName: string) {
    let countryId = this.countryList[0].id;
    for (let i in this.countryList) {
      if (this.countryList[i].name === countryName) {
        countryId = this.countryList[i].id;
      }
    }
    this.http.delete('https://localhost:5001/api/CountryItems/' + countryId).subscribe(
      () => this.fetchCountryList()
    );
  }
}
