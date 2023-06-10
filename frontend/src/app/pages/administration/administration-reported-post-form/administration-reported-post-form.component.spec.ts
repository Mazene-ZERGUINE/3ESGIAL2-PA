import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationReportedPostFormComponent } from './administration-reported-post-form.component';

describe('AdministrationReportedPostFormComponent', () => {
  let component: AdministrationReportedPostFormComponent;
  let fixture: ComponentFixture<AdministrationReportedPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationReportedPostFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationReportedPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
