import { Component, OnInit, NgZone } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MockDataService} from '../../mock-data.service';
import {Sequence} from '../../sequence';


@Component({
  selector: 'app-sequence-editor',
  templateUrl: './sequence-editor.component.html',
  styleUrls: ['./sequence-editor.component.scss']
})
export class SequenceEditorComponent implements OnInit {
  private sequenceId: string;
  private sequence: Sequence;

  constructor(
    private dataService: MockDataService,
    private rs: ActivatedRoute,
    private z: NgZone
  ) { }

  ngOnInit() {
      this.rs.params.subscribe(p => {
        this.sequenceId = p.sequenceId;

        this.dataService.getSequence(this.sequenceId).subscribe(sequence => {
          this.z.run(() => {

            this.sequence = sequence;
          });
        });
      });
  }
}
