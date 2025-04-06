import { afficherTravaux } from './portfolio.js';

//Appeler et convertir la liste des travaux
const travaux = await fetch("http://localhost:5678/api/works").then(travaux => travaux.json());

//Appeler la fonction d'affichage des travaux grâce à la liste précédemment créée
afficherTravaux(travaux);