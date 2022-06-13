# Notes

Front React, bootstrap Create React App

Visualisation des données liées aux lieux de tournages de la ville de Paris.

Application single page, composée d'un formulaire de recherche et d'un tableau présentant les données.

`npm start` pour démarrer (http://localhost:3000)

`npm test` pour tester

### API

3 choses à retenir de l'API :

- le dataset représente plus de 10 700 records
- les requêtes retournent les champs filtrables ainsi que la liste de valeur associée
- le paramètre 'start' de la requête permet la pagination par offset

### Tableau de données

##### (scroll infini, memoization)

La liste des champs est configurable via le fichier config.json.

Les lignes de données sont memoizées avec `React.memo` pour plus de fluidité au rerender.

Lorsque l'utilisateur scrolle jusqu'au dernier élément récupéré (en bas du tableau), une nouvelle requête est lancée avec le paramètre d'offset.

Les nouveaux résultats sont ajoutés à la suite du tableau.

Ce scroll infini est géré dans un custom hook dédié `useInfiniteScroll()` en utilisant la référence (`useRef()`) de l'élément concerné (container du tableau).

Le nombre de donnée déjà récupérée ainsi qu'une barre de progression permettent de suivre le comportement du scroll infini.

Un loader en bas du tableau apparait lorsque la requête prend du temps.

**_Note : Pour un rendu fluide, pensez à fermer la fenêtre devtools. l'extension react peut être gourmande en ressource et ralentir les rerenders._**

### Barre de recherche

##### (Autocomplete, filtre configurable)

Il s'agit d'un composant Material UI <Autocomplete/> qui propose un champs de saisie associé à une liste d'options.

La liste des filtres est également configurable via le fichier config.json en ajoutant `filterable: true` au champs concerné.

Les options sont récupérées avec la première requête API. Une fois sélectionnées, elles apparaissent sous la forme de label (supprimable) dans le champs.

L'ajout d'un nouveau filtre déclenche immédiatement un nouvel appel API.

##### A des fins d'expérimentation, j'ai également créé un formulaire à champs multiples.

Cette fonctionalité est cachée. Elle est activable en retirant le `diplay:none` du bouton switch (`.FilterBar__toggle`) au sein du composant <FilterBar />. 

Le passage d'un mode d'affichage à l'autre réinitialise les filtres et rerender le taleau également.

### Tests

Les fonctions API sont testées, et l'ensemble des composants également (via snapshots avec react-testing-library).

A ce stade il manque encore les TU sur les hooks.

### Structure de projet

`/api`
Contient le fichier qui regroupe les fonctions dédiées à la manipulation de l'API
`/components/organisms`,`/components/molecules`,`/components/atoms`
Contient les composants présentationnels
`/components/templates`
Contient les composants emabarquant la logique, les communications avec l'API par exemple
`/components/hooks`
Contient les hooks customs
`/components/mocks`
Contient les mocks dédiés au tests
