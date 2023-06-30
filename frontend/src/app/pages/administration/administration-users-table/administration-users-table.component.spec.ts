import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationUsersTableComponent } from './administration-users-table.component';

describe('AdministrationUsersTableComponent', () => {
  let component: AdministrationUsersTableComponent;
  let fixture: ComponentFixture<AdministrationUsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationUsersTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationUsersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
