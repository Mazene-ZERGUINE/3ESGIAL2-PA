import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFavoritesListComponent } from './user-favorites-list.component';

describe('UserFavoritesListComponent', () => {
  let component: UserFavoritesListComponent;
  let fixture: ComponentFixture<UserFavoritesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFavoritesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFavoritesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
