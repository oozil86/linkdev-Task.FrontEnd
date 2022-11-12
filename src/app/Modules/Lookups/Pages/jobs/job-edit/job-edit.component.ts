import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnumToastrStatus } from '../../../../Shared/Enums/EnumToastrStatus';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { JobCreateDto, JobDto, JobServiceProxy } from '../../../../../../shared/service-proxies/service-proxies';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html'
})
export class JobEditComponent implements OnInit, OnDestroy {
  DataForm: FormGroup;
  validityDurationFrom_selectedDate: NgbDateStruct = {
    day: 0,
    month: 0,
    year: 0
  };
  validityDurationTo_selectedDate: NgbDateStruct = {
    day: 0,
    month: 0,
    year: 0
  };
  jobcreated: JobCreateDto = {
    name: '',
    category: '',
    description: '',
    maximumApplications: 0,
    responsibilities: '',
    skills: '',
    validityDurationFrom: undefined,
    validityDurationTo:undefined
  };
  job: JobDto = {
    id:0,
    name: '',
    category: '',
    description: '',
    maximumApplications: 0,
    responsibilities: '',
    skills: '',
    validityDurationFrom: undefined,
    validityDurationTo: undefined
  };;

  EnableSubmit = false;
  @Output('JobInserted') JobInserted = new EventEmitter<{ job: JobDto }>();
  adddata: Subscription | undefined;
  
  constructor(private _modalService: BsModalService,
    private jobservice: JobServiceProxy,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    var state = this._modalService.config.initialState;
    var content = <any>state;
    var job = <JobDto>content.job;

    if (job !== undefined || job !== undefined) {
      var Fromdates = job.validityDurationFrom?.split('/');
      var Todates = job.validityDurationTo?.split('/');
      if (Fromdates !== undefined) {
        this.validityDurationFrom_selectedDate.day = Number(Fromdates[0]);
        this.validityDurationFrom_selectedDate.month = Number(Fromdates[1]);
        this.validityDurationFrom_selectedDate.year = Number(Fromdates[2]);
      }
      if (Todates !== undefined) {
        this.validityDurationTo_selectedDate.day = Number(Todates[0]);
        this.validityDurationTo_selectedDate.month = Number(Todates[1]);
        this.validityDurationTo_selectedDate.year = Number(Todates[2]);
      }
    }

    if (job !== null && job !== undefined) {
      this.job = job;
    }


    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'Category': new FormControl(null, [Validators.required]),
      'Description': new FormControl(null, [Validators.required]),
      'MaximumApplications': new FormControl(null),
      'Responsibilities': new FormControl(null, [Validators.required]),
      'Skills': new FormControl(null, [Validators.required]),
      'ValidityDurationFrom': new FormControl(null),
      'ValidityDurationTo': new FormControl(null),
    });
  }



  ValidateInput(ControlName: string){

    switch (ControlName) {
      case 'Name':
        if (this.DataForm.get(ControlName)?.touched && !this.DataForm.get(ControlName)?.valid) {
          return true;

        }
        break;
      case 'Description':
        if (this.DataForm.get(ControlName)?.touched && !this.DataForm.get(ControlName)?.valid) {
          return true;

        }
        break;
      case 'Category':
        if (this.DataForm.get(ControlName)?.touched && !this.DataForm.get(ControlName)?.valid) {
          return true;

        }
        break;
      case 'Responsibilities':
        if (this.DataForm.get(ControlName)?.touched && !this.DataForm.get(ControlName)?.valid) {
          return true;

        }
        break;
      case 'Skills':
        if (this.DataForm.get(ControlName)?.touched && !this.DataForm.get(ControlName)?.valid) {
          return true;

        }
        break;
      case 'ValidityDurationFrom':
        if (this.DataForm.get(ControlName)?.touched && !this.DataForm.get(ControlName)?.valid) {
          return true;

        }
        break;
      case 'ValidityDurationTo':
        if (this.DataForm.get(ControlName)?.touched && !this.DataForm.get(ControlName)?.valid) {
          return true;

        }
        break;
        
    }
    return false;
  }


  ngOnDestroy(): void {
    if (this.adddata !== null && this.adddata !== undefined) {
      this.adddata.unsubscribe();
    }
   
  }


  SubmitData() {
    this.DataForm.markAllAsTouched();
   
    if (this.DataForm.valid) {
      this.job.validityDurationFrom = this.validityDurationFrom_selectedDate.year.toString() + "/"
        + this.validityDurationFrom_selectedDate.month.toString() + "/" +
        this.validityDurationFrom_selectedDate.day.toString();
      this.job.validityDurationTo = this.validityDurationTo_selectedDate.year.toString() + "/"
        + this.validityDurationTo_selectedDate.month.toString() + "/" +
        this.validityDurationTo_selectedDate.day.toString();

      this.EnableSubmit = true;

      if (this.job.id === 0) {
        this.jobcreated.category = this.job.category;
        this.jobcreated.description = this.job.description;
        this.jobcreated.maximumApplications = this.job.maximumApplications;
        this.jobcreated.name = this.job.name;
        this.jobcreated.responsibilities = this.job.responsibilities;
        this.jobcreated.skills = this.job.skills;
        this.jobcreated.validityDurationFrom = this.job.validityDurationFrom;
        this.jobcreated.validityDurationTo = this.job.validityDurationTo;
        this.adddata = this.jobservice.
          insertNewJob(this.jobcreated).subscribe
        ((response: any) => {

          this.EnableSubmit = false;
          if (response.result === 0) {
            this.toastrService.success('Job Added Successfully', EnumToastrStatus.SUCCESS);
            this.JobInserted.emit({
              job: this.job,
            });

          } else {
            this.toastrService.error(response.Data, EnumToastrStatus.ERROR);
          }
        },
          (error: any) => {
            this.EnableSubmit = false;
            this.toastrService.error('Failed in Saving Job', EnumToastrStatus.ERROR);
          });
      }
      else {

        this.adddata = this.jobservice.
          upateJob(this.job).subscribe
          ((response: any) => {

            this.EnableSubmit = false;
            if (response.result === 0) {
              this.toastrService.success('Job Updated Successfully', EnumToastrStatus.SUCCESS);
              this.JobInserted.emit();

            } else {
              this.toastrService.error(response.Data, EnumToastrStatus.ERROR);
            }
          },
            (error: any) => {
              this.EnableSubmit = false;
              this.toastrService.error('Failed in Updating Job', EnumToastrStatus.ERROR);
            });

      }
    }
  }
}
