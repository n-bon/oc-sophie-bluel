/**
 *   PROGRAMMES SPÉCIFIQUES AU BACKOFFICE
 *   réservé aux utilisateurs connectés
**/

/** Chargement des programmes externes appelés dans ce fichier **/

import { afficherTravaux, 
 } from "./portfolio.js";

/** Affichage du bandeau noir, du bouton et de log out **/
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

        // gestion de la deconnexion
        //selectionner l'item login et le changer en lien logout
        let itemLogin = document.querySelector("#lienConnexion");
        itemLogin.innerHTML = `<a href="#" title="Se déconnecter">logout</a>`;
        //ecouter le clic sur logout
        itemLogin.addEventListener("click", () => {
            //supprimer le jeton d'authentification
            window.localStorage.removeItem('jetonAuth');
            //recharger la page d'accueil pour enlever les fonctionnalités backoffice
            window.location = "./index.html";
        });
    };
};

/** Effacer le formulaire d'ajout de projet **/
//fonction appelée : après ajout d'un travail, quitte la P2 de la modale, ferme la modale

function reinitialiserFormulaireAjoutTravail() {
    //selection du formulaire et du message de sortie
    const formulaire = document.querySelector("#formulaireAjout");
    let messageSortie = document.querySelector(".messageFormulaireAjout");
    //reset du formulaire
    formulaire.reset();
    //reset du bloc ajout image
    const emplacementIndicationImage = document.querySelector(".indicationAjoutImage");
    emplacementIndicationImage.innerText = "jpg, png : 4mo max";
    const blocApercu = document.querySelector(".previsualiserImage");
    blocApercu.classList.remove("afficherApercuImage");
    //vider le message output du formulaire
    messageSortie.innerHTML=``;
    //desactiver le bouton
    let btnValiderFormulaire = document.querySelector(".btnValiderAjoutPhoto");
    btnValiderFormulaire.disabled = true;
}

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
            //enlever l'affichage de la modale
            asideModale.classList.toggle("actif");
            //enlever l'affichage de la page 2, pour que s'affiche la page 1 à la réouverture
            const pageModale2 = document.querySelector(".pageModale2");
            pageModale2.classList.remove("pageModale2Active");
            //reinitialiser le formulaire d'ajout
            reinitialiserFormulaireAjoutTravail();
        });
    });
};

//Naviguer entre les 2 vue de la page modale
export function changerPageModale() {
    //selection des boutons déclencheurs
    const declencheursPageModale = document.querySelectorAll(".declencheurPageModale");
    //selection des pages
    const pageModale2 = document.querySelector(".pageModale2");
    console.log(pageModale2);
    //comportement au clic
    declencheursPageModale.forEach(declencheur => {
        declencheur.addEventListener("click", () => {
            //Basculer de classe la page 2 au clic
            pageModale2.classList.toggle("pageModale2Active");
            //reinitialiser le formulaire
            reinitialiserFormulaireAjoutTravail();
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
        //Si tous les tests validés, indiquer chargr la miniature
        //Selection des balises pour l'aperçu : bloc et image
        const blocApercu = document.querySelector(".previsualiserImage");
        const imageApercu = document.querySelector("#apercuImage");
        //Creation d'une URL à partir de l'image chargée
        const urlImage = URL.createObjectURL(fichier);
        imageApercu.src = urlImage;
        //afficher le bloc d'aperçu qui était caché
        blocApercu.classList.add("afficherApercuImage");
    });
};

//Validation du formulaire d'ajout et déblocage du bouton

async function validationFormulaireAjoutTravail(formulaireAjout) {
    //placer les validations dans écouteur change du formulaire
    formulaireAjout.addEventListener("change", () => {
        //selection des champs du formulaire
        let champImage = document.querySelector("#ajoutImage");
        let champTitre = document.querySelector("#titreAjoutImage");
        let champCategorie = document.querySelector("#categorieAjoutImage");
        //selection du bouton
        let btnValiderFormulaire = document.querySelector(".btnValiderAjoutPhoto");
        //---validation de l'image        
        //formats autorisés
        const formatsAutorises = ["image/jpeg", "image/png"];
        //convertir mo en bytes
        const tailleMaxAutoriseEnBytes = 4*1024*1024;
        //selection de l'image chargee
        const imageChargee = champImage.files[0];
        //conditions du formulaire à passer pour activer le bouton
        if (!formatsAutorises.includes(imageChargee.type)) {
            btnValiderFormulaire.disabled = true;
            return;
        };
        if (imageChargee.size > tailleMaxAutoriseEnBytes) {
            btnValiderFormulaire.disabled = true;
            return;
        };
        //validation du champ titre
        if (champTitre.value.length < 5) {
            btnValiderFormulaire.disabled = true;
            return;
        };
        //validation du champ catégorie
        if (champCategorie.value === "0" ) {
            btnValiderFormulaire.disabled = true;
            return;
        };
        //Quand toutes les barrières passées, enlever le disabled du bouton
        btnValiderFormulaire.disabled = false;
    });
};

// Envoi de la requête API du formulaire  et gestion de la reponse
async function envoyerAjoutTravail(formulaireAjout) {
    formulaireAjout.addEventListener("submit", async function envoiFormulaireAjout(event) {
        //bloquer comportement par défaut
        event.preventDefault();
        //selection des champs du formulaire
        let champImage = document.querySelector("#ajoutImage");
        let champTitre = document.querySelector("#titreAjoutImage");
        let champCategorie = document.querySelector("#categorieAjoutImage");
 
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
              //---comportement en cas de succès
              //effacer le formulaire
              reinitialiserFormulaireAjoutTravail();
              //charger la nouvelle liste de travaux depuis l'API
              mettreAJourTravaux();
           } else {}
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
    //------ Appeler ici la fonction pour vérifier le formulaire et délboquer le bouton
    validationFormulaireAjoutTravail(formulaireAjout);
    //comportement à la soumission
    envoyerAjoutTravail(formulaireAjout);
 };