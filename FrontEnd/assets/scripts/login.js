/**********************Importer les programmes appelés dans ce fichier **************/

import { demanderConnexion } from './login-api-modules.js';

/********************** Écouter la soumission du formulaire de connexion ***********/
//Selection du formulaire
const formulaireLogIn = document.querySelector("#formulaire-connexion");

//gestion de la soumission
formulaireLogIn.addEventListener("submit", event => {
    //empecher le comportement par défaut
    event.preventDefault();

    //extraire les champs remplis par l'utilisateur    
    const champEmail = document.querySelector("#email")
    const champMdp = document.querySelector("#mdp")

    //envoyer la requête à l'API
    demanderConnexion(champEmail.value, champMdp.value);
});
