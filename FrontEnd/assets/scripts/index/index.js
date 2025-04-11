/**
 *  FICHIER PRINCIPAL DE SCRIPTS DE LA PAGE D'ACCUEIL 
 *  contient les variables globales et appelle les différents modules
**/

/* Importer les modules présents dans d'autres fichiers */
//Programmes spécifiques à la section portfolio
import { afficherTravaux, 
    afficherBoutonsFiltres,
    modifierPortfolioFiltres
 } from "./portfolio.js";

 //Programmes spécifiques à l'affichage des fonctionnalités du backoffice
 import {afficherBackOffice,
    afficherModalePortfolio,
    changerPageModale,
    afficherSupprimerProjet,
    afficherCategoriesAjoutImage,
    ajouterUnTravail
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

/* Affichage de la modale */
//Creation de la structure de la modale
afficherModalePortfolio();

//Basculer d'une vue à l'autre de la page de modale
changerPageModale();

//Affichage dynamique de la fonctionnalité Supprimer un travail
afficherSupprimerProjet(travaux);

//Affichage dynamique des catégories dans la rubrique ajouter image du BO
afficherCategoriesAjoutImage(categories);

//Gestion du formulaire d'ajout de projet du BO
ajouterUnTravail();

//Gestion de la galerie de suppression des travaux du BO
//selecionner les boutons à l'interieur de la galerie
let boutonsSuppTravail = document.querySelectorAll(".boutonSupprimerProjet");
//boucle pour écouter les clics sur les boutons
boutonsSuppTravail.forEach(bouton =>{
   //ecouter le clic sur le bouton
   bouton.addEventListener("click", (event) => {
      let idProjetASupprimer = bouton.getAttribute("projet-id");
      console.log(idProjetASupprimer);
   });
});