import { Status } from '../../../sign-up/shared/enums/status.enum';

export interface Categorie {
  categorie_id: number;
  libelle: string;
}

export interface Image {
  image_id: number;
  libelle: string;
  lien: string;
  publication_id: number;
}

export interface PostDTO {
  titre: string;
  description: string;
  statut: Status;
  images: Image[];
}

export interface Post extends PostDTO {
  publication_id: number;
}
