# Projet TypingMasters

## Description du projet

TypingMasters est une application conçue pour améliorer la vitesse de frappe au clavier. Elle propose des textes générés aléatoirement sur lesquels l'utilisateur effectue un test de saisie. Pendant ce test, la vitesse de frappe (en mots par minute) ainsi que la précision (en %) sont calculées et affichées.

## Fonctionnalités principales

- **Navigation fluide** entre les différentes pages grâce à `react-router-dom` :
  - Une **page d'accueil** intégrant une animation 3D réalisée avec `react-fiber`.
  - Une **page de test** où les textes sont générés de manière aléatoire. L'utilisateur peut choisir la durée du test.
  - Une **page d'historique** permettant de consulter ses résultats précédents.
  
- **Support multilingue** avec le package `i18n` pour basculer entre le français et l'anglais.

- **Gestion des données utilisateur** via un contexte React qui sauvegarde dans le localStorage :
  - Le temps de saisie,
  - La vitesse de frappe,
  - Le nombre d’erreurs,
  - Le nombre de mots par minute.

- **Utilisation d'un hook personnalisé** pour gérer le timer du test.

## Technologies utilisées

- React
- react-router-dom
- react-i18next (i18n)
- react-fiber (pour animations 3D)

## Améliorations et remarques

- Utilisation du style CSS `word-wrap` pour garantir l'affichage complet des derniers mots.
- Proposition d’ajouter un mode clair/sombre pour une meilleure ergonomie.
- Fonctionnalité future : possibilité pour l'utilisateur de créer un compte et de s'enregistrer.

---

TypingMasters est un projet évolutif, visant à rendre l'apprentissage de la dactylographie à la fois ludique et performant, grâce à une interface intuitive et des fonctionnalités personnalisables.



## Le lien vercel du deployement 
https://typing-project-u9i5.vercel.app/