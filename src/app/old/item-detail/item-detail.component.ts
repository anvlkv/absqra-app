import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Item } from '../../../models/item';
import { NgForm } from '@angular/forms';
import { GeneralDataService } from '../../api/general-data.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../../../models/step';
import { ItemDesignService } from '../../api/item-design.service';
import { Asset } from '../../../models/asset';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  providers: [
    ItemDesignService
  ]
})
export class ItemDetailComponent implements OnInit {
  @Input() item: Item = {};
  @Input() step: Step = {};
  @Output() doneEditing: EventEmitter<Item> = new EventEmitter();

  @ViewChild('itemForm')
  public itemForm: NgForm;

  itemOffersOptions: string[];
  itemExpectsOptions: string[];
  itemLifeCycleOptions: string[];
  editingQuestion = false;


  constructor(
    private api: GeneralDataService,
    private route: ActivatedRoute,
    private itemDesigner: ItemDesignService,
  ) { }

  async ngOnInit() {
    await this.api.ready;

    this.route.params.subscribe(params => {
      let itemObservable;

      if (params['itemId'] && this.item.id && this.step.id) {
        throw Error(`Ambiguous item-detail component initialisation: params['itemId'] && this.item.id && this.step.id : ${params['itemId']} && ${this.item.id} && ${this.step.id}`);
      }

      if (params['itemId'] || this.item.id) {
        itemObservable = this.itemDesigner.set$item(params['itemId'] || this.item.id);
      }
      else if (this.step.id) {
        itemObservable = this.itemDesigner.set$itemByStepId(this.step.id);
      }

      itemObservable.subscribe(item => {
        this.item = item;
      });

      this.itemExpectsOptions = this.api.apiTypes['QuantityOrder'];
      this.itemOffersOptions = this.api.apiTypes['QuantityOrder'];
      this.itemLifeCycleOptions = this.api.apiTypes['ItemLifeCycleTypes'];
    });
  }

  onSubmit() {
    this.itemDesigner.updateItem(this.item).subscribe(item => {
      this.doneEditing.emit(item);
    });
  }

}
