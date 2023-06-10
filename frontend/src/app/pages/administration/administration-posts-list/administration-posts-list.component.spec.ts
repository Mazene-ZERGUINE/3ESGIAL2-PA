import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPostsListComponent } from './administration-posts-list.component';

describe('AdministrationPostsListComponent', () => {
  let component: AdministrationPostsListComponent;
  let fixture: ComponentFixture<AdministrationPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationPostsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
