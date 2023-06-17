# categorie

```
sequelize-cli model:generate --name categorie --attributes
```

# commentaire

```
sequelize-cli model:generate --name commentaire --attributes
```

# image

```
sequelize-cli model:generate --name image --attributes
```

# messagerie

```
sequelize-cli model:generate --name messagerie --attributes
```

# personne_signalement

```
sequelize-cli model:generate --name personne_signalement --attributes
```

# publication

```
sequelize-cli model:generate --name publication --attributes
```

# publication_signalement

```
sequelize-cli model:generate --name publication_signalement --attributes
```

# session

```
sequelize-cli model:generate --name session --attributes session_id:integer,token:text,utilisateur_id:integer
```

# utilisateur

```
sequelize-cli model:generate --name utilisateur --attributes utilisateur_id:integer,email:string,mot_de_passe:string,pseudonyme:string,nom:string,prenom:string,departement:string,ville:string,role:enum:'{administrateur, utilisateur}',statut:enum:'{actif, banni, inactif}'
```
