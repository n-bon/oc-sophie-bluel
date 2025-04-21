/********************** Programmes annexes appelés dans le programme principal**************/

//Gestion des erreurs de login
async function afficherMessageErreurLogin () {
    //Selection de l'emplacement du message d'erreur
    const emplacementMessageErreur = document.querySelector("#formulaire-connexion");
    //Création de l'élément HTML
    let messageErreur = document.createElement("p");
    //Contenu de l'élément HTML
    messageErreur.classList.add("messageErreur");
    messageErreur.innerText = "Erreur dans l’identifiant ou le mot de passe";
    //Placer l'élément HTML
    emplacementMessageErreur.appendChild(messageErreur);
};

//Envoi de la requête http, gestion de la réponse
async function demanderConnexion (email, mdp) {
    //envoi via l'api 
    let reponseConnexion = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            email: email,
            password: mdp
        })
    });
    if (reponseConnexion.status === 200){
        let reponseFormatee = await reponseConnexion.json();
        let jetonAuth = reponseFormatee.token;
        window.localStorage.setItem("jetonAuth", jetonAuth);
        window.location = "./index.html"
    }else{
        afficherMessageErreurLogin();
    };
};


/***** Programme principal : Écouter la soumission du formulaire de connexion ***********/

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
