import { UserReportStatus } from './UserReportStatus.enum';

export interface UserReportDTO {
  signaleur_id: number;
  signale_id: number;
  description: string;
  statut: UserReportStatus;
  created_at: Date;
  updated_at: null | Date;
}

export interface UserReport extends UserReportDTO {
  utilisateur_signalement_id: number;
}
