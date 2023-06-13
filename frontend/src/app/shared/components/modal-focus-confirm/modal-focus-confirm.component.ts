import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-focus-confirm',
  standalone: true,
  templateUrl: './modal-focus-confirm.component.html',
  styleUrls: ['./modal-focus-confirm.component.scss'],
})
export class ModalFocusConfirmComponent {
  constructor(public modal: NgbActiveModal) {}
}
