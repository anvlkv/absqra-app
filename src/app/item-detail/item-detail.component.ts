import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Item } from '../../models/item';
import { NgForm } from '@angular/forms';
import { GeneralDataService } from '../general-data.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../../models/step';
import { ItemDesignService } from '../item-design.service';

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
  @Output() doneEditing: EventEmitter<Step | Item> = new EventEmitter();

  @ViewChild('itemForm') public itemForm: NgForm;
  itemOffersOptions: string[];
  itemExpectsOptions: string[];
  itemLifeCycleOptions: string[];
  editingQuestion = false;


  constructor(
    private api: GeneralDataService,
    private route: ActivatedRoute,
    private itemDesigner: ItemDesignService
  ) { }

  async ngOnInit() {
    await this.api.ready;

    this.route.params.subscribe(params => {
      if (params['itemId'] || this.item.id) {
        this.itemDesigner.set$item(params['itemId'] || this.item.id).subscribe(item => {
          this.item = item;
        });
      }
      this.itemExpectsOptions = this.api.apiTypes['QuantityOrder'];
      this.itemOffersOptions = this.api.apiTypes['QuantityOrder'];
      this.itemLifeCycleOptions = this.api.apiTypes['ItemLifeCycleTypes'];
    });
  }

  onSubmit(f: NgForm) {
    this.itemDesigner.updateItem({...f.value}).subscribe(item => {
      this.doneEditing.emit(item);
    });
  }

}
