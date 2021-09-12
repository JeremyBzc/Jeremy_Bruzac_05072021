
let productStorage = JSON.parse(localStorage.getItem("product"));
console.log(productStorage);

//*****1-AFFICHAGE PRODUIT DANS LE PANIER***** //
const displayCart = document.querySelector('#cart-container');

// Si panier vide => Afficher le panier vide
if(productStorage === null || productStorage == 0) {
  const emptyCart = `
  <div class="empty-cart col-6 mx-auto my-5">
    <h2>Votre Panier est vide.</h2>
    <img src="img/Point-int.jpeg" alt="Point d'interrogation" class="card-img-top">
  </div>`
  displayCart.innerHTML = emptyCart;
} else {
  // Si le panier n'est pas vide => Afficher produit du local storage
  let structureCart = `
  <div class="row">
    <div class="col mx-auto">
      <h3>Vos articles:</h3>
      <table class="w-100">
        <thead>
          <tr class="bg-light border-2">
            <th class="col-3">Produit</th>
            <th class="col-3">Objectif</th>
            <th class="col-3">Prix</th>
            <th class="col-3">Supp.</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>`;

  for(k = 0; k < productStorage.length; k++) {

    structureCart += `
    <div class="row">
      <div class="col">
        <table class="w-100">
          <thead>
            <tr class="bg-light">
              <th class="col-3">${productStorage[k].nom}</th>
              <th class="col-3">${productStorage[k].Objectif}</th>
              <th class="col-3">${productStorage[k].prix}€</th>
              <th class="col-3"><button class="delete-item btn btn-danger"><i class="fas fa-trash-alt"></i></button></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>`;
  }

  if(k === productStorage.length) {
    // injection html dans la page panier
    displayCart.innerHTML = structureCart;

  }
}
// Supprimer un article du panier //

let deleteItem = Array.from(document.querySelectorAll(".delete-item"));
let tab = [];

// Select id de l'article à supprimer //
for (let l = 0; l < deleteItem.length; l++) {
  deleteItem[l].addEventListener("click" , (event) => {
    event.preventDefault();
    
    deleteItem[l].parentElement.style.display ="none";
    tab = productStorage;
    // Méthode slice : A partir de l'élément cliqué on le retire du tab ( puis re-injection)
    tab.splice([l], 1);
    productStorage = localStorage.setItem("product", JSON.stringify(tab));

    //Maj local storage
    alert("Ce produit a bien été supprimé du panier ! ");
    window.location.href = "cart.html";

  })
}

//*****2-VIDER TOTALEMENT PANIER*****//

//Injecter bouton HTML Supp ou retourner achats
const btnAllDeleteHtml = `
<div class="d-flex justify-content-center"><button class="btn-delete btn-danger rounded">Vider le panier</button></div>`;

const btnContinue = `
<a href="index.html" class="btn btn-dark rounded mb-5">Continuer vos achats</a>`;

if (productStorage !== null) {
displayCart.insertAdjacentHTML("afterend", btnAllDeleteHtml);
} else {
displayCart.insertAdjacentHTML("beforeend", btnContinue);
}

//Selection bouton
const btnAllDelete = document.querySelector(".btn-delete");

//Suppression de la key product du local Storage pour vider le panier
btnAllDelete.addEventListener('click', (e) => {
  e.preventDefault();

    //.removeItem pour vider le local storage
    localStorage.removeItem("product");
    // Alert "le panier à été vidé";
    alert("Le panier a bien été vidé !")
    //rechargement de la page
    window.location.href = "cart.html";

})

//*****3-On calcule le total du panier*****//

// Variable contenant les prix présents dans le panier

let totalPriceCalcul = [];

// On cherche les prix dans le panier

for(let m = 0; m < productStorage.length; m++) {
  let priceInCart = productStorage[m].prix;

  //Mettre les prix du panier dans le tableau total
  totalPriceCalcul.push(priceInCart)
  console.log(totalPriceCalcul);
}

// Additioner les prix du tableau avec la méthode .reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCalcul.reduce(reducer, 0 );
console.log(totalPrice);

//Le code Html du prix total à afficher 
const DisplayTotalPriceHtml = `
<div class="total-price d-flex justify-content-end"><strong>Total: ${totalPrice}€</strong></div>`;

// Injecter dans le html
displayCart.insertAdjacentHTML("beforeend", DisplayTotalPriceHtml);

//*****4-Le Formulaire*****//

const displayFormHtml = () => {
  //Sélectionner élément DOM pour positionnnement formulaire
  const displayForm = document.querySelector('#form-container');
  console.log(displayForm);

  const structureFrom = `
        <div class="container-fluid d-flex flex-column align-items-sm-center bg-light mb-5"> 
          <h2>Passez commande</h2>
          <form class="col-10 col-md-2 col-lg-2 mx-auto">
            <div class="form-group">
              <label for="firstname" class="label">Prénom:</label>
              <input type="text" name="firstname" id="firstname" class="inputForm" required>
            </div>
            <div class="form-group">
              <label for="lastname" class="label">Nom:</label>
              <input type="text" name="lastname" id="lastname" class="inputForm" required>
            </div>
            <div class="form-group">
              <label for="email" class="label">Adresse e-mail:</label>
              <input type="text" name="email" id="email" class="inputForm" required>
            </div>
            <div class="form-group">
              <label for="adress" class="label">Adresse:</label>
              <input type="text" name="adress" id="adress" class="inputForm" required>
            </div>
            <div class="form-group">
              <label for="zipcode" class="label">Code postal:</label>
              <input type="text" name="zipcode" id="zipcode" class="inputForm" required>
            </div>
            <div class="form-group">
              <label for="city" class="label">Ville:</label>
              <input type="text" name="city" id="city" class="inputForm" required>
            </div>  
            <button type="submit" id="btn-form" class="btn btn-dark my-3">Envoyer la commande</button>
          </form>
        </div>`;
    
        //Injection HTML 
        displayForm.insertAdjacentHTML("afterend", structureFrom);
};
//Affichage du formulaire
displayFormHtml ();

//Selection du bouton "envoyer la commande"
const btnSendForm = document.querySelector("#btn-form");

//*****5-AddEventlisttener*****//

btnSendForm.addEventListener("click", (e) => {
  e.preventDefault();

  //Récupération valeur formulaire
  const contact = {
    firstName : document.querySelector("#firstname").value,
    lastName : document.querySelector("#lastname").value,
    email : document.querySelector("#email").value,
    address : document.querySelector("#adress").value,
    zipcode : document.querySelector("#zipcode").value,
    city : document.querySelector("#city").value
  }

  //*****6-Controle du formulaire avec les REGEX*****//
  const textAlert = (value) => {
    return `${value}: Chiffre et symbole ne sont pas autorisés`;
  };

  const regExFirstLastnameCity = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
  };
  const regExZipCode = (value) => {
    return /^[0-9]{5}$/.test(value);
  };

  const regExEmail = (value) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  };

  const regExAdress = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
  }

  function firstNameControl() {
    //Controle validité prénom
    const theFirstName = contact.firstname;
    if(regExFirstLastnameCity(theFirstName)) {
      return true;
    }else {
      alert(textAlert("Prénom"));
      return false;
    }
  }

  function lastNameControl() {
    //Controle validité nom
    const theLastName = contact.lastname;
    if(regExFirstLastnameCity(theLastName)) {
      return true;
    }else {
      alert(textAlert("Nom"));
      return false;
    }
  }

  function zipCodeControl() {
    //Controle validité code postal
    const theZipcCode = contact.zipcode;
    if(regExZipCode(theZipcCode)) {
      return true;
    }else {
      alert("Champ requis");
      return false;
    }
  }

  function emailControl() {
    //Controle validité email
    const theEmail = contact.email;
    if(regExEmail(theEmail)) {
      return true;
    }else {
      alert("L'email n'est pas valide: doit contenir @ et '.' ");
      return false;
    }
  }

  function adressControl() {
    //Controle validité adresse
    const theAdress = contact.adress;
    if(regExAdress(theAdress)) {
      return true;
    }else {
      alert("L'adresse doit contenir que des lettres et des chiffres");
      return false;
    }
  }

  function cityControl() {
    //Controle validité ville
    const theCity = contact.city;
    if(regExFirstLastnameCity(theCity)) {
      return true;
    }else {
      alert("La ville doit contenir que des lettres");
      return false;
    }
  }
  /////////
  const products = [];
      for (let t = 0; t < productStorage.length; t++) {
          let getId = productStorage[t].idProduct;
          products.push(getId);
      }

  //Controle validité formulaire avant envoie dans le local storage
if(firstNameControl() && lastNameControl() && zipCodeControl() && emailControl() && adressControl() && cityControl()) {
  // Mettre l'objet form dans le local storage
  localStorage.setItem("contact", JSON.stringify(contact));
  
} else {
  alert("Veuillez bien remplir le formulaire");
  return
}
// Valeurs formulaire et produits dans un objet à envoyer au serveur
  const toSend = {
    contact,
    products,
  }
  const toSendJson = JSON.stringify(toSend);
  
  const order = fetch(`http://localhost:3000/api/cameras/order`, {
    method: 'POST',
    body: toSendJson,
    headers: {
      "Content-Type" : "application/json",
    },
  });
  // Résultat du serveur
  order.then(async(res) => {
    try{
      const content = await res.json();
      console.log(content);
      localStorage.setItem("orderId", content.orderId);
      document.location.href = "checkorder.html";

    }catch(e){
      alert(error)
    }
  })
});





