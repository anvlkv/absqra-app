import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormatConstraint } from '../../models/formatConstraint';
import { ItemDesignService } from '../item-design.service';
import { GeneralDataService } from '../general-data.service';

@Component({
  selector: 'app-format-constraint-detail',
  templateUrl: './format-constraint-detail.component.html',
  styleUrls: ['./format-constraint-detail.component.scss']
})
export class FormatConstraintDetailComponent implements OnInit {
  @Input() formatConstraint: FormatConstraint;
  @Output() doneEditing: EventEmitter<FormatConstraint> = new EventEmitter();
  validationTypes: string[];

  constructor(
    private api: GeneralDataService,
    private itemDesign: ItemDesignService
  ) { }

  async ngOnInit() {
    await this.api.ready;
    this.validationTypes = this.api.apiTypes['ValidationTypes'];
    // this.contentTypes = this.api.apiTypes['AssetContentTypes'];
  }

  addConstraint(e) {
    e.preventDefault();

    this.itemDesign.addConstraint().subscribe(c => {
      this.doneEditing.emit(c);
    });
  }
}
