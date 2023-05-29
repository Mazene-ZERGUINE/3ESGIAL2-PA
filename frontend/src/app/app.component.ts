import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hideHeader = false;
  hideFooter = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscribeToRouterEvents();
  }

  private subscribeToRouterEvents(): void {
    this.router.events
      .pipe(
        filter((event) => {
          return event instanceof NavigationEnd;
        }),
      )
      .subscribe(() => {
        this.hideHeader = this.activatedRoute.firstChild?.snapshot.data?.['hideHeader'] ?? false;
        this.hideFooter = this.activatedRoute.firstChild?.snapshot.data?.['hideFooter'] ?? false;
      });
  }
}
