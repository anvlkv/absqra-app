import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../../models/item';
import { NgForm } from '@angular/forms';
import { AppInputs } from '../../inputs/inputs.module';
import { ResponseBody } from '../../../models/response';
import { AssetTypes } from '../../../models/enums/asset.enums';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private _item: Item;
  @Input()
  set item(item: Item) {
    if (item) {
      this._item = {...item};
      this.responseOptions = this.item.assets.map(asset => {
        return new ResponseBody({
          response: asset.content,
          source: `${asset.assetType == AssetTypes.STATIC ? asset.id : asset.source}`
        });
      })
    }
  }
  get item(): Item {
    return this._item;
  }

  @ViewChild('itemForm') public itemForm: NgForm;
  responseOptions: ResponseBody[];
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
