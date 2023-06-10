import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationUserFormComponent } from './administration-user-form.component';

describe('AdministrationUserFormComponent', () => {
  let component: AdministrationUserFormComponent;
  let fixture: ComponentFixture<AdministrationUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationUserFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
