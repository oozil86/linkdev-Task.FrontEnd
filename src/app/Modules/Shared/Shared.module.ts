import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Directive, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseComponent } from './Components/layout/base/base.component';
import { FooterComponent } from './Components/layout/footer/footer.component';
import { NavbarComponent } from './Components/layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Pages/home/home.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { SharedRoutingModule } from './Shared-routing.module';
import { FeatherIconDirective } from './Directives/feather-icon.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SidebarComponent } from './Components/layout/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import {TableModule} from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    
    BaseComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    ErrorPageComponent,


    // Directives
    FeatherIconDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule,
    PerfectScrollbarModule,
    TableModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [],
  exports :[
    FeatherIconDirective,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule {
 
}
