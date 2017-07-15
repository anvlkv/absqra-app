import { Component, OnInit } from '@angular/core';
import {Sequence} from "../../sequence";
import {ActivatedRoute} from "@angular/router";
import {MockDataService} from "../../mock-data.service";

@Component({
  selector: 'app-sequence-editor',
  templateUrl: './sequence-editor.component.html',
  styleUrls: ['./sequence-editor.component.scss']
})
export class SequenceEditorComponent implements OnInit {
  private sequence: Sequence;
  private sequenceId: string;
  private activeItemEditor: string;

  constructor(
    private route: ActivatedRoute,
    private dataService: MockDataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.sequenceId = params.sequenceId;
      this.dataService.getSequence(this.sequenceId).subscribe((sequence)=>{
        this.sequence = sequence;
      })
    })
  }

  addItem(){
    this.dataService.addItemToSequence({}, this.sequenceId).subscribe(resp=>{
      this.sequence = resp.Sequence;
      this.activeItemEditor = resp.itemId;
    })
  }

  doneEditing(itemId){
    console.log(itemId);
    if(this.activeItemEditor == itemId){
      this.activeItemEditor = null;
    }
  }

}
