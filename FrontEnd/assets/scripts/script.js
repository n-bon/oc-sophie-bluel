
/***************** Import des modules ********************************/
//Programmes spécifiques à la section portfolio
import { afficherTravaux, afficherBoutonsFiltres } from './portfolio.js';

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

//Déselectionner les autres filtres
async function effacerSelectionFiltres (listeBoutons) {
    listeBoutons.forEach((bouton) => {
        if (bouton.className === "filtreActif") {
            bouton.className = "";
        };
    });
}



async function modifierPortfolioFiltres (tousTravaux) {
    /******************Initialisation*********/
    // Selection des objets HTML
    const sectionBoutonsFiltres = document.querySelector(".filtres");
    const boutons = sectionBoutonsFiltres.querySelectorAll("button");

    //Création de la variable utilisée pour le filtrage 
    let listeFiltree = [];

    //Écouter l'événement clic
    boutons.forEach((bouton) => {
        bouton.addEventListener("click", (clic) => {
            //Effacer classe selectionnee sur les autres boutons
            effacerSelectionFiltres(boutons);
            //Ajouter la classe sur le bouton
            bouton.className= "filtreActif";
            //Creation de la nouvelle liste filtrée

            //Appel de la fonction Afficher Travaux avec la nouvelle liste
        });
    });

};

modifierPortfolioFiltres(travaux);