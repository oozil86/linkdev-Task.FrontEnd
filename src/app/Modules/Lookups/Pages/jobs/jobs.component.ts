import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EnumTypes } from '../../../Shared/Enums/EnumTypes';
import { ToastrService } from 'ngx-toastr';
import { EnumToastrStatus } from '../../../Shared/Enums/EnumToastrStatus';
import { AppConfig } from '../../../../app.config';
import {
    JobDto,
    JobServiceProxy,
  PagationFilter,
  PagationFilterColumn,
} from '../../../../../shared/service-proxies/service-proxies';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit, OnDestroy {

  rows: any = [];
  getdata: Subscription | undefined;
  loading: boolean = true;
  cols = [
    { Name: 'name', header: 'Name', Type: EnumTypes.String },
    { Name: 'validityDurationFrom', header: 'Valid From', Type: EnumTypes.String },
    { Name: 'validityDurationTo', header: 'Valid To', Type: EnumTypes.String },
    { Name: 'category', header: 'Category', Type: EnumTypes.String },
    { Name: 'maximumApplications', header: 'maximum Applications', Type: EnumTypes.Number },
  ];
  totalRecords: number;

  constructor(
    private _modalService: BsModalService,
    private JobService: JobServiceProxy,
    private toastrService: ToastrService) {


  }

  ngOnInit(): void {

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


  OnJobAdded() {

    var filter :PagationFilter ={
      start : 0,
      rows : AppConfig.settings.PageSize,
      sortOrder : 0,
      columns : [],
      sortField : ''
    };

    this.fetchPagation((data: any) => {
      this.rows = data;
      setTimeout(() => {
      }, AppConfig.settings.LoadingTime);
    }, filter);

  }


  OnJobEdited(data: { entity: any } | undefined, content: TemplateRef<any>) {
    let job = <JobDto>data?.entity;
    this._modalService.show(
      content,
      {
        class: 'modal-lg',
        initialState: {
          job: job,
        }
      });
  }

  OnJobDeleted(data: { entity: any }) {

    Swal.fire({
      title: 'Are you sure you want to delete?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((res1: any) => {
      if (res1.isConfirmed) {
        let job = <JobDto>data.entity;
        this.getdata = this.JobService.deleteJob(job.id).
          subscribe((Response: any) => {
            const res = Response.result;
            if (res === 0) {
              this.loading = false;
              var oldrows = <JobDto[]>this.rows;
              var index = oldrows.findIndex(c => c.id == job.id);
              oldrows.splice(index, 1);
              this.toastrService.success('Job Deleted Successfully', EnumToastrStatus.SUCCESS);
            }
            else {
              this.toastrService.error(Response.Data, EnumToastrStatus.ERROR);
            }
          }, (error: any) => {
            this.toastrService.error('Failed in Deleting Job', EnumToastrStatus.ERROR);
          });
      }
    })
  }

  OnJobLoaded(data: any) {

    var pagefilter: PagationFilterColumn;
    this.loading = true;
    var filter: PagationFilter = {
      start: data.first,
      rows: data.rows,
      sortField: data?.sortField,
      sortOrder: data.sortOrder,
      columns: new Array<PagationFilterColumn>()
    };

    if (data?.filters?.name) {
      for (var i = 0; i < data?.filters?.name.length; i++) {
        pagefilter = {
          value: data?.filters?.name[i].value,
          matchMode: data?.filters?.name[i].matchMode,
          name: "Name"
        }
        filter.columns?.push(pagefilter);

      }
    }
   
    if (filter?.sortField === null || filter?.sortField === undefined) { filter.sortField = ''; }
  
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
