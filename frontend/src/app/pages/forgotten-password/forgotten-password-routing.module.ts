import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForgottenPasswordComponent } from './forgotten-password.component';

const routes: Routes = [
  {
    path: '',
    component: ForgottenPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgottenPasswordRoutingModule {}
