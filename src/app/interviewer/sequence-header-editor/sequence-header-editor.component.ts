import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sequence } from '../../models/sequence';
import { InterviewerDataService } from '../interviewer-data.service';
import { GeneralDataService } from '../../general-data.service';

@Component({
  selector: 'app-sequence-header-editor',
  templateUrl: './sequence-header-editor.component.html',
  styleUrls: ['./sequence-header-editor.component.scss']
})
export class SequenceHeaderEditorComponent implements OnInit {
  @Input() sequence: Sequence;

  @Output() doneEditing: EventEmitter<Sequence> = new EventEmitter();

  sequenceModes: string[];

  constructor(
    private dataService: InterviewerDataService,
    private gd: GeneralDataService
  ) { }

  async ngOnInit() {
    await this.dataService.apiReady();

    this.sequenceModes = this.gd.enumTypes['SequenceModes'];
  }

  saveHeader() {
    this.dataService.updateSequenceHeader(this.sequence).subscribe(sequence => {
      this.doneEditing.emit(sequence);
    });
  }

}
