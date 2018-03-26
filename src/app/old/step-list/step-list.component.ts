import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../../models/step';
import { SortableService } from '../sortable.service';
import { SequenceDesignService } from '../../api/sequence-design.service';

@Component({
  selector: 'app-step-list',
  templateUrl: './step-list.component.html',
  styleUrls: ['./step-list.component.scss']
})
export class StepListComponent implements OnInit {
  @Input() steps: Step[];
  editing: {[id: number]: boolean} = {};

  constructor(
    private sort: SortableService,
    private sequenceDesign: SequenceDesignService
  ) { }

  ngOnInit() {
  }

  stepAdded(step: Step) {
    this.editing[step.id] = true;
  }

  onOrderChanged(step, [oldOrder, newOrder]) {
    this.sequenceDesign.updateSequenceStepsOrder(this.sort.reorderSortables(this.steps, step, oldOrder, newOrder)).subscribe(s => {
      console.log(s);
    });
  }
}
