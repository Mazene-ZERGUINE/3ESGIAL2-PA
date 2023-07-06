import { TestBed } from '@angular/core/testing';

import { PostFavoritesService } from './post-favorites.service';

describe('PostFavoritesService', () => {
  let service: PostFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
