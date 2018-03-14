import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../../../api/response.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sequence } from '../../../../models/Sequence';

@Component({
  selector: 'app-sequence-response',
  templateUrl: './sequence-response.component.html',
  styleUrls: ['./sequence-response.component.scss']
})
export class SequenceResponseComponent implements OnInit {
  sequence: Sequence;

  constructor(
    private response: ResponseService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(({sequenceId, stepId}) => {
        this.setSequence(sequenceId, stepId);
    });
  }

  setSequence(sequenceId, stepId?) {
    this.response.set$sequence(sequenceId).subscribe(s => {
      this.sequence = s;
      this.response.nextStep().subscribe(step => {
      });
    });
  }

}
