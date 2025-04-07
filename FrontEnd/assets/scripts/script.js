
/***************** Import des modules ********************************/
//Programmes spécifiques à la section portfolio
import { afficherTravaux, afficherBoutonsFiltres } from './portfolio.js';

/******************** Chargement des ressources **********************/
//Charger et convertir la liste des travaux
const travaux = await fetch("http://localhost:5678/api/works").then(travaux => travaux.json());

//Charger et convertir la liste des catégories
const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

/********************** Affichage dynamique **************************/
//Appeler la fonction d'affichage des travaux avec la liste précédemment créée
afficherTravaux(travaux);

//Appeler la fonction d'affichage dynamique des boutons
afficherBoutonsFiltres(categories);
