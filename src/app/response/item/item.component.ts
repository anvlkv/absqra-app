import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../../models/item';
import { NgForm } from '@angular/forms';
import { AppInputs } from '../../inputs/inputs.module';
import { ResponseBody } from '../../../models/response';
import { AssetTypes } from '../../../models/enums/asset.enums';
import { QuantityOrder } from '../../../models/enums/item.enums';
import { InputTypes } from '../../inputs/default-input/default-input.component';
import { MultipleInputTypes } from '../../inputs/multiple-input/multiple-input.component';
import { TYPE_ValidationTypes, ValidationTypes } from '../../../models/enums/formatConstraint.enums';
import { ArrayInputItemArchetype } from '../../inputs/array-input/array-input.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  appInputTypes = AppInputs;
  private _item: Item;
  responseOptions: ResponseBody[];
  @ViewChild('itemForm') public itemForm: NgForm;
  displayAs: AppInputs;
  type: InputTypes | MultipleInputTypes;
  archetype: ArrayInputItemArchetype;
  @Input()
  set item(item: Item) {
    if (item) {
      this._item = {...item};

      switch (true) {
        case item.offers == QuantityOrder.NONE
        && item.expects == QuantityOrder.ONE: {
          // default
          this.displayAs = AppInputs.DefaultInputComponent;
          this.type = getItemInputType(item);
          break;
        }
        case item.offers == QuantityOrder.NONE
        && item.expects == QuantityOrder.MULTIPLE: {
          this.displayAs = AppInputs.ArrayInputComponent;
          this.archetype = {
            type: getItemInputType(item),
            response: null,
            source: `${item.id}`
          };
          // list
          break;
        }
        case item.offers == QuantityOrder.ONE && item.expects == QuantityOrder.ONE: {
          throw Error('input is not designed yet...');
          // y/n
          // break;
        }
        case item.offers == QuantityOrder.MULTIPLE && item.expects == QuantityOrder.MULTIPLE: {
          // checkboxes
          this.displayAs = AppInputs.MultipleInputComponent;
          this.type = getItemInputType(item);
          this.responseOptions = this.item.assets.map(asset => {
            return new ResponseBody({
              response: asset.content,
              source: `${asset.assetType == AssetTypes.STATIC ? asset.id : asset.source}`
            });
          });
          break;
        }
        case item.offers == QuantityOrder.MULTIPLE && item.expects == QuantityOrder.ONE: {
          // radios
          this.displayAs = AppInputs.MultipleInputComponent;
          this.type = getItemInputType(item);
          this.responseOptions = this.item.assets.map(asset => {
            return new ResponseBody({
              response: asset.content,
              source: `${asset.assetType == AssetTypes.STATIC ? asset.id : asset.source}`
            });
          });
          break;
        }
        // TODO: rating, card-sorting, etc...
        default: {
          // content
          break;
        }
      }


    }
  }
  get item(): Item {
    return this._item;
  }

  constructor() { }

  ngOnInit() {
    this.displayAs = AppInputs.ArrayInputComponent;
  }

  onSubmit(e, form) {
    e.preventDefault();

    console.log(form.value);
  }

}

export function getItemInputType (item: Item): InputTypes {
  const typeConstraint = item.formatConstraints.find(fc => fc.validationType == ValidationTypes.TYPE);
  let type: InputTypes;

  switch (typeConstraint.validationSubType) {
    case TYPE_ValidationTypes.IS_NUMBER: {
      type = InputTypes.number;
      break;
    }
    case TYPE_ValidationTypes.IS_EMAIL: {
      type = InputTypes.email;
      break;
    }
    case TYPE_ValidationTypes.IS_URL: {
      type = InputTypes.url;
      break;
    }
    case TYPE_ValidationTypes.IS_FILE: {
      type = InputTypes.file;
      break;
    }
    // TODO: map more types
    default: {
      type = InputTypes.text;
      break;
    }
  }
  return type;
}
