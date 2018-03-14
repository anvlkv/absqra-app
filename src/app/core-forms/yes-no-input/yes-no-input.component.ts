import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputConfig } from '../forms-schema.service';

@Component({
  selector: 'app-yes-no-input',
  templateUrl: './yes-no-input.component.html',
  styleUrls: ['./yes-no-input.component.scss']
})
export class YesNoInputComponent implements OnInit {
  @Input()
  control: FormControl;

  @Input()
  config: InputConfig;

  constructor() { }

  ngOnInit() {

  }

}
