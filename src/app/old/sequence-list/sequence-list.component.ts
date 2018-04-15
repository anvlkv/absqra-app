import { Component, OnInit } from '@angular/core';
import { GeneralDataService } from '../../api/general-data.service';
import { Sequence } from '../../../models/sequence';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.scss']
})
export class SequenceListComponent implements OnInit {
  sequences: Observable<Array<Sequence>>;

  constructor(
    private api: GeneralDataService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.api.ready;

    this.sequences = this.api.getData('interviewerRoutes', 'getSequences', {});

  }

  onDoneEditing(s: Sequence) {
    if (!s) {
      return;
    }

    this.router.navigate(['old/ask', s.id]);
  }

}
