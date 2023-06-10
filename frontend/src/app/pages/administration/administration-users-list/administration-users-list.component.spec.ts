import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationUsersListComponent } from './administration-users-list.component';

describe('AdministrationUsersListComponent', () => {
  let component: AdministrationUsersListComponent;
  let fixture: ComponentFixture<AdministrationUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationUsersListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
