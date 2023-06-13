import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationReportedUserFormComponent } from './administration-reported-user-form.component';

describe('AdministrationReportedUserFormComponent', () => {
  let component: AdministrationReportedUserFormComponent;
  let fixture: ComponentFixture<AdministrationReportedUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationReportedUserFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationReportedUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
