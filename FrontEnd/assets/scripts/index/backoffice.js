/**
 *   PROGRAMMES SPÉCIFIQUES AU BACKOFFICE
 *   réservé aux utilisateurs connectés
**/

/** Chargement des programmes externes appelés dans ce fichier **/

import { afficherTravaux, 
 } from "./portfolio.js";

/** Affichage du bandeau noir et du bouton **/
export function afficherBackOffice() {
    let jetonSession = window.localStorage.getItem('jetonAuth')

    //Comportement de la page selon que l'utilisateur soit caché ou non
    if (jetonSession === null) {
        //Cacher bandeau noir
        let bandeauNoirHeader = document.querySelector(".conteneur-bo-header");
        bandeauNoirHeader.classList.remove("actif");

        //Cacher lien modifier
        let boutonModifierPortfolio = document.querySelector(".bouton-modifier");
        boutonModifierPortfolio.classList.remove("actif");

    } else {
        //afficher bandeau noir
        let bandeauNoirHeader = document.querySelector(".conteneur-bo-header");
        bandeauNoirHeader.classList.add("actif");

        //afficher lien modifier
        let boutonModifierPortfolio = document.querySelector(".bouton-modifier");
        boutonModifierPortfolio.classList.add("actif");
        
        //cacher boutons filtres
        let sectionFiltres = document.querySelector(".filtres");
        sectionFiltres.classList.add("cacherFiltres");
    };
};

/** Affichage de la page modale **/
//Afficher la page au clic
export function afficherModalePortfolio() {
    //Selection des declencheurs
    const declencheursModale = document.querySelectorAll(".declencheurModale");

    //Selection de la modale
    const asideModale = document.querySelector(".conteneurModale");

    //Affichage de la modale au clic
    declencheursModale.forEach(declencheur => {
        declencheur.addEventListener("click", () => {
            asideModale.classList.toggle("actif");
        });
    });
};

//Naviguer entre les 2 vue de la page modale
export function changerPageModale() {
    //selection des boutons déclencheurs
    const declencheursPageModale = document.querySelectorAll(".declencheurPageModale");
    //selection des pages
    const pagesModales = document.querySelectorAll(".pageModale");

    //comportement au clic
    declencheursPageModale.forEach(declencheur => {
        declencheur.addEventListener("click", () => {
            //Basculer de classe sur chaque page au clic
            pagesModales.forEach(page => {
                page.classList.toggle("pageModaleActive");
            });
        });
    });
};
//Mise à jour des travaux suite aux modifications dans le back office

async function mettreAJourTravaux () {
    //charger la nouvelle liste de travaux depuis l'API
    const travauxAJour = await fetch("http://localhost:5678/api/works").then(travauxAJour => travauxAJour.json());
    //appeler la fonction d'affichage du portfolio
    afficherTravaux(travauxAJour);
    //appeler la fonction d'affichage des travaux à supprimer
    afficherSupprimerProjet(travauxAJour);
    //refaire la boucle d'écoute du clic pour supprimer
    supprimerUnTravail();
}

/** Gestion de la gallerie de suppression des projets **/
//Afficher la collection de projets à supprimer
export async function afficherSupprimerProjet(travaux) {
    const emplacementCartes = document.querySelector(".galeriePhotoModale");
    //nettoyer gallerie avant affichage
    emplacementCartes.innerHTML = ``;

    //boucle de création pour chaque projet

    for (let i = 0; i < travaux.length; i++ ) {
        //creation de l'article
        let carte = document.createElement("article");
        //creation de l'image
        let image = document.createElement("img");
        image.setAttribute("src", `${travaux[i].imageUrl}`);
        image.setAttribute("title", `${travaux[i].title}`);
        //creation du bouton(indiquer l'id du projet)
        let bouton = document.createElement("button");
        bouton.innerHTML=`<i class="fa-solid fa-trash"></i>`;
        bouton.setAttribute("projet-id", `${travaux[i].id}`);
        bouton.classList.add("boutonSupprimerProjet");
        //placer l'image dans l'article
        carte.appendChild(image);
        //placer le bouton dans l'article
        carte.appendChild(bouton);
        //placer l'article dans le conteneur
        emplacementCartes.appendChild(carte);
    };
};

//Envoi de la requête API Delete pour supprimer un projet

async function envoyerSuppressionTravail(projet) {
    //selection du jeton d'authentification
    let token = window.localStorage.getItem("jetonAuth");

    try {
        let reponse = await fetch(`http://localhost:5678/api/works/${projet}`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`}
        });
        console.log(reponse.status);
        if (reponse.ok) {
            console.log("supprimé avec succès");
            //Recharger travaux
            mettreAJourTravaux();
        }
    } catch (error) {
        console.log(error);
        console.log(reponse.status);
    }
}

//Fonctionnalité suppression d'un travail
export async function supprimerUnTravail() {
    //selecionner les boutons à l'interieur de la galerie
    let boutonsSuppTravail = document.querySelectorAll(".boutonSupprimerProjet");
        //boucle pour écouter les clics sur les boutons
        boutonsSuppTravail.forEach(bouton =>{
        //ecouter le clic sur le bouton
        bouton.addEventListener("click", (event) => {
            let idProjetASupprimer = bouton.getAttribute("projet-id");
            parseInt(idProjetASupprimer);
            envoyerSuppressionTravail(idProjetASupprimer);
        });
    });
}

/** Gestion du formulaire d'ajout de projets **/

//Afficher les catégories de façon dynamique dans le formulaire d'ajout de projet
export async function afficherCategoriesAjoutImage (categories) {
    //selectionner le menu déroulant
    const listeCategories = document.querySelector("#categorieAjoutImage");

    // boucle creer et placer les categories
    categories.forEach((categorie) => {
        //creer option
        let option = document.createElement("option");

        //attributs de l'option
        option.setAttribute("value", `${categorie.id}`);
        option.setAttribute("categorie-id", `${categorie.id}`);

        //contenu de l'option
        option.innerText = (`${categorie.name}`);

        //placer option dans le select
        listeCategories.appendChild(option);
    });
};

//Verification de l'image
function verifierImageFormulaireAjout(inputImage) {
    inputImage.addEventListener("change", (event) => {
        const emplacementMessageFichier = document.querySelector(".indicationAjoutImage");
        console.log(emplacementMessageFichier);
        const fichier = event.target.files[0];
        if (!fichier) {
            emplacementMessageFichier.textContent = "veuillez charger une image : format jpg ou png, 4mo max";
            return;
        }
        //Exprimer les règles de validation du fichier 
        const formatsAutorises = ["image/jpeg", "image/png"];
        //convertir mo en bytes
        const tailleMaxAutoriseEnBytes = 4*1024*1024;
        //Verifier le format de l'image
        if (!formatsAutorises.includes(fichier.type)) {
            emplacementMessageFichier.innerText = "format invalide, jpg ou png seulement";
            return;
        }
        if (fichier.size > tailleMaxAutoriseEnBytes) {
            emplacementMessageFichier.innerText = "fichier trop lourd, 4mo maximum";
            return;
        }
        //Si tous les tests validés, indiquer que le fichier est ok
        emplacementMessageFichier.innerText = "le fichier ajouté est valide"
    });
}


// Envoi de la requête API du formulaire  et gestion de la reponse
async function envoyerAjoutTravail(formulaireAjout) {
    formulaireAjout.addEventListener("submit", async function envoiFormulaireAjout(event) {
        //bloquer comportement par défaut
        event.preventDefault();
        //selection des champs du formulaire
        let champImage = document.querySelector("#ajoutImage");
        let champTitre = document.querySelector("#titreAjoutImage");
        let champCategorie = document.querySelector("#categorieAjoutImage");
        //Placer la verification des champs ici
 
        //creation de la charge utile de l'api
        let chargeUtile = new FormData();
        chargeUtile.append('image', champImage.files[0]);
        chargeUtile.append('title', champTitre.value);
        chargeUtile.append('category', parseInt(champCategorie.value));
  
        //récuperer le token
        let token = window.localStorage.getItem("jetonAuth");
        //Sélectionner l'emplacement du message de sortie (output) du formulaire
        let messageSortie = document.querySelector(".messageFormulaireAjout");
        //Appeler la fonction d'envoi du formulaire
        try {
           let reponse = await fetch("http://localhost:5678/api/works", {
              method: "POST",
              headers: {"Authorization": `Bearer ${token}`},
              body: chargeUtile
           });
           console.log(reponse.status);
           if (reponse.ok) {
              //comportement en cas de succès
              //effacer le formulaire
              formulaireAjout.reset();
              //charger la nouvelle liste de travaux depuis l'API
              mettreAJourTravaux();
              messageSortie.innerText = "projet ajouté à la gallerie avec succès"
           } else {
              messageSortie.innerText = "échec de l'envoi, tous les champs doivent être renseignés"
           }
        } catch (error) {
            messageSortie.innerText = "échec de l'envoi, impossible de se connecter au serveur"
        };
     });
}

//Gestion de l'envoi du formulaire d'ajout de projet
export async function ajouterUnTravail() {
    //selection du formulaire pour soumission
    let formulaireAjout = document.querySelector("#formulaireAjout");
    //selection de l'image pour validation du format 
    let inputImage = document.querySelector("#ajoutImage");
    //verification de l'image 
    verifierImageFormulaireAjout(inputImage);
    //comportement à la soumission
    envoyerAjoutTravail(formulaireAjout);
 };