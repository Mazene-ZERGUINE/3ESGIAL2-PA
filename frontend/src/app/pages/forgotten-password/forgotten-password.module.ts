import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgottenPasswordRoutingModule } from './forgotten-password-routing.module';
import { ForgottenPasswordComponent } from './forgotten-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ForgottenPasswordComponent],
  imports: [CommonModule, ForgottenPasswordRoutingModule, ReactiveFormsModule],
})
export class ForgottenPasswordModule {}
