import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-item-thumbnail',
  templateUrl: './item-thumbnail.component.html',
  styleUrls: ['./item-thumbnail.component.scss']
})
export class ItemThumbnailComponent implements OnInit {
  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

}
