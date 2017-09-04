import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.sass']
})
export class CamerasComponent implements OnInit {
  @Input() cameras: Array<String>;

  constructor() {
  }

  ngOnInit() {
  }

}
