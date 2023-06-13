import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationReportedUsersListComponent } from './administration-reported-users-list.component';

describe('AdministrationReportedUsersListComponent', () => {
  let component: AdministrationReportedUsersListComponent;
  let fixture: ComponentFixture<AdministrationReportedUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationReportedUsersListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationReportedUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
