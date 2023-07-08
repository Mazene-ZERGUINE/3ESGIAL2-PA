import { Status } from '../../../sign-up/shared/enums/status.enum';
import { User } from '../../../../shared/core/models/interfaces/user.interface';

export interface Categorie {
  categorie_id: number;
  libelle: string;
}

export interface CommentDTO {
  publication_id: number;
  utilisateur_id: number;
  commentaire: string;
  utilisateur?: User;
  created_at: Date;
  update_at: null | Date;
}

export interface Comment extends CommentDTO {
  commentaire_id: number;
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
  commentaires: Comment[];
  utilisateur_id: number;
  categorie_id: null | number;
  created_at: Date;
  updated_at: null | Date;
}

export interface Post extends PostDTO {
  publication_id: number;
}
