import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentsListComponent } from './post-comments-list.component';

describe('PostCommentsListComponent', () => {
  let component: PostCommentsListComponent;
  let fixture: ComponentFixture<PostCommentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCommentsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostCommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
