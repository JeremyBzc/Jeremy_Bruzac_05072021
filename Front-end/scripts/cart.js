
let productStorage = JSON.parse(localStorage.getItem("product"));
console.log(productStorage);

// AFFICHAGE PRODUIT DANS LE PANIER //
const displayCart = document.querySelector('#cart-container');
console.log(displayCart);

// Si panier vide => Afficher le panier vide
if(productStorage === null) {
  const emptyCart = `
  <div class="empty-cart col-6 mx-auto">
    <h2>Votre Panier est vide.</h2>
    <img src="img/Point-int.jpeg" alt="Point d'interrogation" class="card-img-top">
  </div>`
  displayCart.innerHTML = emptyCart;
} else {
  // Si le panier n'est pas vide => Afficher produit du local storage
  let structureCart = [];

  for(k = 0; k < productStorage.length; k++) {

    structureCart += `
    <div class="row">
      <div class="col mx-auto">
        <h3>Vos articles:</h3>
        <table class="w-100">
          <thead>
            <tr class="bg-light border-2">
              <th>Produit</th>
              <th>Objectif</th>
              <th>Prix</th>
              <th>Supp.</th>
            </tr>
            <tr class="bg-light">
            <th class="product-item">${productStorage[k].nom}</th>
              <th class="objectif-item">${productStorage[k].Objectif}</th>
              <th class="price-item">${productStorage[k].prix}</th>
              <th class="delete-item"><i class="fas fa-trash-alt"></i></th>
            </tr>
          </thead>
        </table>
        <button class="btn btn-danger">Vider le panier</button>
      </div>
    </div>`;
  }

  if(k === productStorage.length) {
    // injection html dans la page panier
    displayCart.innerHTML = structureCart;

  }

}


