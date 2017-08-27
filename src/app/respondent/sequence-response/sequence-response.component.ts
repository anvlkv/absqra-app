import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MockDataService } from "../../mock-data.service";
import { Sequence } from "../../sequence";
import { Item } from "../../item";
import { SequenceService } from "../sequence.service";

@Component({
  selector: 'app-sequence-response',
  templateUrl: './sequence-response.component.html',
  styleUrls: ['./sequence-response.component.scss'],
  providers: [SequenceService]
})
export class SequenceResponseComponent implements OnInit {
  sequence: Sequence;
  items: Item[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: MockDataService,
    private sequenceService: SequenceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      this.dataService.getSequence(p.sequenceId).subscribe(sequence=>{
        this.sequence = sequence;
        this.sequenceService.setSequence(sequence);
      });
    })
  }

}
