"use strict";

const btnSave = document.querySelector(".js-btn-save");
const btnRecover = document.querySelector(".js-btn-recover");
const ulElement = document.querySelector(".js-list-user");

let dataApi = [];
let cleanData = []; //para guardar dentro los elementos que me interesan y no tener el data del api al completo.
let cleanUser = {};

let dataFriends = [];
//buscador de usuarios

//1.- obtener 10 usuarios al azar al arrancar la pag
//2.- hacer el fetch
//3.- pintar en la pantalla

fetch("https://randomuser.me/api/?results=10")
  .then((response) => response.json())
  .then((dataApi) => {
    //console.log(dataApi.results)
    const cleanList = limpiadora(dataApi.results); //guardo los datos limpios en una constante. que me devuelve el return de la funcion limpiadora
    //console.log(cleanList);
    paintUsers(cleanList);
 });

function paintUsers (listToPaint){
    for (const userClean of listToPaint) {
      //cleanData.push([user.id, user.picture.medium, user.name.first, user.name.last, user.location.city, user.login.username]);//meto los elementos que me interesan en la variable cleanData con el método push(que he creado en la raiz vacía).

      ulElement.innerHTML += `<li class="js-list-user-twitterlab list-twitter" id="${userClean.uuid}" ><img class="img" src="${userClean.picture}" alt=""><h2 class="title-name">${userClean.name} ${userClean.lastname}</h2><h3 class="title-city">${userClean.city}</h3><h3 class="title-username">${userClean.username}</h3></li>`; //cojo login.uuid xk hay id vacios.
    }
    addListenerUser();
 };

//funcion para quedarme solo con los datos que me interesa en un nuevo array
function limpiadora(dirtyData) {
  //dataApi.results rebautizado a dirtyData
  //console.log(dirtyData);
  //let cleanUser = {};
  //let cleanData = [];
  for (const dirtyUser of dirtyData) {
    cleanUser = {
      city: dirtyUser.location.city, //definimos y renombramos cada propiedad de lo que nos que nos queremos quedar. Para pintarlo en html tengo que poner el nuevo nombre para recorrer el array.
      name: dirtyUser.name.first,
      lastname: dirtyUser.name.last,
      picture: dirtyUser.picture.medium,
      username: dirtyUser.login.username,
      uuid: dirtyUser.login.uuid,
      //email: dirtyUser.email, //--> SI QUIERO AÑADIR MÁS PROPIEDADES AL OBJETO.
    };
    cleanData.push(cleanUser);
  }
  //console.log(cleanData);
  return cleanData;
}
// ****** LUNES ******//
//console.log(cleanData);

function addListenerUser() {
  const allUser = document.querySelectorAll(".js-list-user-twitterlab"); //me traigo toda la lista de usuarios pintados en el html
  for (const user of allUser) {
    // para cada usuario de la lista que me he traido, añademe un escuchador (lineser) que cuando haga click llame a handleclickFriend
    user.addEventListener("click", handleClickFriend); //A CADA USUARIO LE AÑADO UN ESCUCHADOR DE CLICK
  }
}

function handleClickFriend(event) {
  //tenemos que definir el id en el que hemos hecho click
  const idFriendClick = event.currentTarget.id; //guardo en const idFriendClick el id en el que se ha hecho click (y el parseInt es para que me convierta el string en numero --> quite el parceIn xk no cogi el id, sino el login uuid)
  // console.log(idFriendClick);

  //tenemos que usar el metodo findIndex para saber si ya es amigo o no

  const isFriend = dataFriends.findIndex((elem) => elem.uuid === idFriendClick);
  //console.log(isFriend);
  //console.log(dataFriends);

  let clickUser = cleanData.find((elem) => elem.uuid === idFriendClick);
  //console.log(cleanData);
  //console.log(clickUser);

  /*clickUser.isFriend = true;
    console.log(clickUser);*/
  //encuentrame (dentro de los amigos) el elemento cuyo id es igual a idFriendClick (el id en el que se ha hecho click en el evento)
  if (isFriend === -1) {
    dataFriends.push(clickUser);
    //console.log(dataFriends);
    console.log("no es amigo");
    clickUser.isFriend = true;
    addClass(clickUser);
  } else {
    dataFriends.splice(clickUser, 1);
    console.log("es amigo");
    clickUser.isFriend = false;
    //delete clickUser.isFriend; //si en vez de que ponga falso quiero que me elimine la propiedad del objeto.
    removeClass(clickUser);
    }
}

function addClass(usuario) {//no hago un bucle xk le paso directamente el usuario (tampoco se comportaba bien con un bucle)
    let liElement = document.getElementById(usuario.uuid);
    liElement.classList.add("friends"); //asi solo me marca el primer usuario (aunque haga click en otro) y no se me desmarca
  
}

function removeClass(usuario) {
    let liElement = document.getElementById(usuario.uuid);
    liElement.classList.remove("friends");
}

function handleSave() {
  localStorage.setItem("listUserTwitter", JSON.stringify(cleanData));
  console.log(cleanData);
}

function handleRecover (){
  const recoveredData= JSON.parse(localStorage.getItem("listUserTwitter"));
  deleteUser();
  paintUsers(recoveredData);
  console.log(recoveredData);
}

function deleteUser (){
  ulElement.innerHTML = "";
}

//EVENTOS

btnSave.addEventListener("click", handleSave);
btnRecover.addEventListener('click', handleRecover);
