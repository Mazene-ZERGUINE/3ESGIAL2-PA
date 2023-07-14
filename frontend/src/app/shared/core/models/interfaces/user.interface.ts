export interface UserDTO {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  pseudonyme: string;
  ville: string;
  departement: number;
  reputation: number;
  role: string;
  statut: string;
}

export interface User extends UserDTO {
  utilisateur_id: number;
}
