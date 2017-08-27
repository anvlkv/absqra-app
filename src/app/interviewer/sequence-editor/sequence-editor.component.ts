import { Component, OnInit } from '@angular/core';
import {Sequence} from "../../sequence";
import {ActivatedRoute, Router} from "@angular/router";
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
    private router: Router,
    private dataService: MockDataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.sequenceId = params.sequenceId;
      this.dataService.getSequence(this.sequenceId).subscribe((sequence)=>{
        this.sequence = sequence;
      });

      if(params.itemId){
        this.activeItemEditor = params.itemId;
      }
    })
  }

  addItem(){
    this.dataService.addItemToSequence({}, this.sequenceId).subscribe(resp=>{
      this.sequence = resp.Sequence;
      this.activeItemEditor = resp.itemId;
      this.router.navigate(['ask', this.sequence.id, this.activeItemEditor]);
    })
  }

  doneEditing(itemId){
    console.log(itemId);
    if(this.activeItemEditor == itemId){
      this.activeItemEditor = null;
      this.router.navigate(['ask', this.sequence.id]);
    }
  }

  activateItemEditor(id){
    // if(!this.activeItemEditor){
      this.activeItemEditor = id;
    this.router.navigate(['ask', this.sequence.id, this.activeItemEditor]);
    // }
    // else{
    //
    // }
  }

  deleteItem(id){
    this.dataService.deleteItem(id).subscribe(r=>console.log(r));
  }

}
