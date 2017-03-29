import {Component, OnInit, OnDestroy, NgZone, Pipe, PipeTransform} from "@angular/core";
import template from "./sequence-editor.component.html";
import {ActivatedRoute, Router} from "@angular/router";
import {MeteorObservable} from "meteor-rxjs";
import {Sequences} from "../../../../both/collections/sequences.collection";
import {ISequence} from "../../../../both/models/single-sequence.model";
import {Subscription, Observable} from 'rxjs';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Items} from "../../../../both/collections/items.collection";
import {ISingleItem} from "../../../../both/models/single-item.model";


/**
 * Created by a.nvlkv on 01/12/2016.
 */

@Component({
    selector: 'sequence-editor',
    template,
})

export class SequenceEditorComponent implements OnInit, OnDestroy{
    paramsSub: Subscription;
    sequenceSub: Subscription;
    itemsSub: Subscription;
    sequenceId: string;
    sequence: ISequence;
    items: Observable<ISingleItem[]>;
    sequenceDescriptorFormGroup: FormGroup;
    zone: NgZone;
    sequenceEditorIsActive: boolean;
    activeItemEditor: string;
    sequenceItemsSub: Subscription;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
    ){
        this.zone = new NgZone({enableLongStackTrace: true});
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

                        this.sequenceItemsSub = Sequences.find(this.sequenceId).subscribe((seq:ISequence)=>{
                            if(seq[0].itemsSequence && seq[0].itemsSequence.every((item)=>!!item)){
                                this.sequence = seq[0];
                                if(this.itemsSub)
                                    this.itemsSub.unsubscribe();
                                this.itemsSub = MeteorObservable.subscribe('author-sequence-items-subscription', seq[0].itemsSequence).subscribe(()=>{
                                    this.items = Items.find({_id:{$in:seq[0].itemsSequence}}).zone();

                                })
                            }
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

    editItem(itemId){
        this.activeItemEditor=itemId;
    }

    updateSequence(e){
        Sequences.update(this.sequenceId, {$set:{itemsSequence:this.sequence.itemsSequence}});
    }
}

@Pipe({
    name: 'itemsSort',
    pure: false
})
export class ItemSortPipe implements PipeTransform{
    transform(sequence: string[], items: ISingleItem[]):ISingleItem[]{
        let sortable:ISingleItem[]=[];
        if(sequence && items){
            sequence.forEach((itemId)=>{
                sortable.push(items.find((item)=>item._id===itemId));
            })
        }
        return sortable;
    }
}