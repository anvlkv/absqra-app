import { Injectable } from '@angular/core';
import { GeneralDataService } from './general-data.service';
import { Item } from '../models/item';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemDesignService {
  private $item: Subject<Item>;
  private item: Item;
  constructor(
    private api: GeneralDataService
  ) {
    this.$item = new Subject();
    this.getItem().subscribe(i => this.item = i);
  }

  public getItem(): Observable<Item> {
    return this.$item.asObservable();
  }

  public set$item(itemId: number): Observable<Item> {
    const observableItem = this.getItem();

    this.api.getData('interviewerRoutes', 'getItem', {itemId: itemId}).subscribe(i => this.$item.next(i));

    return observableItem;
  }

  public updateItem(value: Item): Observable<Item> {
    this.api.patchData('interviewerRoutes', 'updateItem', {itemId: this.item.id}, value).subscribe(i => this.$item.next(i));
    return this.$item.asObservable();
  }

  public addAsset() {

  }

  public addConstraint() {

  }

  // public addNewItem(): Observable<Step> {
  //   const $stepSubj = new Subject();
  //
  //   this.api.postData('interviewerRoutes', 'addNewItemToSequence', {sequenceId: this.item.id}, {}).subscribe(step => {
  //     this.$item.next({
  //       ...this.item,
  //       steps: [
  //         ...this.item.steps,
  //         step
  //       ]
  //     });
  //     $stepSubj.next(step);
  //   });
  //
  //   return $stepSubj.asObservable();
  // }
}
