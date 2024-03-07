const contenerGallery = document.querySelector(".gallery");
const conteneurBtn = document.querySelector(".filtre");
const token = sessionStorage.getItem("token");
const logout = document.getElementById("logout");
const banniere = document.querySelector(".bandeauNoir");
const openModal = document.querySelector(".openModal");
const fondclair = document.querySelector(".fondClair");
const modal = document.querySelector(".modal");
const closemodal = document.querySelector(".modalClose i");
const modalBody = document.querySelector(".modalBody");
const modal2 = document.querySelector(".modal2");
const retour = document.querySelector(".retour");
const choisirCategorie = document.getElementById("typeCategorie");
const apercu = document.getElementById("apercu");
const titrePhoto = document.getElementById("titrePhoto");
const telechargerPhoto = document.getElementById("telechargerPhoto");
const photoForm = document.getElementById("photoForm");
const errorFormulaire = document.querySelector(".error2");
const validFormulaire = document.getElementById("validPhoto");
const btnFormulaire = document.querySelector(".btnFormulaire");

// console.log(logout,banniere,openModal,modal,closemodal,modal2,choisirCategorie,titrePhoto,telechargerPhoto,apercu,photoForm);



// ---- Récupération des oeuvres à partir de l'api -----
const getWorks = async () => {
   const response = await fetch("http://localhost:5678/api/works");
   const works = await response.json();
   return works;
};


let indexBouton = 0;


// ---- Initialisation de la page ----
document.addEventListener("DOMContentLoaded", async () => {
// recuperation des works
const works = await getWorks();

	// affichage des works
	createGallery(works);

	// recuperer les categories
	const categories = await getCategories();

	for (let i = 0; i < categories.length; i += 1) {
		//Affichage des boutons
		let currentBtn = document.createElement("div");
		currentBtn.classList.add("btn");
		conteneurBtn.appendChild(currentBtn);

		// noms des categories qui s'affichent dans les boutons hihihi
		currentBtn.innerText = categories[i].name;
		currentBtn.setAttribute("id", categories[i].id);

		// bouton "Tous" actif au chargement de la page
		if (categories[i].id === 0) {
			currentBtn.classList.add("selected");
		}

		// Changement de couleur au click
		currentBtn.addEventListener("click", () => {
			const ensBtns = document.querySelectorAll(".btn");
			ensBtns.forEach((btn) => {
				btn.classList.remove("selected");
			});
			currentBtn.classList.add("selected");

			// Lien vers l'api pour le filtre des boutons
			if (i !== 0) {
				allFilter = works.filter(
					(bouton) => bouton.categoryId == i
				);
				createGallery(allFilter);
			} else {
				createGallery(works);
			}
		});
	}


	// ---- Vérification de la connection du client avec la validation du token ----
	if (token) {
		banniere.style.display = "flex";
		logout.textContent = "logout";
		conteneurBtn.style.display = "none";
		openModal.style.display = "flex";
		console.log("Je suis connectée");
	} else {
		console.log("Je ne suis pas connecte");
	}


	//---- Se deconnecter lorsque l'on clique sur "logout" donc token effacé ----
	if (logout !== null)
		logout.addEventListener("click", () => {
			sessionStorage.clear("token");
		});

	createGalleryModal(works); // affichage de la galerie dans la modale
});


// ----- Récuperation des catégories à partir de l'api -----
const getCategories = async () => {
	const response = await fetch("http://localhost:5678/api/categories");
	const categories = await response.json();

	// Affichage du bouton "Tous"
	const btnTous = { id: 0, name: "Tous" };
	categories.unshift(btnTous);

	return categories;
};


// ----- Récupération de la gallery -----
const createGallery = (works) => {
	contenerGallery.innerHTML = ""; //  ligne pour vider la page afin que les filtres ne s'accumulent pas sur la page
	works.forEach((work) => {
		const figures = document.createElement("figure");
		contenerGallery.appendChild(figures);

		const imgFigure = document.createElement("img");
		figures.appendChild(imgFigure);
		imgFigure.classList.add("galleryImg");
		imgFigure.src = work.imageUrl;
		imgFigure.alt = work.title;

		const figureFigCaption = document.createElement("figcaption");
		figures.appendChild(figureFigCaption);
		figureFigCaption.innerText = work.title;
	});
};


// 
// // ----- Modale -----
// 
// // Récupération de la galerie pour la modale
// const createGalleryModal = (works) => {
// 	modalBody.innerHTML = "";
// 	works.forEach((work) => {
// 		const modalFigures = document.createElement("figure");
// 		modalBody.appendChild(modalFigures);
// 
// 		const imgFigureModal = document.createElement("img");
// 		modalFigures.appendChild(imgFigureModal);
// 		imgFigureModal.src = work.imageUrl;
// 		imgFigureModal.alt = work.title;
// 		
// 		const poubelleBtn = document.createElement("i");
// 		modalFigures.appendChild(poubelleBtn);
// 		poubelleBtn.classList.add("fa-solid");
// 		poubelleBtn.classList.add("fa-trash-can");
// 		poubelleBtn.addEventListener("click", function () {
// 			// console.log("je supprime la photo numero " + work.id);
// 			deletePhoto(work.id);
// 		});
// 	});
// };
// 
// 
// function afficherModal() {
// 	modal.style.display = "block";
// 	fondclair.style.display = "block";
// }
// openModal.addEventListener("click", afficherModal);
// 
// 
// function fermerModal() {
// 	fondclair.style.display = "none";
// 	modal.style.display = "none";
// 	modal2.style.display = "none";
// 	resetModal2();
// }
// closemodal.addEventListener("click", fermerModal);
// 
// 
// fondclair.addEventListener("click", fermerModal);
// 
// 
// // ----- Supprimer une photo -----
// function deletePhoto(id) {
// 	const response = fetch("http://localhost:5678/api/works/" + id, {
// 		method: "DELETE",
// 		headers: {
// 			Authorization: "Bearer " + token,
// 		},
// 	}).then((response) => {
// 		if (response.ok) {
// 			majGallery();
// 			alert("L'élément a bien été supprimé");
// 		} else {
// 			alert("L'élément n'a pas pu être supprimé, veuillez-vous reconnecter.");
// 			document.location.href = "login.html";
// 		}
// 	});
// }
// 
// 
// // ----- Bouton "Ajouter une photo" -----
// ajoutPhoto.addEventListener("click", function () {
// 	modal.style.display = "none";
// 	modal2.style.display = "flex";
// });
// 
// 
// // ----- Mise à jour des galeries après la suppression d'une photo -----
// const majGallery = () => {
// 	fetch("http://localhost:5678/api/works/")
// 		.then((response) => response.json())
// 		.then((works) => {
// 			createGallery(works);
// 			createGalleryModal(works);
// 		});
// };
// 
// 
// // ---- Modale 2 ----
// 
// // Flèche pour revenir sur la modale 1
// retour.addEventListener("click", function () {
// 	modal2.style.display = "none";
// 	modal.style.display = "flex";
// 	resetModal2();
// });
// 
// 
// // Vider la modale
// function resetModal2() {
// 	apercu.src = "";
// 	apercu.style.display = "none";
// 	titrePhoto.value = "";
// 	choisirCategorie.value ="1";
// 	errorFormulaire.innerHTML = "";
// 	btnFormulaire.style.background = "#8d837e";
// 	btnFormulaire.style.border = "#8d837e";
// 	btnFormulaire.style.cursor = "inherit"
// 	};
// 
// 
// // Affichage photos miniatures pour l'ajout
// telechargerPhoto.addEventListener("change", apercuPhoto);
// function apercuPhoto() {
// 	const file = this.files[0];
// 	// console.log(this.files[0].name);
// 	const photoUrl = URL.createObjectURL(file);
// 	apercu.src = photoUrl;
// 	apercu.style.display = "flex";
// };
// 
// 
// // Affichage du bouton de la selection d'une catégorie pour l'ajout d'une photo
// async function choixCategorie() {
// 	const categorieModale = await getCategories();
// 	for (let i = 1; i < categorieModale.length; i++) {
// 		const option = document.createElement("option");
// 		option.textContent = categorieModale[i].name;
// 		option.value = categorieModale[i].id;
// 		choisirCategorie.appendChild(option);
// 	}
// }
// choixCategorie();
// 
// 
// // Récupération des données du formulaire
// function ajoutProjet() {
// 	const formData = new FormData();
// 	formData.append("image", telechargerPhoto.files[0]);
// 	formData.append("title", titrePhoto.value);
// 	formData.append("category", choisirCategorie.value);
// 	console.log("categorie", choisirCategorie.value);
// 
// 	const response = fetch("http://localhost:5678/api/works/", {
// 		method: "POST",
// 		headers:{
// 			Authorization: "Bearer " + token,
// 		},
// 		body: formData,
// 	})
// 		.then ((response) => {
// 			if(response.ok){
// 				console.log("Me vois tu ?")
// 				majGallery();
// 				resetModal2();
// 			} else if (response.status == "401") {
//           alert("Veuillez vous reconnecter");
//           window.location.href = "login.html";
// 			}
// 		});
// };	
// 
// 
// photoForm.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	ajoutProjet();
// 	if (telechargerPhoto.files[0] === undefined || titrePhoto.value ==="" || choisirCategorie.value === "0"){
// 		
// 	} else {
// 			modal2.style.display = "none";
// 	    modal.style.display = "flex";
// 		}
// });
// 
// titrePhoto.addEventListener("input",() => {
// 	console.log("Je vérifie le changement du titre du projet")
//  	verifChamps();
// });
// 
// telechargerPhoto.addEventListener("input",() =>{
// 	console.log("Je verifie le changement de la photo")
// 	verifChamps();
// });
// 
// choisirCategorie.addEventListener("input",() =>{
// 	console.log("Je verifie le changement de la categorie")
// 	verifChamps();
// });
// 
// function verifChamps(){
// 	if (titrePhoto.value && telechargerPhoto.files[0] && choisirCategorie.value){
// 		console.log("je transforme en vert")
// 		errorFormulaire.innerHTML = "";
// 		btnFormulaire.style.cursor = "pointer";
// 		btnFormulaire.style.background = "#1d6154";
// 		btnFormulaire.style.border = "#1d6154";
// 
// 	} else {
// 		console.log("je transforme en gris")
// 		errorFormulaire.innerHTML = "Veuillez remplir tous les champs";
// 		btnFormulaire.style.background = "#8d837e";
// 		btnFormulaire.style.border = "#8d837e";
// 	}
// }