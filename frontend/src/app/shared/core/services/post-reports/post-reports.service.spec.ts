import { TestBed } from '@angular/core/testing';

import { PostReportsService } from './post-reports.service';

describe('PostReportsService', () => {
  let service: PostReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
