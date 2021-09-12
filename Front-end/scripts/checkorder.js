// Récupération ID de la commande
const resId = localStorage.getItem("orderId");
console.log(resId);
// Injection HTML

const displayOrder = document.querySelector("#checkorder-container");
const structureOrder = `
<div class="row">
    <div class="col mx-auto bg-light border border-dark rounded">
    <p>Votre commande numéro <span class="text-danger text-uppercase">${resId}</span> à bien été prise en compte !</p>
    <p>Nous vous remercions pour votre confiance !</p>
    <p> L'équipe Orinoco</p>
    </div>
</div>`;
displayOrder.insertAdjacentHTML("afterbegin", structureOrder);

// Supprimer Local Storage

function deleteKeyLS(key) {
    localStorage.removeItem(key)
};

deleteKeyLS("orderId")
deleteKeyLS("product")


