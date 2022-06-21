# Description

## `Contexts`

Deux contextes sont utilisés dans cette application, le premier `SearchContext` qui permet de conserver les données de recherches et `FavoritesContext` qui gère les favoris à travers le stockage local du navigateur en l'absence d'utilisation de base de données pour l'exercice. J'ai fait le choix de passer par l'API Contexte de React pour éviter le prop drilling et le hook `useReducer` est bien plus performant pour la gestion d'état que de simple `useState`.

## `Models`

Le dossier `models` contient les interfaces qui décrivent le jeu de données. Ces dernières sont notamment utilisées pour décrire les données reçues par l'API.

## `Components`

Ce dossier regroupe l'ensemble des composants qui ont pour but d'être le plus générique possible afin de pouvoir les réutiliser au plus à différents endroits du code.

`SideNavigation` permet d'afficher les favoris enrgistrés et l'historique des recherches dans le panneau latéral

## `Views`

Les `views` représentent des sections de pages.

`DataTable` est la table qui affiche l'ensemble des données. La requête pour récupérer le données est effectué à ce niveau en utilisant le hook `useQuery` qui permet de gérer l'état des données et simplifie la gestion de la phase de chargement et d'erreur.

`FilterSection` contient principalement la barre de recherche et le bouton qui permet d'enregistrer les favoris

## `Styles`

Les CSS Modules ont été utilisé pour ajouter du styles. Il y a un fichier `global.css` afin de contenir les règles CSS générales puis chaque composant dispose de son propre fichier `style.module.css` afin de séparer le code pour plus de clarté.

## `API`

Le dossier `api` contient les méthodes qui permettent de construire les requêtes qu'on pourra appeler par la suite avec le hook `useQuery`

## `useFilterData`

`useFilterData` est une fonction qui permet de prendre en entrée le jeu de donnée et les filtres en cours afin de récupérer les données souhaitées
