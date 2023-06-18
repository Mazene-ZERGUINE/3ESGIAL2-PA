export interface UserDTO {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
  pseudonyme: string;
  ville: string;
  departement: number;
  statut: string;
  role: string;
}

export interface User extends UserDTO {
  id: number;
}
