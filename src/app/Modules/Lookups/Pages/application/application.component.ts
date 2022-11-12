import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { EnumToastrStatus } from '../../../Shared/Enums/EnumToastrStatus';
import { AppConfig } from '../../../../app.config';
import {
    JobDto,
    JobServiceProxy,
  PagationFilter,
  PagationFilterColumn,
} from '../../../../../shared/service-proxies/service-proxies';



@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
})
export class ApplicationComponent implements OnInit, OnDestroy {

  rows: any = [];
  getdata: Subscription | undefined;
  loading: boolean = true;
  totalRecords: number;
  currentPage = 1;
  constructor(
    private _modalService: BsModalService,
    private JobService: JobServiceProxy,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.LoadJobs(0);
  }

  PageChange(event:any) {
    this.LoadJobs(event - 1);
  }

  ngOnDestroy(): void {
    if (this.getdata !== null && this.getdata !== undefined) {
      this.getdata.unsubscribe();
    }
  }


  fetchPagation(cb: any, filter: PagationFilter) {

    this.getdata = this.JobService.getPagedJobs(filter).
      subscribe((Response: any) => {
       const res = Response.result;
        if (res === 0) {
          this.loading = false;
          this.totalRecords = Response.data.totalCount;
          const data = Response.data.items;
          cb(data);
        }
        else {
          this.toastrService.error('Error In Loading Data', EnumToastrStatus.ERROR);
        }
      }, (error: any) => {
        this.toastrService.error('Error In Loading Data', EnumToastrStatus.ERROR);
      });


  }

  Apply(Application: any, content: TemplateRef<any>) {
    const datefrom = new Date(Application.validityDurationFrom);
    const dateto = new Date(Application.validityDurationTo);
    const myDate = new Date();
    if (myDate > dateto) { this.toastrService.error('This Job Is Not Valid Now', EnumToastrStatus.ERROR); }
    else if (myDate < datefrom) { this.toastrService.error('This Application For this Job Is not Start', EnumToastrStatus.ERROR); }
    else {
      this._modalService.show(
        content,
        {
          class: 'modal-lg',
          initialState: {
            jobid: Application.id,
          }
        });
    }
  }

  OnApplicationAdded() {

    var filter :PagationFilter ={
      start : 0,
      rows : 3,
      sortOrder : 0,
      columns : [],
      sortField : 'Name'
    };

    this.fetchPagation((data: any) => {
      this.rows = data;
      setTimeout(() => {
      }, AppConfig.settings.LoadingTime);
    }, filter);

  }


  LoadJobs(index :number) {

   this.loading = true;

    var filter: PagationFilter = {
      start: index,
      rows: 3,
      sortField: 'name',
      sortOrder: 0,
      columns: new Array<PagationFilterColumn>()
    };
  
    this.fetchPagation((data: any) => {
      this.rows = data;
      setTimeout(() => {
      }, AppConfig.settings.LoadingTime);
    }, filter);
  }


  close() {
    this._modalService.hide();
  }

}
