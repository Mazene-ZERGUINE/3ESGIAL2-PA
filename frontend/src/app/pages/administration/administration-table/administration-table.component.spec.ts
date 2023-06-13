import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationTableComponent } from './administration-table.component';

describe('AdministrationTableComponent', () => {
  let component: AdministrationTableComponent;
  let fixture: ComponentFixture<AdministrationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
