import { Component, Input } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

import { Image } from '../../../pages/posts/shared/models/post.interface';

@Component({
  // selector: 'app-carousel-basic',
  selector: 'ngbd-carousel-basic',
  standalone: true,
  imports: [NgbCarouselModule, NgIf, NgFor],
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.scss'],
})
export class CarouselBasicComponent {
  @Input() images: Image[] = [];

  constructor(public readonly sanitizer: DomSanitizer) {}
}
