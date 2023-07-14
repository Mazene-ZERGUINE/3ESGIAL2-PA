import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationReportedUsersTableComponent } from './administration-reported-users-table.component';

describe('AdministrationReportedUsersTableComponent', () => {
  let component: AdministrationReportedUsersTableComponent;
  let fixture: ComponentFixture<AdministrationReportedUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationReportedUsersTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationReportedUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
