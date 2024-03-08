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

  //Affichage des boutons
  for (let i = 0; i < categories.length; i += 1) {
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
        allFilter = works.filter((bouton) => bouton.categoryId == i);
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

  createGalleryModal(works);
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
  contenerGallery.innerHTML = "";
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
