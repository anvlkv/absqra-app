import { Component, OnInit } from '@angular/core';
import {MockDataService} from '../../mock-data.service';
import {Sequence} from '../../sequence';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sequences: Sequence[];
  mode = 'Observable';
  newSequenceName: string = '';

  constructor(
    private dataService: MockDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getSequences().subscribe(
      sequences => this.sequences = sequences,
      error => console.log(error)
    );
  }

  addSequence(name: string) {
    this.dataService.postSequence({name}).subscribe((res: Sequence) => {
      this.router.navigate(['ask', res.id]);
    });
  }

}
