import {Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef, Pipe, PipeTransform} from "@angular/core";
import template from "./sequence-editor.component.html";
import {ActivatedRoute, Router} from "@angular/router";
import {MeteorObservable} from "meteor-rxjs";
import {Sequences} from "../../../../both/collections/sequences.collection";
import {ISequence} from "../../../../both/models/single-sequence.model";
import {Subscription, Observable} from 'rxjs';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Items} from "../../../../both/collections/items.collection";
import {ISingleItem} from "../../../../both/models/single-item.model";
import {forEach} from "@angular/router/src/utils/collection";


/**
 * Created by a.nvlkv on 01/12/2016.
 */

@Component({
    selector: 'sequence-editor',
    template
})

export class SequenceEditorComponent implements OnInit, OnDestroy{
    private paramsSub: Subscription;
    private sequenceSub: Subscription;
    private itemsSub: Subscription;
    private sequenceId: string;
    private sequence: ISequence;
    private items: Observable<ISingleItem[]>;
    private sequenceDescriptorFormGroup: FormGroup;
    private zone: NgZone;
    private sequenceEditorIsActive: boolean;
    private activeItemEditor: string;
    private sequenceItemsSub: Subscription;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private _ch: ChangeDetectorRef
    ){
        this.zone = new NgZone({enableLongStackTrace: true});
    }


    getItem(itemId){
        return Items.findOne(itemId);
    }

    ngOnInit(){

        this.paramsSub = this.route.params.subscribe(params => {
            this.sequenceId = params['sequenceId'];

            if (this.sequenceSub) {
                this.sequenceSub.unsubscribe();
                if(this.itemsSub){
                    this.itemsSub.unsubscribe();
                }
            }

            if(this.sequenceId){
                this.sequenceSub = MeteorObservable.subscribe('author-per-sequence-subscription', this.sequenceId).subscribe(()=>{
                    this.zone.run(()=>{
                        this.sequence = Sequences.findOne();
                        if (this.sequence){
                            this.sequenceEditorIsActive = false;
                            this.sequenceDescriptorFormGroup = this.formBuilder.group({
                                sequenceName: [this.sequence.name, Validators.required],
                                sequenceDescription: [this.sequence.description]
                            });
                        }

                        this.sequenceItemsSub = Sequences.find(this.sequenceId, {fields: {itemsSequence:1}}).subscribe((seq:ISequence)=>{
                            this.zone.run(()=>{
                                if(seq[0].itemsSequence){
                                    this.itemsSub = MeteorObservable.subscribe('author-sequence-items-subscription', seq[0].itemsSequence).subscribe(()=>{
                                        this.items = Items.find({_id:{$in:seq[0].itemsSequence}}).zone();

                                    })
                                }
                            });
                        });
                    });
                });

            }else{
                this.sequenceEditorIsActive = true;
                this.sequence = {name:'', description:''};
                this.sequenceDescriptorFormGroup = this.formBuilder.group({
                    sequenceName: [this.sequence.name, Validators.required],
                    sequenceDescription: [this.sequence.description]
                });
            }

        });
    }

    ngOnDestroy(){
        this.paramsSub.unsubscribe();
        if(this.sequenceSub)
            this.sequenceSub.unsubscribe();
        if(this.itemsSub)
            this.itemsSub.unsubscribe();
        if(this.sequenceItemsSub)
            this.sequenceItemsSub.unsubscribe();
    }

    saveSequenceDescriptor(form: FormGroup){
        if(form.valid){
            let sequenceSaveResult = Sequences.upsert({_id:this.sequenceId}, {
                $set: {
                    name:form.value.sequenceName,
                    description:form.value.sequenceDescription
                }});


            sequenceSaveResult.subscribe((result:any)=>{
                this.zone.run(()=>{
                    if (result.insertedId){
                        this.router.navigate(['edit', result.insertedId]);
                    }
                    this.sequenceEditorIsActive = false;
                })
            });
        }
    }

    createNewItem(){
        MeteorObservable.call('newItemInSequence', this.sequenceId).subscribe((resp: string)=>{
            this.zone.run(()=>{
                this.activeItemEditor = resp;
            })
        }, (error)=>{
            console.log(error);
        });
    }

    finishItemEditing(id){
        if(this.activeItemEditor === id)
            this.activeItemEditor = '';
    }
}

@Pipe({
    name: 'itemsSort',
})
export class ItemSortPipe implements PipeTransform{

    transform(items: ISingleItem[], sequence: string[]):ISingleItem[]{
        let sortable: ISingleItem[];
        if(items && sequence) {
            sortable = items.slice();

            // items.forEach((itm, i)=>{
            //     let index = sequence.indexOf(itm._id);
            //
            // })
            sortable.sort((itm1, itm2) => {
                // console.log(sequence.indexOf(itm1._id), sequence.indexOf(itm2._id));
                return sequence.indexOf(itm1._id) - sequence.indexOf(itm2._id)
            });
            // sortable.forEach((itm)=>{
            //     console.log(itm._id, itm.name);
            // });
        }

        return sortable;
    }
}

function recursivelySortArray (items:ISingleItem[], sequence:string[], sortable?:ISingleItem[]):ISingleItem[]{
    sortable = sortable ? sortable : [];
    items.forEach((itm, i)=>{
        let index = sequence.indexOf(itm._id);
        if(sortable.length >= index){
            sortable.splice(index, 0 , itm);
        }else{
            items.push(items.splice(i, 1));
            sortable = recursivelySortArray(items, sequence, sortable);
        }
    })
    return sortable;
}