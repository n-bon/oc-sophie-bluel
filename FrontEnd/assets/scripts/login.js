/********************** Programmes annexes appelés dans le programme principal**************/

//Gestion des erreurs de login
async function afficherMessageErreur () {
    console.log("fonction lancée")
    //Selection de l'emplacement du message d'erreur
    const emplacementMessageErreur = document.querySelector("#formulaire-connexion");
    //Création de l'élément HTML
    let messageErreur = document.createElement("p");
    //Contenu de l'élément HTML
    messageErreur.classList.add("messageErreur");
    messageErreur.innerText = "Erreur dans l’identifiant ou le mot de passe";
    console.log(messageErreur)
    //Placer l'élément HTML
    emplacementMessageErreur.appendChild(messageErreur);
};

//Envoi de la requête http, gestion de la réponse
async function demanderConnexion (email, mdp) {
    //envoi via l'api 
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            email: email,
            password: mdp
        })
    })
    if (reponse.status === 200){
        let reponseFormatee = await reponse.json();
        console.log(reponseFormatee);
    }else{
        afficherMessageErreur();
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
