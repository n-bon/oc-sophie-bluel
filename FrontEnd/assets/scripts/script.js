
/***************** Import des modules ********************************/
//Programmes spécifiques à la section portfolio
import { afficherTravaux } from './portfolio.js';

/******************** Chargement des ressources **********************/
//Charger et convertir la liste des travaux
const travaux = await fetch("http://localhost:5678/api/works").then(travaux => travaux.json());

/********************** Affichage dynamique **************************/
//Appeler la fonction d'affichage des travaux avec la liste précédemment créée
afficherTravaux(travaux);