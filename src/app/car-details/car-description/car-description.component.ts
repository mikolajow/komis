import {Component, Input, OnInit} from '@angular/core';
import {CarService} from '../../shared/car.service';
import {Car} from '../../shared/car.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-car-description',
  templateUrl: './car-description.component.html',
  styleUrls: ['./car-description.component.css']
})
export class CarDescriptionComponent implements OnInit {

  @Input() car: Car;
  private selectedCountry: string;

  private countryList: string[] = ['Polska', 'Japonia', 'Grecja', 'Niemcy'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onCountrySelected(index: number) {
    this.selectedCountry = this.countryList[index];
  }

  onEditCarData() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }
}
