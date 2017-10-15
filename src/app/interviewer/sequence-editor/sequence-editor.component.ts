import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../mock-data.service';
import { Sequence } from '../../../models/sequence';
import { GeneralDataService } from '../../general-data.service';
import { InterviewerDataService } from '../interviewer-data.service';

@Component({
  selector: 'app-sequence-editor',
  templateUrl: './sequence-editor.component.html',
  styleUrls: ['./sequence-editor.component.scss']
})
export class SequenceEditorComponent implements OnInit {
  private sequenceId: string;

  sequence: Sequence;
  activeItemEditor: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: InterviewerDataService
  ) {
  }

  async ngOnInit() {
    await this.dataService.apiReady();
    this.route.params.subscribe((params) => {
      this.sequenceId = params.sequenceId;
      this.dataService.getSequence(this.sequenceId).subscribe((sequence) => {
        this.sequence = sequence;
      });

      if (params.itemId) {
        this.activeItemEditor = params.itemId;
      }
    });
  }

  addItem() {
    this.dataService.addNewItemToSequence(this.sequenceId, {}).subscribe(result => {

      this.sequence = result;
      this.activeItemEditor = result.uses[result.uses.length - 1];
      // this.router.navigate(['ask', this.sequence._id, this.activeItemEditor]);
    });
  }

  doneEditing(itemId) {
    // console.log(itemId);
    if (this.activeItemEditor === itemId) {
      this.activeItemEditor = null;
      this.router.navigate(['ask', this.sequence.id]);
    }
  }

  activateItemEditor(id) {
    // if(!this.activeItemEditor){
    this.activeItemEditor = id;
    this.router.navigate(['ask', this.sequence.id, this.activeItemEditor]);
    // }
    // else{
    //
    // }
  }

  removeItem(id) {
    this.dataService.removeItem(this.sequenceId, id).subscribe(r => console.log(r));
  }

}
