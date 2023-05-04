import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './shared/components/components.module';
import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  override parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, AppRoutingModule, ComponentsModule],
  providers: [
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
