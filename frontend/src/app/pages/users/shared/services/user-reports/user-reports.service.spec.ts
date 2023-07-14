import { TestBed } from '@angular/core/testing';

import { UserReportsService } from './user-reports.service';

describe('UserReportsService', () => {
  let service: UserReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
