import { TestBed } from '@angular/core/testing';

import { UserReputationsService } from './user-reputations.service';

describe('UserReputationsService', () => {
  let service: UserReputationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserReputationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
