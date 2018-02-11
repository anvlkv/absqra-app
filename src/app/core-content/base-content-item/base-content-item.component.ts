import { Component, Input, OnInit } from '@angular/core';
import { Asset } from '../../../models/Asset';

@Component({
  selector: 'app-base-content-item',
  templateUrl: './base-content-item.component.html',
  styleUrls: ['./base-content-item.component.scss']
})
export class BaseContentItemComponent implements OnInit {
  @Input() item: Asset;

  constructor() { }

  ngOnInit() {
  }

}
