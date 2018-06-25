import { Component, Input, OnInit } from '@angular/core';
import { st } from '@angular/core/src/render3';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Input() error: any;

  constructor() { }

  ngOnInit() {
  }

}
