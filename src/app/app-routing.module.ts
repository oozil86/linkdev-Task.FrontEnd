import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './Modules/Shared/Components/layout/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./Modules/Shared/Shared.module').then(m => m.SharedModule)
      },
      {
        path: 'Administrator',
        loadChildren: () => import('./Modules/Lookups/Administrator.module').then(m => m.AdministratorModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
