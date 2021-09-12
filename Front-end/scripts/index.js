
main()

async function main() {
    const cameras = await getArticles()

    for (camera of cameras) {
    displayArticle(camera)
    }
}
// Appel Api, méthode GET
function getArticles() {
    return fetch("http://localhost:3000/api/cameras")
        .then((Res) => {
         return Res.json()    
        })
        .catch((error) => {
            alert("Oups ! Revenez un peu plus tard...")
        })   
}
// Affichage des produits
function displayArticle(camera) {
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("card-img").src = camera.imageUrl
    cloneElt.getElementById("card-title").textContent = camera.name
    cloneElt.getElementById("card-text").textContent = camera.description
    cloneElt.getElementById("card-price").textContent = `${camera.price / 100}.00€`
    cloneElt.getElementById("id__product").href += `?id=${camera._id}`
    
    

    document.getElementById("main").appendChild(cloneElt)
}

