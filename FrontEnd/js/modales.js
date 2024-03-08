// ----- Modale1 -----

// Récupération de la galerie pour la modale
const createGalleryModal = (works) => {
  modalBody.innerHTML = "";
  works.forEach((work) => {
    const modalFigures = document.createElement("figure");
    modalBody.appendChild(modalFigures);

    const imgFigureModal = document.createElement("img");
    modalFigures.appendChild(imgFigureModal);
    imgFigureModal.src = work.imageUrl;
    imgFigureModal.alt = work.title;

    const poubelleBtn = document.createElement("i");
    modalFigures.appendChild(poubelleBtn);
    poubelleBtn.classList.add("fa-solid");
    poubelleBtn.classList.add("fa-trash-can");
    poubelleBtn.addEventListener("click", function () {
      deletePhoto(work.id);
    });
  });
};

function afficherModal() {
  modal.style.display = "block";
  fondclair.style.display = "block";
}
openModal.addEventListener("click", afficherModal);

function fermerModal() {
  fondclair.style.display = "none";
  modal.style.display = "none";
  modal2.style.display = "none";
  resetModal2();
}
closemodal.addEventListener("click", fermerModal);

fondclair.addEventListener("click", fermerModal);

// ----- Supprimer une photo -----
function deletePhoto(id) {
  const response = fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (response.ok) {
      majGallery();
      alert("L'élément a bien été supprimé");
    } else {
      alert("L'élément n'a pas pu être supprimé, veuillez-vous reconnecter.");
      document.location.href = "login.html";
    }
  });
}

// ----- Bouton "Ajouter une photo" -----
ajoutPhoto.addEventListener("click", function () {
  modal.style.display = "none";
  modal2.style.display = "flex";
  apercu.src = "";
  apercu.style.display = "none";
  resetModal2();
});

// ----- Mise à jour des galeries après la suppression d'une photo -----
const majGallery = () => {
  fetch("http://localhost:5678/api/works/")
    .then((response) => response.json())
    .then((works) => {
      createGallery(works);
      createGalleryModal(works);
    });
};

// ---- Modale 2 ----

// Flèche pour revenir sur la modale 1
retour.addEventListener("click", function () {
  modal2.style.display = "none";
  modal.style.display = "flex";
  resetModal2();
});

// ----- Vider la modale -----
function resetModal2() {
  apercu.src = "";
  apercu.style.display = "none";
  titrePhoto.value = "";
  choisirCategorie.value = "1";
  errorFormulaire.innerHTML = "";
  btnFormulaire.style.background = "#8d837e";
  btnFormulaire.style.border = "#8d837e";
  btnFormulaire.style.cursor = "inherit";
}

// ----- Affichage photos miniatures pour l'ajout-----
telechargerPhoto.addEventListener("change", apercuPhoto);
function apercuPhoto() {
  const file = this.files[0];
  const photoUrl = URL.createObjectURL(file);
  apercu.src = photoUrl;
  apercu.style.display = "flex";
}

// ----- Affichage du bouton de la selection d'une catégorie pour l'ajout d'une photo -----
async function choixCategorie() {
  const categorieModale = await getCategories();
  for (let i = 1; i < categorieModale.length; i++) {
    const option = document.createElement("option");
    option.textContent = categorieModale[i].name;
    option.value = categorieModale[i].id;
    choisirCategorie.appendChild(option);
  }
}
choixCategorie();

// ----- Récupération des données du formulaire -----
function ajoutProjet() {
  const formData = new FormData();
  formData.append("image", telechargerPhoto.files[0]);
  formData.append("title", titrePhoto.value);
  formData.append("category", choisirCategorie.value);
  console.log("categorie", choisirCategorie.value);

  const response = fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  }).then((response) => {
    if (response.ok) {
      console.log("Me vois tu ?");
      majGallery();
      resetModal2();
    } else if (response.status == "401") {
      alert("Veuillez vous reconnecter");
      window.location.href = "login.html";
    }
  });
}

// ----- Soumission du formulaire -----
photoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  ajoutProjet();
  if (
    telechargerPhoto.files[0] === undefined ||
    titrePhoto.value === "" ||
    choisirCategorie.value === "0"
  ) {
  } else {
    modal2.style.display = "none";
    modal.style.display = "flex";
  }
});

// ----- Vérification des differents champs et le bouton "valider" qui devient vert -----
titrePhoto.addEventListener("input", () => {
  console.log("Je vérifie le changement du titre du projet");
  verifChamps();
});

telechargerPhoto.addEventListener("input", () => {
  console.log("Je verifie le changement de la photo");
  verifChamps();
});

choisirCategorie.addEventListener("input", () => {
  console.log("Je verifie le changement de la categorie");
  verifChamps();
});

function verifChamps() {
  if (titrePhoto.value && telechargerPhoto.files[0] && choisirCategorie.value) {
    console.log("je transforme en vert");
    errorFormulaire.innerHTML = "";
    btnFormulaire.style.cursor = "pointer";
    btnFormulaire.style.background = "#1d6154";
    btnFormulaire.style.border = "#1d6154";
  } else {
    console.log("je transforme en gris");
    errorFormulaire.innerHTML = "Veuillez remplir tous les champs";
    btnFormulaire.style.background = "#8d837e";
    btnFormulaire.style.border = "#8d837e";
  }
}
