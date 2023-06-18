import { Injectable } from '@angular/core';
import { CrudService } from '../../../shared/core/services/crud/crud.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService extends CrudService {}
