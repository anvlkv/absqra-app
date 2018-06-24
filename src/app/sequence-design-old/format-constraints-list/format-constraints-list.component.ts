import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-format-constraints-list',
  templateUrl: './format-constraints-list.component.html',
  styleUrls: ['./format-constraints-list.component.scss']
})
export class FormatConstraintsListComponent implements OnInit {
  @Input()
  questionId: number;

  constructor() { }

  ngOnInit() {

  }

}
