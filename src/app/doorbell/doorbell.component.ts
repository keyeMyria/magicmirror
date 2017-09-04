import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'doorbell',
  templateUrl: './doorbell.component.html',
  styleUrls: ['./doorbell.component.sass']
})
export class DoorbellComponent implements OnInit {
  @Input() status: object = {};

  constructor() {
  }

  ngOnInit() {
  }

}
