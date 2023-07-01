import { TestBed } from '@angular/core/testing';

import { AdministrationUsersService } from './administration-users.service';

describe('AdministrationUsersService', () => {
  let service: AdministrationUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
