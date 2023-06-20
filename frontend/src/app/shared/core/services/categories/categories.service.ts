import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends CrudService {}
