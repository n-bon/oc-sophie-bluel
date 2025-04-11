/**
 *   PROGRAMMES SPECIFIQUES À L'AFFICHAGE DU PORTFOLIO
 *   gallerie de travaux et filtrage dynamique
 **/


/** Boucle d'affichage des travaux à partir de la liste fournie **/
export async function afficherTravaux(travaux) {
    //Selection de l'emplacement
    let emplacementPortfolio = document.querySelector(".gallery");

    //Nettoyage : Effacer le HTML pour réutiliser la fonction
    emplacementPortfolio.innerHTML = ``;

    //Boucle principale d'affichage des travaux
    for (let i=0; i < travaux.length; i++) {
        //Création d'une variable travail actif car redondant
        let travail = travaux[i]
        //Création de la figure (carte) destinée à recevoir l'image et la légende
        let figureTravail = document.createElement("figure");

        //Création de l'image
        let imageTravail = document.createElement("img");
        imageTravail.setAttribute("src", `${travail.imageUrl}`);
        imageTravail.setAttribute("alt", `${travail.title} par Sophie Bluel, architecte d'intérieur`);
        imageTravail.setAttribute("title", `${travail.title} par Sophie Bluel`)

        //Creation de la legende
        let legendeTravail = document.createElement("figcaption");
        legendeTravail.innerText = `${travail.title}`;

        //Ajout de l'image et de la légende dans la figue
        figureTravail.appendChild(imageTravail);
        figureTravail.appendChild(legendeTravail);

        //Ajout de la figure dans le container
        emplacementPortfolio.appendChild(figureTravail);
    };
};

/** Boucle d'affichage des filtres dynamiques **/
export async function afficherBoutonsFiltres(filtres) {
    // Selection du div qui accueille les filtres dynamiques
    const emplacementFiltres = document.querySelector(".filtres");

    //Boucle de création des boutons
    filtres.forEach((filtre) => {
        //Création du bouton
        let boutonFiltre = document.createElement("button");
        //Remplissage avec le contenu de l'API
        boutonFiltre.innerText = filtre.name;
        //Ajout d'un attribut libre avc la référence à l'id de la catégorie
        boutonFiltre.setAttribute("categorie-id", `${filtre.id}`);
        //Affichage dans l'UI
        emplacementFiltres.appendChild(boutonFiltre);
    });
};

/** Fonctionnement des filtres dynamiques **/
//Déselectionner les autres filtres
async function effacerSelectionFiltres (listeBoutons) {
    listeBoutons.forEach((bouton) => {
        if (bouton.className === "filtreActif") {
            bouton.className = "";
        };
    });
};

//Filtrer la liste des travaux à afficher en fonction du bouton sélectionné
export async function modifierPortfolioFiltres (tousTravaux) {
    /******************Initialisation*********/
    // Selection des objets HTML
    const sectionBoutonsFiltres = document.querySelector(".filtres");
    const boutons = sectionBoutonsFiltres.querySelectorAll("button");

    //Écouter l'événement clic
    boutons.forEach((bouton) => {
        bouton.addEventListener("click", () => {
            //Effacer classe selectionnee sur les autres boutons
            effacerSelectionFiltres(boutons);
            //Ajouter la classe sur le bouton
            bouton.className= "filtreActif";
            //Sélectionner l'id de la catégorie du bouton dynamique
            let idCategorieBouton = parseInt(bouton.getAttribute("categorie-id"));
            //Comportement particulier si clic sur 'tous'
            if (idCategorieBouton === 0) {
                afficherTravaux(tousTravaux);
            } else {
                //Filtrage dynamique de la liste
                let listeFiltree = tousTravaux.filter(travail => {
                    return travail.category.id === idCategorieBouton;
                });
                //Appel de la fonction Afficher Travaux avec la nouvelle liste
                afficherTravaux(listeFiltree);
            };
        });
    });
};
