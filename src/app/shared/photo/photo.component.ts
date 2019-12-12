import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../car/car.model';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input() car: Car;

  constructor() { }

  ngOnInit() {
  }

}
