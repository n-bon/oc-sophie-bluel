/********************** Écouter la soumission du formulaire de connexion ***********/
//Selection du formulaire
const formulaireLogIn = document.querySelector("#formulaire-connexion");

//Emplacement du jeton d'authentification
let jetonAuth = null

//Comportement à la soumission
formulaireLogIn.addEventListener("submit", event => {
    //empecher le comportement par défaut
    event.preventDefault();
    //extraire les champs remplis par l'utilisateur    
    const champEmail = document.querySelector("#email")
    const champMdp = document.querySelector("#mdp")

    //envoyer la requête à l'API
    demanderConnexion(champEmail, champMdp);
});

async function demanderConnexion (email, mdp) {

    //envoi via l'api 
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: {
            "email": email,
        "password": mdp
        },
    });
    //bloqué à ce niveau
/*     console.log(reponse.json())
    return reponse.json() */
    //Gestion des erreurs d'authentification
    console.log(reponse.status)

    if (reponse.status === 400 || reponse.status === 401 || reponse.status === 404) {
        console.log("il y a un problème")
        //Appeler l'affichage du message d'erreur ici
    }

    if (reponse.status === 200) {
        console.log("identifiants ok")
        //stocker le jeton d'authentification dans le local storage
        //Rediriger vers index
    }
}