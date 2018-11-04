import { SequenceDetailComponent } from './sequence-detail.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SequenceService } from './sequence.service';
import { unpackEnum } from '../../utils';
import { SequenceDetailCRouteReservedParam } from '../../../models/reservedRouteParams';
import { combineLatest } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../project/project-detail/project.service';
import { OnItemSet } from '../../app-common/base-detail/base-detail';


@Component({
  selector: 'view-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss', '../styles/sequence-design.scss'],
  providers: [SequenceService]
})
export class SequenceDetailViewComponent extends SequenceDetailComponent implements AfterViewInit, OnInit, OnItemSet {
  private shouldSaveAsTopSequence: boolean;

  constructor(
    sequenceService: SequenceService,
    fb: FormBuilder,
    projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(sequenceService, fb, projectService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(({sequenceId}) => {
      if (!unpackEnum(SequenceDetailCRouteReservedParam).includes(sequenceId)) {
        this.dataItemService.fetch(sequenceId);
      }
      this.shouldSaveAsTopSequence = sequenceId === SequenceDetailCRouteReservedParam.TOP;
    });
  }

  bdOnItemSet(loaded) {
    if (loaded) {
      const prefix = this.route.snapshot.params['stepId'] ? '../../' : '../';
      const commands = [prefix, this.dataItemId, this.route.snapshot.params['stepId']];
      this.router.navigate(commands.filter(c => !!c), {relativeTo: this.route})
    }
  }

  ngAfterViewInit() {
    combineLatest(
      this.stepComponents.changes,
      this.route.params
    ).subscribe(([changes, {stepId}]) => {
      const foundStep = this.stepComponents.find(stepC  => {
        return stepC.dataItemId === stepId
      });
      if (foundStep) {
        foundStep.scrollIntoView();
      }
    });
  }
}
