# Smart Search React/MUI - IFRAH

Le projet est une page web qui permet la récupération de la liste des tournage (10000 rows) et la recherche via un autocomplete de MUI

## Composants utilisés

### `Autocomplete MUI`

Le composant propose une liste d'options pour filtrer groupé (type_tournage, annee_tournage, ardt_lieu)
Le choix d'une option entraine la suppression de cette option de la liste et déclenche le filtre
La fermeture de toutes les options reset le filtre et toutes les données sont affichés

### `DataGrid MUI`

Le composant permet d'afficher toute la liste des tournages par pagination de 50 rows par page
Il affiche le total des résultats après le filtre ou après reset

### `Axios`

Utilisé pour récupérer toute la liste des tournages au chargement de la page (le chargement est rapide)

## `Les fonctions utiles`

###`fetchData.js`

Cette fonction retourne une promesse qui fetch la liste des tournages en utilisant axios

### `filterRecords.js`

Cette fonction prends toute la liste des tournages et la liste des filtres utilisateurs et retourne la liste filtrée

### `getOptionsByGroup.js`

Cette fonction retourne la liste des options groupé par domain

## `Le scénario utilisateur`

1. L'utilisateur choisis 1 ou N mots dans la liste des options du search field
2. La recherche accepte toutes les combinaisons possibles
3. Le filtre se déclenche automatiquement (Onchange)
4. Le resultat du filtre est mis à jours de manière rapide et fluide dans le DataGrid
