import { TestBed } from '@angular/core/testing';

import { AdministrationPostsService } from './administration-posts.service';

describe('AdministrationPostsService', () => {
  let service: AdministrationPostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationPostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
