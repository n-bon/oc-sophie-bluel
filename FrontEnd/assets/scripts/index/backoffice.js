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
}