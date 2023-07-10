import { PostReportStatus } from '../../enums/PostReportStatus.enum';

export interface PostReportDTO {
  publication_id: number;
  utilisateur_id: number;
  statut: PostReportStatus;
  description: string;
}

export interface PostReport extends PostReportDTO {
  publication_signalement_id: number;
}
