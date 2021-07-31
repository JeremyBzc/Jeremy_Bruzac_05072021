console.log('Le Javascript fonctionne !');
main()

async function main() {
    const articles = await getArticles()

    for (article of articles) {
    displayArticle(article)
    }
}

function getArticles() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function(Res) {
         return Res.json()    
        })
        
        .catch(function(error) {
            alert("Oups ! Revenez un peu plus tard...")
        })   
}

function displayArticle(article) {
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("card-img").src = article.imageUrl
    cloneElt.getElementById("card-title").textContent = article.name
    cloneElt.getElementById("card-text").textContent = article.description
    cloneElt.getElementById("card-price").textContent = `${article.price / 100}.00€`
    

    document.getElementById("main").appendChild(cloneElt)
}

