/** Import des modules **/
//Programmes spécifiques à la section portfolio
import { afficherTravaux, 
    afficherBoutonsFiltres,
    modifierPortfolioFiltres
 } from "./portfolio.js";

 //Programmes spécifiques à l'affichage des fonctionnalités du backoffice
 import {afficherBackOffice,
    afficherModalePortfolio,
    changerPageModale
 } from "./backoffice.js"

/** Chargement des ressources **/
//Charger et convertir la liste des travaux
const travaux = await fetch("http://localhost:5678/api/works").then(travaux => travaux.json());

//Charger et convertir la liste des catégories
const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

/** Affichage dynamique du portfolio **/
//Affichage des travaux avec la liste précédemment créée
afficherTravaux(travaux);

//Affichage dynamique des boutons
afficherBoutonsFiltres(categories);

/** Modification dynamique du portfolio avec les filtres **/
modifierPortfolioFiltres(travaux);

/** Affichage des fonctionnalités collaborateur **/
afficherBackOffice();

/** Affichage de la modale **/
//Creation de la structure de la modale
afficherModalePortfolio();

//Basculer d'une vue à l'autre de la page de modale
changerPageModale();