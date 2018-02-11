import { Component, OnInit } from '@angular/core';
import { GeneralDataService } from '../../api/general-data.service';
import { Sequence } from '../../../models/Sequence';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  sequences: Sequence[];

  constructor(
    private api: GeneralDataService
  ) { }

  async ngOnInit() {
    await this.api.ready;

    this.api.getData('respondentRoutes', 'getSequencesThatCanBeAnswered').subscribe(sequences => this.sequences = sequences);

  }

}
