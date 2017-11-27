import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Step } from '../../models/step';
import { GeneralDataService } from '../general-data.service';
import { Item } from '../../models/item';
import { Observable } from 'rxjs/Observable';
import { SequenceDesignService } from '../sequence-design.service';

@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss']
})
export class StepDetailComponent implements OnInit {
  @Input() Step: Observable<Step>;
  @Input() stepId: number;
  step: Step = {};
  @Output() doneEditing: EventEmitter<Step> = new EventEmitter();
  stepTypes: string[];


  constructor(
    private api: GeneralDataService,
    private sd: SequenceDesignService
  ) { }

  async ngOnInit() {
    await this.api.ready;

    this.stepTypes = this.api.apiTypes['StepTypes'];

    if (!this.Step && this.stepId) {
      this.Step = this.api.getData('interviewerRoutes', 'getStep', {stepId: this.stepId});
    }

    if (this.Step) {
      this.Step.subscribe(s => this.step = s);
    }
  }

  onDoneItemEditing(item: Item) {
    // this.step.item = item;
    this.doneEditing.emit();
  }

  addItem() {
    this.sd.addNewItem().subscribe((s) => {
      this.doneEditing.emit(s);
    });
  }

}
