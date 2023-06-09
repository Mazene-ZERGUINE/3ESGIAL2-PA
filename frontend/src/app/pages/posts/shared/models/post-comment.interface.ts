export interface PostComment {
  utilisateur_id: number;
  publication_id: number;
  commentaire: string;
  created_at: Date;
}
