import { SequenceDetailComponent } from './sequence-detail.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SequenceService } from './sequence.service';
import { unpackEnum } from '../../utils';
import { SequenceDetailCRouteReservedParam } from '../../../models/reservedRouteParams';
import { combineLatest } from 'rxjs';
import { DataService } from '../../app-common/data-service/data.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../project/project.service';
import { filter } from 'rxjs/operators';
import { DesignerRouter } from '../../../models/api-routes/DesignerRouter';
import { CRUD } from '../../app-common/api-service/api.service';
import { CRUDRouter } from '../../../models/api-routes/CRUDRouter';


@Component({
  selector: 'view-sequence-detail',
  templateUrl: './sequence-detail.component.html',
  styleUrls: ['./sequence-detail.component.scss', '../styles/sequence-design.scss'],
  providers: [SequenceService]
})
export class SequenceDetailViewComponent extends SequenceDetailComponent implements AfterViewInit, OnInit {
  private shouldSaveAsTopSequence: boolean;

  constructor(
    data: DataService,
    fb: FormBuilder,
    sequenceService: SequenceService,
    projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(data, fb, sequenceService, projectService);

    this.callConfigurator = (sequenceId, cause) => {
      switch (cause) {
        case CRUD.CREATE: {
          if (this.shouldSaveAsTopSequence) {
            return {
              route: DesignerRouter.saveTopSequenceOfProject,
              params: { projectId: this.project.id }
            }
          }
          else {
            return {
              route: CRUDRouter.repoSequences
            }
          }
        }
        default: {
          return {
            route: CRUDRouter.entitySequence,
            params: {sequenceId}
          }
        }
      }
    };
  }

  ngOnInit() {
    super.ngOnInit();

    this.route.params.subscribe(({sequenceId}) => {
      if (!unpackEnum(SequenceDetailCRouteReservedParam).includes(sequenceId)) {
        this.dataItemId = sequenceId;
        this.fetch();
      }
      this.shouldSaveAsTopSequence = sequenceId === SequenceDetailCRouteReservedParam.TOP;
    });

    this.itemSetObservable.pipe(filter(loaded => loaded)).subscribe((loaded) => {
        const prefix = this.route.snapshot.params['stepId'] ? '../../' : '../';
        const commands = [prefix, this.dataItemId, this.route.snapshot.params['stepId']];
        this.router.navigate(commands.filter(c => !!c), {relativeTo: this.route})
    });
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
