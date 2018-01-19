import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GeneralDataService } from '../general-data.service';
import { Sequence } from '../../models/sequence';
import { SequenceDesignService } from '../sequence-design.service';

@Component({
  selector: 'app-sequence-form',
  templateUrl: './sequence-form.component.html',
  styleUrls: ['./sequence-form.component.scss']
})
export class SequenceFormComponent implements OnInit {
  @Input() sequence: Sequence = {
    header: {
      name: 'New sequence',
      description: 'This whole sequence is so new!'
    }
  };
  @Output() doneEditing: EventEmitter<Sequence> = new EventEmitter();

  @ViewChild('sequenceForm') public sequenceForm: NgForm;


  constructor(
    private api: GeneralDataService,
    private sequenceDesign: SequenceDesignService
  ) { }

  async ngOnInit() {
    await this.api.ready;
  }
  onSubmit() {
    if (this.sequence.id) {
      this.sequenceDesign.updateSequenceHeader(this.sequenceForm.value).subscribe(s => {
        this.doneEditing.emit(s);
      });
    }
    else {
      this.sequenceDesign.createNewSequence({ header: this.sequenceForm.value }).subscribe(s => {
            this.doneEditing.emit(s);
      });
    //   this.api.postData('interviewerRoutes', 'addSequence', {}, {...this.sequenceForm.stepResponse}).subscribe(s => {
    //   });
    }
  }
}
