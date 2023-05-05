import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundModule } from '../pages/not-found/not-found.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderModule, FooterModule, NotFoundModule],
  exports: [HeaderComponent, FooterComponent],
})
export class ComponentsModule {}
