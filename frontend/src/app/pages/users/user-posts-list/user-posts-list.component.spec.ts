import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsListComponent } from './user-posts-list.component';

describe('UserPostsListComponent', () => {
  let component: UserPostsListComponent;
  let fixture: ComponentFixture<UserPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPostsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
