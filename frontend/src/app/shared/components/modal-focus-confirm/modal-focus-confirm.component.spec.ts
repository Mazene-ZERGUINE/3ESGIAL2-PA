import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFocusConfirmComponent } from './modal-focus-confirm.component';

describe('ModalFocusConfirmComponent', () => {
  let component: ModalFocusConfirmComponent;
  let fixture: ComponentFixture<ModalFocusConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFocusConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFocusConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
