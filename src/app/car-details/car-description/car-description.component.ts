import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../shared/car/car.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Country} from '../../shared/country/country.model';
import {TaxesService} from '../../shared/taxes/taxes.service';

@Component({
  selector: 'app-car-description',
  templateUrl: './car-description.component.html',
  styleUrls: ['./car-description.component.css']
})
export class CarDescriptionComponent implements OnInit {

  @Input() carId: number;
  @Input() car: Car;
  private selectedCountry: Country;
  @Input() countryList: Country[];
  bruttoForSelectedCountry: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private taxService: TaxesService) { }

  ngOnInit() {
  }

  onCountrySelected(index: number) {
    this.selectedCountry = this.countryList[index];
    console.log(this.selectedCountry);
    this.taxService.getTaxForCountry(this.selectedCountry.id, this.car.vin)
      .subscribe((tax: number) => {
        console.log("podatek = " + tax)
        this.bruttoForSelectedCountry = tax;
      })
  }

  onEditCarData() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }
}
