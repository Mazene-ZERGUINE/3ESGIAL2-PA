import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPostFormComponent } from './administration-post-form.component';

describe('AdministrationPostFormComponent', () => {
  let component: AdministrationPostFormComponent;
  let fixture: ComponentFixture<AdministrationPostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationPostFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationPostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
