import { Component, Input, OnInit } from '@angular/core';
import { ResponseService } from '../../api/response.service';
import { Sequence } from '../../../models/sequence';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.scss']
})
export class SequenceComponent implements OnInit {
  sequence: Sequence;
  currentStep: number;

  constructor(
    private rs: ResponseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({sequenceId}) => {
      this.rs.set$sequence(sequenceId).subscribe(s => this.sequence = s);
      this.currentStep = 0;
    });
  }

}
