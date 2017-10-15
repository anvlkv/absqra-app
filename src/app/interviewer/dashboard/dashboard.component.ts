import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MockDataService } from '../../mock-data.service';
import { Sequence } from '../../../models/sequence';
import { GeneralDataService } from '../../general-data.service';
import { InterviewerDataService } from '../interviewer-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sequences: Sequence[];
  newSequenceName: string = '';

  constructor(
    private router: Router,
    private dataService: InterviewerDataService
  ) {

  }

  async ngOnInit() {
    await this.dataService.apiReady();

    this.dataService.getSequences().subscribe(
      sequences => this.sequences = sequences,
      error => console.log(error)
    );
  }

  addSequence(name: string) {
    this.dataService.addSequence({name}).subscribe(res => {
      this.router.navigate(['ask', res._id]);
    });
  }

}
