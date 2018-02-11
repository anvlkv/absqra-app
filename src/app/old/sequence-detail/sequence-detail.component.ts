import { Component, Input, OnInit } from '@angular/core';
import { GeneralDataService } from '../../api/general-data.service';
import { Sequence } from '../../../models/Sequence';
import { ActivatedRoute } from '@angular/router';
import { SequenceDesignService } from '../../api/sequence-design.service';
import { Step } from '../../../models/Step';

@Component({
  selector: 'app-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss'],
})
export class SequenceDetailComponent implements OnInit {
  @Input() sequence: Sequence;
  editing: {[id: number]: boolean} = {};

  constructor(
    private api: GeneralDataService,
    private route: ActivatedRoute,
    private sd: SequenceDesignService
  ) { }

  async ngOnInit() {
    await this.api.ready;
    this.route.params.subscribe(params => {
      this.sd.set$sequence(params['sequenceId'] || this.sequence.id).subscribe(s => this.sequence = s);
    });

  }

  saveSteps(form) {
    console.log(form);
  }
}
