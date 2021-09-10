// 1- ON RÉCUPÈRE L'ID DE NOTRE URL
(async function () {
  const idArticle = getArticleId();
  const cameraData = await getArticle(idArticle);
  injectArticle(cameraData);
})();

function getArticleId() {
  return new URL(window.location.href).searchParams.get("id");
}

function getArticle(idArticle) {
  return fetch(`http://localhost:3000/api/cameras/${idArticle}`)
    .then((Res) => {
      console.log(Res.json);
      return Res.json();
    })
    .catch((error) => {
      alert("Oups ! Revenez un peu plus tard...");
    });
}
// On modifie le DOM avec le bon article selon l'ID

function injectArticle(camera) {
    
  document.getElementById("card-img").src = camera.imageUrl;
  document.getElementById("card-title").textContent = camera.name;
  document.getElementById("card-text").textContent = camera.description;
  document.getElementById("card-price").textContent = `${camera.price / 100}.00€`;
  document.getElementById("choice").innerHTML +=
  `<form class="d-flex flex-column align-items-center">
    <label class="m-3" for="lensesChoice">Choisissez un objectif :</label>
    <select class="lenseOption name="lense id="lensesChoice" required>
      <option value=""</option>
    </select>
    <button id="addToCart" type="submit" class="btn btn-dark m-3">Ajouter au panier</button>
  </form>`;

  const optionSelect = camera.lenses;

  //Selection ID formulaire
  const idForm = document.querySelector("#lensesChoice");
  
  for (let i = 0; i < optionSelect.length; i++) {
    const option = document.createElement("option");
    option.value = `${optionSelect[i]}`;
    option.innerHTML = `${optionSelect[i]}`;
    document.getElementById("lensesChoice").appendChild(option);
  }

  //Selection bouton ajouter au panier
  const addToCart = document.querySelector("#addToCart");
  // Ecouter le bouton et ajouter au panier
  addToCart.addEventListener("click", (e) => {
    e.preventDefault()

    // Choix du form dans une variable
    const choiceForm = idForm.value;
    console.log(choiceForm);

    //Recuperer les valeurs du formulaire
  let productChoice = {
    nom: camera.name,
    idProduct: camera._id,
    quantité: 1,
    prix: camera.price / 100,
    Objectif: choiceForm
  }
  console.log(productChoice);
  // LOCAL STORAGE
 let productStorage = JSON.parse(localStorage.getItem("product"));

  //Fonction popUp
  const popupConfirmation = () => {
    if(window.confirm(`Vous avez ajouté ${camera.name} avec l'objectif ${choiceForm} au panier ! Consultez le panier OK ou revenir à l'accueil ANNULER`)) {
      window.location.href = "cart.html";
    }
    else {
    window.location.href = "index.html";
    }
  }

 // Si produit dans le local storage
 if(productStorage) {
  productStorage.push(productChoice);
  localStorage.setItem("product", JSON.stringify(productStorage));
  popupConfirmation();
 
 } else { 
   productStorage = [];
   productStorage.push(productChoice);
   localStorage.setItem("product", JSON.stringify(productStorage));
   console.log(productStorage);
   popupConfirmation();
 }

  });

}

