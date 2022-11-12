import { CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgbDropdownModule, NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/Shared.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableModule } from 'primeng/table';
import { AkilaStandardDataTableComponent } from '../Shared/Components/akila-standard-data-table/akila-standard-data-table.component';
import { ApplicationServiceProxy, JobServiceProxy } from '../../../shared/service-proxies/service-proxies';
import { AdministratorRoutingModule } from './Administrator-routing.module';
import { JobsComponent } from './Pages/jobs/jobs.component';
import { JobEditComponent } from './Pages/jobs/job-edit/job-edit.component';
import { ApplicationComponent } from './Pages/application/application.component';
import { JobApplicationComponent } from './Pages/application/job-application/job-application.component';


@NgModule({
  declarations: [
    JobsComponent,
    JobEditComponent,
    ApplicationComponent,
    JobApplicationComponent,
    AkilaStandardDataTableComponent,
  ],
  imports: [
    AdministratorRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    PerfectScrollbarModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    NgbModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ToastrService,
    JobServiceProxy,
    ApplicationServiceProxy,
    BsModalService
  ],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdministratorModule {
}
