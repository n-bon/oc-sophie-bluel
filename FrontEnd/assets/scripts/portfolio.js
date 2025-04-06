/******* Boucle d'affichage des travaux à partir de la liste fournie ********/

export async function afficherTravaux(travaux) {

    //Selection de l'emplacement

    let emplacementPortfolio = document.querySelector(".gallery");

    for (let i=0; i < travaux.length; i++) {
        //Création d'une variable travail actif car redondant
        let travail = travaux[i]
        //Création de la figure (carte) destinée à recevoir l'image et la légende
        let figureTravail = document.createElement("figure");

        //Création de l'image
        let imageTravail = document.createElement("img");
        imageTravail.setAttribute("src", `${travail.imageUrl}`);

        //Creation de la legende
        let legendeTravail = document.createElement("figcaption");
        legendeTravail.innerText = `${travail.title}`;

        //Ajout de l'image et de la légende dans la figue
        figureTravail.appendChild(imageTravail);
        figureTravail.appendChild(legendeTravail);

        //Ajout de la figure dans le container
        emplacementPortfolio.appendChild(figureTravail);
    }
}