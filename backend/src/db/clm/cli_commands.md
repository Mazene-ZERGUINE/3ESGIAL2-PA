# Modeles

## categorie

```
sequelize-cli model:generate --name categorie --attributes categorie_id:integer,libelle:string
```

## commentaire

```
sequelize-cli model:generate --name commentaire --attributes publication_id:integer,utilisateur_id:integer,commentaire:text
```

## publication_favori

```
sequelize-cli model:generate --name publication_favori --attributes publication_id:integer,utilisateur_id:integer
```

## image

```
sequelize-cli model:generate --name image --attributes image_id:integer,libelle:string,lien:string,publication_id:number
```

## messagerie

```
sequelize-cli model:generate --name messagerie --attributes
```

## personne_signalement

```
sequelize-cli model:generate --name personne_signalement --attributes
```

## publication

```
sequelize-cli model:generate --name publication --attributes publication_id:integer,titre:string,description:text,statut:enum:'{actif,inactif}',utilisateur_id:integer,categorie_id:integer
```

## publication-appreciation

```
sequelize-cli model:generate --name publication-appreciation --attributes publication_id:integer,utilisateur_id:integer
```

## publication_signalement

```
sequelize-cli model:generate --name publication_signalement --attributes
```

## reputation

```
sequelize-cli model:generate --name reputation --attributes evaluateur_id:integer,evalue_id:integer,note:integer
```

## session

```
sequelize-cli model:generate --name session --attributes session_id:integer,token:text,utilisateur_id:integer
```

## utilisateur

```
sequelize-cli model:generate --name utilisateur --attributes utilisateur_id:integer,email:string,mot_de_passe:string,pseudonyme:string,nom:string,prenom:string,departement:string,ville:string,role:enum:'{administrateur, utilisateur}',statut:enum:'{actif, banni, inactif}'
```

# Seed

## categorie

```
sequelize-cli seed:generate --name categorie
```
