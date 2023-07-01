import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPostsTableComponent } from './administration-posts-table.component';

describe('AdministrationPostsTableComponent', () => {
  let component: AdministrationPostsTableComponent;
  let fixture: ComponentFixture<AdministrationPostsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdministrationPostsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrationPostsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
