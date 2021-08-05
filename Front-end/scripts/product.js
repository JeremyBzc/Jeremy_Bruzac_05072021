// ON DÉFINIT LES VARIABLES

// ON APPELLE L'URL
const urlGlobal = window.location.href
console.log(urlGlobal);
const url = new URL(urlGlobal);
console.log(url);
const idApi = url.searchParams.get("id");
console.log(idApi);
// ON

