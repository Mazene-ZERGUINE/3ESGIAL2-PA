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
  statut: string; // TODO
  images: Image[];
}

export interface Post extends PostDTO {
  publication_id: number;
}
