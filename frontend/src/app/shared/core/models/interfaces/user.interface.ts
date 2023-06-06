export interface UserDTO {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  pseudonyme: string;
  ville: string;
  departement: number;
}

export interface User extends UserDTO {
  id: number;
  status: string;
  role: string;
}
