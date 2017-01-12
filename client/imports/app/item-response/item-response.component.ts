import { Component, Output, EventEmitter, Input } from '@angular/core';
import template from './item-response.component.html';
import {FormGroup} from "@angular/forms";
import {ISingleChoice, ISingleTaskComposition} from "../../models/single-task-composition.model";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

@Component({
    selector: 'item-response',
    template
})

export class ItemResponseComponent {
    @Input() task: ISingleTaskComposition;
    // taskSub: Subscription;
    // paramsSub: Subscription;
    @Input() responseForm: FormGroup;
    // choices: any[];
    // zone: NgZone;
    // @Input() taskId: string;
    @Output() submitCall: EventEmitter<null> = new EventEmitter<null>();
    @Output() resetCall: EventEmitter<null> = new EventEmitter<null>();
    // submitResponse(): void{
    //     this.submitCall.emit();
    // }

    // private formGroupItems: any;



    // constructor(
    //     private route: ActivatedRoute,
    //     private formBuilder: FormBuilder,
    //     private changeDetectorRef: ChangeDetectorRef
    // ){
    //     this.zone = new NgZone({enableLongStackTrace: false});
    // }
    //
    // ngOnInit(): void{
    //     if (!this.taskId){
    //         this.paramsSub = this.route.params
    //             .map(params => params['taskId'])
    //             .subscribe(taskId => {
    //                 this.zone.run(()=>{
    //                     this.setTask(taskId);
    //                 })
    //             });
    //     }
    // }
    //
    // ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    //     if (changes['taskId']){
    //         this.zone.run(()=>{
    //             this.setTask(changes['taskId'].currentValue);
    //         })
    //     }
    // }
    //
    // // http://localhost:3000/response/MhqZ26EnQE96TLWZs/qZZGA5yGMtK46gA4s
    //
    // setTask(taskId:string): void{
    //     this.taskId = taskId;
    //
    //     if (this.taskSub){
    //         this.taskSub.unsubscribe();
    //     }
    //
    //     this.taskSub = MeteorObservable.subscribe('task', this.taskId).subscribe(()=>{
    //         this.loadTask();
    //         this.changeDetectorRef.markForCheck();
    //     });
    // }
    //
    // loadTask(): void{
    //     this.task = Tasks.findOne(this.taskId);
    //     this.choices = [];
    //
    //     if (this.task.assets){
    //         this.loadTaskAssets();
    //     }
    //     this.buildForm();
    // }
    //
    // buildForm():void{
    //     this.formGroupItems = {};
    //
    //     switch (this.task.taskConfig.taskType){
    //         case 'multiple-choice':
    //             this.choices.forEach((choice)=>{
    //                 this.formGroupItems[choice.name] = ['']
    //             });
    //             break;
    //         default:
    //             this.formGroupItems = {
    //                 responseInput: ['', Validators.required]
    //             };
    //             break;
    //     }
    //
    //     this.responseForm = this.formBuilder.group(this.formGroupItems);
    // }
    //
    // loadTaskAssets(): void{
    //     this.task.assets.forEach((asset, index)=>{
    //         if (asset.assetType === 'text'){
    //             let choiceName = 'responseChoice_'+index;
    //             this.choices.push({
    //                 label: asset.text,
    //                 value: index,
    //                 name: choiceName,
    //                 checked: false
    //             });
    //         }
    //     })
    // }
    //
    //
    //
    // ngOnDestroy(): void{
    //     this.paramsSub.unsubscribe();
    //     this.taskSub.unsubscribe();
    // }
}


