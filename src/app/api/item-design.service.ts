import { Injectable } from '@angular/core';
import { GeneralDataService } from './general-data.service';
import { Item } from '../../models/item';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Asset } from '../../models/asset';
import { FormatConstraint } from '../../models/formatConstraint';
import { SequenceDesignService } from './sequence-design.service';
import { Step } from '../../models/step';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ItemDesignService {
  private $item: Subject<Item>;
  private $step: BehaviorSubject<Step>;
  private step: Step;
  private item: Item;

  constructor(
    private api: GeneralDataService,
    private sd: SequenceDesignService
  ) {
    this.$item = new Subject();
    this.$step = new BehaviorSubject(null);
    this.getItem().subscribe(i => this.item = i);
    this.$step.asObservable().subscribe(s => {
      if (s && s.item) {
        this.$item.next(s.item);
        this.step = s;
      }
    });
  }

  public getItem(): Observable<Item> {
    return this.$item.asObservable();
  }

  public set$itemByStepId(stepId: number): Observable<Item> {
    const observableItem = this.getItem();

    this.api.getData('interviewerRoutes', 'getStep', {stepId: stepId}).subscribe( s => {
      this.$step.next(s);
    });

    return observableItem;
  };

  public set$item(itemId: number): Observable<Item> {
    const observableItem = this.getItem();

    this.api.getData('interviewerRoutes', 'getItem', {itemId: itemId}).subscribe(i => this.$item.next(i));



    return observableItem;
  }

  public updateItem(value: Item): Observable<Item> {
    this.api.patchData('interviewerRoutes', 'updateItem', {itemId: this.item.id}, value).subscribe(i => this.$item.next(i));
    return this.$item.asObservable();
  }

  public addAsset(value?: Asset): Observable<Asset> {
    const $assetSubj = new Subject();

    value = value || {order: this.item.assets.length};

    this.api.postData('interviewerRoutes', 'addAssetToItem', {itemId: this.item.id}, value).subscribe(a => {
      this.$item.next({
        ...this.item,
        assets: [...this.item.assets, a]
      });

      $assetSubj.next(a);
    });

    return $assetSubj.asObservable();
  }

  public updateItemAssetsOrder(assets: Asset[], assetsToUpdate: [Asset, Asset]): Observable<Item> {
    this.api.patchData('interviewerRoutes', 'updateItemAssetsOrder', {itemId: this.item.id}, assetsToUpdate).subscribe(i => this.$item.next(i));
    this.$item.next({
      ...this.item,
      assets
    });
    return this.$item.asObservable();
  }

  public addConstraint(value?: FormatConstraint): Observable<FormatConstraint> {
    const $constraintSubj: Subject<FormatConstraint> = new Subject();

    this.api.postData('interviewerRoutes', 'addConstraintToItem', {itemId: this.item.id}, value).subscribe(c => {
      this.$item.next({
        ...this.item,
        formatConstraints: [...this.item.formatConstraints, c]
      });

      $constraintSubj.next(c);
    });

    return $constraintSubj.asObservable();
  }

  public getReferableItems(): Observable<Item[]> {
    const $itemsSubj: Subject<Item[]> = new Subject();

    this.sd.getSequence().subscribe(sequence => {
      this.$step.asObservable().subscribe(step => {
        if (!step) {
          return;
        }

        this.api.getData('interviewerRoutes', 'referableItems', {sequenceId: sequence.id, fromStepId: step.id}).subscribe(items => $itemsSubj.next(items));
      });
    });



    return $itemsSubj.asObservable();
  }

  // public addNewItem(): Observable<Step> {
  //   const $stepSubj = new Subject();
  //
  //   this.api.postData('interviewerRoutes', 'addNewItemToSequence', {sequenceId: }, {}).subscribe(step => {
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
  setItemQuestion(value?: Asset) {
    const $questionSubj = new Subject();

    this.api.postData('interviewerRoutes', 'setItemQuestion', {itemId: this.item.id}, value).subscribe(question => {
      this.$item.next({
        ...this.item,
        question
      });

      $questionSubj.next(question);
    });

    return $questionSubj.asObservable();
  }
}
