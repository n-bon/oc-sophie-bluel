/**
 *   PROGRAMMES SPÉCIFIQUES AU BACKOFFICE
 *   réservé aux utilisateurs connectés
**/

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

//Afficher la collection de projets à supprimer
export async function afficherSupprimerProjet(travaux) {
    const emplacementCartes = document.querySelector(".galeriePhotoModale");

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
        bouton.setAttribute("id", `${travaux[i].id}`);
        //placer l'image dans l'article
        carte.appendChild(image);
        //placer le bouton dans l'article
        carte.appendChild(bouton);
        //placer l'article dans le conteneur
        emplacementCartes.appendChild(carte);
    };
};

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