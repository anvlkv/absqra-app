import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ListItem {
  content?: string;
}

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListInputComponent),
      multi: true
    }
  ]
})
export class ListInputComponent implements OnInit, ControlValueAccessor {
  @Input() listItems: Array<ListItem>;


  constructor() { }

  ngOnInit() {
  }

  writeValue(val: ListItem[]) {
    if (!val || val.length === 0) {
      val = [{content: null}];
    }
    this.listItems = val;
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}


  addNewItem($event) {
    $event.preventDefault();

    this.listItems.push({content: ''});

    this.propagateChange(this.listItems);
  }

  removeItem($event, index) {
    $event.preventDefault();

    this.listItems.splice(index, 1);

    this.propagateChange(this.listItems);
  }
}
