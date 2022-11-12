import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from './Pages/application/application.component';
import { JobsComponent } from './Pages/jobs/jobs.component';


const routes: Routes = [
  {
    path: 'Jobs',
    component: JobsComponent,
  },
  {
    path: 'Application',
    component: ApplicationComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
