import { TestBed } from '@angular/core/testing';

import { AdministrationCategoriesService } from './administration-categories.service';

describe('AdministrationCategoriesService', () => {
  let service: AdministrationCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
