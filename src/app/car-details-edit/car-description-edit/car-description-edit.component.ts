import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../shared/car.model';

@Component({
  selector: 'app-car-description-edit',
  templateUrl: './car-description-edit.component.html',
  styleUrls: ['./car-description-edit.component.css']
})
export class CarDescriptionEditComponent implements OnInit {

  @Input() car: Car;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form) {

  }
}
