import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsListComponent
  },
  {
    path: ':projectId',
    component: ProjectDetailComponent,
    children: [
      {
        path: 'design',
        loadChildren: 'app/sequence-design/sequence-design.module#SequenceDesignModule',
      },
      {
        path: 'data',
        loadChildren: 'app/data/data.module#DataModule'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
