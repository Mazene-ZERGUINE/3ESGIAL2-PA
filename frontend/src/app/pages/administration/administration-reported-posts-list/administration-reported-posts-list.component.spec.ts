import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationReportedPostsListComponent } from './administration-reported-posts-list.component';

describe('AdministrationReportedPostsListComponent', () => {
  let component: AdministrationReportedPostsListComponent;
  let fixture: ComponentFixture<AdministrationReportedPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationReportedPostsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationReportedPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
