import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-report',
  standalone: true,
  templateUrl: './modal-report.component.html',
  imports: [FormsModule],
  styleUrls: ['./modal-report.component.scss'],
})
export class ModalReportComponent {
  description = '';

  constructor(public modal: NgbActiveModal) {}

  onReport(description: string): void {
    if (!description) {
      return;
    }

    this.modal.close(description);
  }
}
