# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Détail de mon approche

### Barre de recherche

La barre de recherche permet de filtrer des tournages grâce à une requête en texte intégral qui vient en addition des filtres sélectionnés.
Une requête est effectuée après que l'utilisateur est arrêté d'écrire depuis 500ms. Pour cela, j'utilise un hook custom appelé useDebounce

### Les filtres

Je construis les options de l'input de sélection multiple via un premier appel à l'API.
Il est possible de rechercher des filtres spécifiques grâce au component Autocomplete de Material-UI

### Les résultats

Les résultats sont affichés sous forme de carte rectangulaire avec les informations pertinentes de chaque tournage. Un chargement circulaire apparaît à la fin des résultats lorsque la requête à l'API est en cours.

### Pagination

La pagination est très simple, elle consiste simplement en un bouton à la fin des résultats qui permet de charger 10 résultats de plus.
pour cela, j'utilise le paramètre "start" et "rows" de l'API.
Le bouton apparaît seulement si le nombre de résultat affiché est inférieur au résultat total.

### L'interface

L'interface est responsive et assez simpliste.
Chaque information est affichée afin qu'elle soit accessible de manière intuitive et rapide.
J'utilise principalement l'outil de css in js de Material-UI pour l'interface et du style dans une moindre mesure.

### L'architecture

L'architecture est très plate, il me semble inutile de complexifier l'architecture avec des sous-dossiers compte tenu
de la taille du projet. De plus, définir l'architecture d'une application sans savoir les évolutions à venir de celle-ci semble un peu prématuré.

- App.js
  - Search.jsx
    - Searchbar.jsx
    - Results.jsx
      - CardResult.jsx

### Le +

Un icône d'une carte cliquable à la fin de chaque carte rectangulaire, il permet d'ouvrir le lieu exact du tournage sur Google Maps.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
