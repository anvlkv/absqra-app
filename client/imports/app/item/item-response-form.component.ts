import {Component, OnInit, OnDestroy} from '@angular/core';
import template from './item-response-form.component.html';
import {SingleTask} from '../../../../both/models/single-task.model';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import 'rxjs/add/operator/map';
import {Tasks} from '../../../../both/collections/tasks.collection';
import {MeteorObservable} from "meteor-rxjs";
/**
 * Created by a.nvlkv on 19/11/2016.
 */

@Component({
    selector: 'item-response-form',
    template
})

export class ItemResponseFormComponent implements OnInit, OnDestroy{
    taskId: string;
    task: SingleTask;
    taskSub: Subscription;
    paramsSub: Subscription;

    constructor(
        private route: ActivatedRoute
    ){}

    ngOnInit(){
        this.paramsSub = this.route.params
            .map(params => params['taskId'])
            .subscribe(taskId => {
                this.taskId = taskId;

                if (this.taskSub){
                    this.taskSub.unsubscribe();
                }

                this.taskSub = MeteorObservable.subscribe('task', this.taskId).subscribe(()=>{
                    this.task = Tasks.findOne(this.taskId);

                })
            });
    }

    ngOnDestroy(){
        this.paramsSub.unsubscribe();
        this.taskSub.unsubscribe();
    }
}


