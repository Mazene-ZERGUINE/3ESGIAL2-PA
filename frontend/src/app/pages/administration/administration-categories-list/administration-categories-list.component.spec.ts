import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationCategoriesListComponent } from './administration-categories-list.component';

describe('AdministrationCategoriesListComponent', () => {
  let component: AdministrationCategoriesListComponent;
  let fixture: ComponentFixture<AdministrationCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationCategoriesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
