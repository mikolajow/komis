import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../../shared/car/car.model';
import {BrandService} from '../../../shared/brand/brand.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @Input() car: Car;
  @Input() index: number;

  constructor(private brandService: BrandService) { }

  ngOnInit() {
  }

}
