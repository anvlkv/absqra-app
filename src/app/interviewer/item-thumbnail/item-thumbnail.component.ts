import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-thumbnail',
  templateUrl: './item-thumbnail.component.html',
  styleUrls: ['./item-thumbnail.component.scss']
})
export class ItemThumbnailComponent implements OnInit {
  @Input() itemId: string;

  constructor() { }

  ngOnInit() {
  }

}
