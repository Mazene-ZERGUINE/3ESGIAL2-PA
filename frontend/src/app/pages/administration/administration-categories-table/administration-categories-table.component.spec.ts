import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationCategoriesTableComponent } from './administration-categories-table.component';

describe('AdministrationCategoriesTableComponent', () => {
  let component: AdministrationCategoriesTableComponent;
  let fixture: ComponentFixture<AdministrationCategoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationCategoriesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationCategoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
