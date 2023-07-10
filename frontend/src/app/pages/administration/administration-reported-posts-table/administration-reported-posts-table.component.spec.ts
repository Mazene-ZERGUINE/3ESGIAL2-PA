import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationReportedPostsTableComponent } from './administration-reported-posts-table.component';

describe('AdministrationReportedPostsTableComponent', () => {
  let component: AdministrationReportedPostsTableComponent;
  let fixture: ComponentFixture<AdministrationReportedPostsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationReportedPostsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationReportedPostsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
