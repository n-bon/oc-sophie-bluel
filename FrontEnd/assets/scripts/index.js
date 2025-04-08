
/***************** Import des modules ********************************/
//Programmes spécifiques à la section portfolio
import { afficherTravaux, 
    afficherBoutonsFiltres,
    modifierPortfolioFiltres
 } from './portfolio.js';

/******************** Chargement des ressources **********************/
//Charger et convertir la liste des travaux
const travaux = await fetch("http://localhost:5678/api/works").then(travaux => travaux.json());

//Charger et convertir la liste des catégories
const categories = await fetch("http://localhost:5678/api/categories").then(categories => categories.json());

/********************** Affichage dynamique du portfolio **************************/
//Appeler la fonction d'affichage des travaux avec la liste précédemment créée
afficherTravaux(travaux);

//Appeler la fonction d'affichage dynamique des boutons
afficherBoutonsFiltres(categories);

/********** Modification dynamique du portfolio avec les filtres ********************/

modifierPortfolioFiltres(travaux);

/**************** Gestion de la connexion collaborateur ************************************/

// Récupérer jeton
let jetonSession = window.localStorage.getItem('jetonAuth')

//Comportement de la page selon que l'utilisateur soit caché ou non
if (jetonSession === null) {
    console.log("il n'est pas connecté")
    //Cacher bandeau noir
    let bandeauNoirHeader = document.querySelector(".conteneur-bo-header");
    bandeauNoirHeader.classList.remove("actif");
    //Cacher lien modifier
    let boutonModifierPortfolio = document.querySelector(".bouton-modifier");
    boutonModifierPortfolio.classList.remove("actif");

} else {
    console.log(jetonSession)
    //afficher bandeau noir
    let bandeauNoirHeader = document.querySelector(".conteneur-bo-header");
    bandeauNoirHeader.classList.add("actif");
    //afficher lien modifier
    let boutonModifierPortfolio = document.querySelector(".bouton-modifier")
    boutonModifierPortfolio.classList.add("actif");
    //cacher boutons filtres
    let sectionFiltres = document.querySelector(".filtres")
    sectionFiltres.classList.add("cacherFiltres")
}
