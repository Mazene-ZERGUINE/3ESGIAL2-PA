import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../posts/shared/models/post.interface';
import { Entity } from '../shared/enum/entity.enum';
import { Path } from '../../../shared/enum/path.enum';

@Component({
  selector: 'app-administration-categories-list',
  templateUrl: './administration-categories-list.component.html',
  styleUrls: ['./administration-categories-list.component.scss'],
})
export class AdministrationCategoriesListComponent implements OnInit {
  categories: Categorie[] = [];
  entityName = Entity.categorie;
  page = 1;
  path = Path.categories;

  ngOnInit(): void {
    // TODO
    this.categories = [
      { categorie_id: 1, libelle: 'Administration' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 1, libelle: 'Administration' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 1, libelle: 'Administration' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 1, libelle: 'Administration' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
      { categorie_id: 2, libelle: 'e' },
      { categorie_id: 2, libelle: 'ewqd' },
    ];
  }

  onAdd(): void {
    // TODO
  }

  onEdit(id: number): void {
    // TODO
  }

  onDelete(id: number): void {
    // TODO
  }
}
