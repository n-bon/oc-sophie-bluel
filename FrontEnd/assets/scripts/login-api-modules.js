export async function demanderConnexion (email, mdp) {
    //envoi via l'api 
    await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json; charset=UTF-8"},
        body: JSON.stringify({
            email: email,
            password: mdp
        })
    })
    .then((reponse) => {console.log(reponse)})
    .catch((error) => {
        console.warn(error)
    });
}