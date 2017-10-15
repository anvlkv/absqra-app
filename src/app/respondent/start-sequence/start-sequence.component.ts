import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sequence } from '../../../models/sequence';
import { SequenceService } from '../sequence.service';

@Component({
  selector: 'app-start-sequence',
  templateUrl: './start-sequence.component.html',
  styleUrls: ['./start-sequence.component.scss']
})
export class StartSequenceComponent implements OnInit {
  sequence: Sequence;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private sequenceService: SequenceService) {
  }

  ngOnInit() {
    this.sequenceService.sequence$.subscribe(s => {
      this.sequence = s;
    });
  }

  startSequence() {
    this.router.navigate(['answer', this.sequence.id, this.sequence.itemsIds[0]]);
  }
}
