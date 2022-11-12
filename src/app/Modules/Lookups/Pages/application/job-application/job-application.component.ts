import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnumToastrStatus } from '../../../../Shared/Enums/EnumToastrStatus';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import {  ApplicationServiceProxy, JobApplicantDto, JobApplicationDto} from '../../../../../../shared/service-proxies/service-proxies';



@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html'
})
export class JobApplicationComponent implements OnInit, OnDestroy {
  DataForm: FormGroup;

  applicant: JobApplicantDto = {
    email: '',
    mobileNumber: '',
    name: ''
  };
  jobid: number;
  EnableSubmit = false;
  @Output('ApplicationInserted') ApplicationInserted = new EventEmitter<{ application: JobApplicationDto }>();
  adddata: Subscription | undefined;
  
  constructor(private _modalService: BsModalService,
    private applicationservice: ApplicationServiceProxy,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {

    var state = this._modalService.config.initialState;
    var content = <any>state;
    this.jobid = <number>content.jobid;

    this.DataForm = new FormGroup({
      'Name': new FormControl(null, [Validators.required]),
      'MobileNumber': new FormControl(null, [Validators.required]),
      'Email': new FormControl(null, [Validators.required])
    });
  }



  ValidateInput(ControlName: string){

    switch (ControlName) {
      case 'Name':
        if (this.DataForm.get(ControlName)?.touched && !this.DataForm.get(ControlName)?.valid) {
          return true;

        }
        break;
      case 'Email':
        if (this.DataForm.get(ControlName)?.touched && !this.DataForm.get(ControlName)?.valid) {
          return true;

        }
        break;
      case 'MobileName':
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
 
      this.EnableSubmit = true;
      var newApplication: JobApplicationDto = {
        applicant: this.applicant,
        jobId: this.jobid
      };

      this.adddata = this.applicationservice.
        applyToJob(newApplication).subscribe
        ((response: any) => {

          this.EnableSubmit = false;
          if (response.result === 0) {
            this.toastrService.success('Job Added Successfully', EnumToastrStatus.SUCCESS);
            this.ApplicationInserted.emit({
              application: newApplication,
            });

          } else {
            this.toastrService.error(response.Data, EnumToastrStatus.ERROR);
          }
        },
          (error: any) => {
            this.EnableSubmit = false;
            this.toastrService.error('Failed in Saving PaymentTerm', EnumToastrStatus.ERROR);
          });
    }
  }
  



}
