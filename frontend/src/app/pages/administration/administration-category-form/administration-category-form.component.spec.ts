import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationCategoryFormComponent } from './administration-category-form.component';

describe('AdministrationCategoryFormComponent', () => {
  let component: AdministrationCategoryFormComponent;
  let fixture: ComponentFixture<AdministrationCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationCategoryFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
