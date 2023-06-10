import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
})
export class BackToTopComponent {
  isButtonVisible = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isButtonVisible = window.scrollY > 600;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
