import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss']
})
export class ListInputComponent implements OnInit {
  @Input() edgeControl: TemplateRef<any>;
  @Input() itemInput: TemplateRef<any>;
  @Input() itemControl: TemplateRef<any>;
  @Input() listItems: Array<any> = [];
  constructor() { }

  ngOnInit() {

  }

}
