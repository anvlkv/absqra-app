import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../../models/item';
import { NgForm } from '@angular/forms';
import { AppInputs } from '../../inputs/inputs.module';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @ViewChild('itemForm') public itemForm: NgForm;

  appInputTypes = AppInputs;
  displayAs: AppInputs;

  constructor() { }

  ngOnInit() {
    this.displayAs = AppInputs.ArrayInputComponent;
  }

  onSubmit(e, form) {
    e.preventDefault();

    console.log(form.value);
  }

}
