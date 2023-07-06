import { Post } from '../../../posts/shared/models/post.interface';

export interface Favorite {
  publication_id: number;
  utilisateur_id: number;
  publication: Post;
  created_at: Date;
  updated_at: null | Date;
}
