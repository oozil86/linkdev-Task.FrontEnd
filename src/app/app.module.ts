import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { SharedModule } from './Modules/Shared/Shared.module';
import { AppConfig } from './app.config';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { API_BASE_URL } from 'src/shared/service-proxies/service-proxies';
import { AddTokenInterceptor } from '../shared/add-token-interceptor';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    { provide: API_BASE_URL, useFactory: () => AppConfig.settings.baseAPIUrl },
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig],
      multi: true,
    },
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    },
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }, 
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}

