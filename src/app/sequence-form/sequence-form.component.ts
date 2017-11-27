import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralDataService } from '../general-data.service';
import { Sequence } from '../../models/sequence';

@Component({
  selector: 'app-sequence-form',
  templateUrl: './sequence-form.component.html',
  styleUrls: ['./sequence-form.component.scss']
})
export class SequenceFormComponent implements OnInit {
  @Input() sequence: Sequence = {};
  @Output() doneEditing: EventEmitter<Sequence> = new EventEmitter();

  @ViewChild('sequenceForm') public sequenceForm: NgForm;


  constructor(
    private api: GeneralDataService
  ) { }

  async ngOnInit() {
    await this.api.ready;
  }
  onSubmit() {
    if (this.sequence.id) {
      this.api.patchData('interviewerRoutes', 'updateSequenceHeader', {sequenceId: this.sequence.id}, {...this.sequenceForm.value, id: this.sequence.id}).subscribe(s => {
        this.doneEditing.emit(s);
      });
    }
    else {
      this.api.postData('interviewerRoutes', 'addSequence', {}, {...this.sequenceForm.value}).subscribe(s => {
        this.doneEditing.emit(s);
      });
    }
  }
}
