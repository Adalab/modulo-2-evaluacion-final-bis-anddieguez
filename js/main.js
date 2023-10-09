'use strict';


const btnSave = document.querySelector('.js-btn-save');
const btnRecover = document.querySelector('.js-btn-recover');
const ulElement = document.querySelector('.js-list-user');


let dataApi = [];
let cleanData = [];//para guardar dentro los elementos que me interesan y no tener el data del api al completo.
let cleanUser = {};

let dataFriends = [];
//buscador de usuarios

//1.- obtener 10 usuarios al azar al arrancar la pag
//2.- hacer el fetch
//3.- pintar en la pantalla


fetch('https://randomuser.me/api/?results=10')
.then((response)=>response.json())
.then((dataApi)=>{
console.log(dataApi.results)
const cleanList = limpiadora(dataApi.results); //guardo los datos limpios en una constante. que me devuelve el return de la funcion limpiadora
console.log(cleanList);
for (const userClean of cleanList) {
    
    //cleanData.push([user.id, user.picture.medium, user.name.first, user.name.last, user.location.city, user.login.username]);//meto los elementos que me interesan en la variable cleanData con el método push(que he creado en la raiz vacía).

    ulElement.innerHTML += `<li class="js-list-user-twitterlab list-twitter" id="${userClean.uuid}" ><img class="img" src="${userClean.picture}" alt=""><h2 class="title-name">${userClean.name} ${userClean.lastname}</h2><h3 class="title-city">${userClean.city}</h3><h3 class="title-username">${userClean.username}</h3></li>`//cojo login.uuid xk hay id vacios.
}
addListenerUser();
});

//funcion para quedarme solo con los datos que me interesa en un nuevo array
function limpiadora(dirtyData) {//dataApi.results rebautizado a dirtyData
    console.log(dirtyData);
    //let cleanUser = {};
    //let cleanData = [];
    for (const dirtyUser of dirtyData) {
      cleanUser = {
        city: dirtyUser.location.city, //definimos y renombramos cada propiedad de lo que nos que nos queremos quedar. Para pintarlo en html tengo que poner el nuevo nombre para recorrer el array.
        name: dirtyUser.name.first,
        lastname: dirtyUser.name.last,
        picture: dirtyUser.picture.medium,
        username: dirtyUser.login.username,
        id: dirtyUser.id.value,
        uuid: dirtyUser.login.uuid,
        //email: dirtyUser.email, //--> SI QUIERO AÑADIR MÁS PROPIEDADES AL OBJETO.
      };
      cleanData.push(cleanUser);
    }
    //console.log(cleanData);
    return cleanData;
  }

//console.log(cleanData);


function addListenerUser(){
const allUser = document.querySelectorAll('.js-list-user-twitterlab');//me traigo toda la lista de usuarios pintados en el html
for (const user of allUser) {// para cada usuario de la lista que me he traido, añademe un escuchador (lineser) que cuando haga click llame a handleclickFriend
    user.addEventListener('click', handleClickFriend);
}}




function handleClickFriend(event){
    
    //tenemos que definir el id en el que hemos hecho click
    const idFriendClick = (event.currentTarget.id);//guardo en const idFriendClick el id en el que se ha hecho click (y el parseInt es para que me convierta el string en numero --> quite el parceIn xk no cogi el id, sino el login uuid)
    console.log(idFriendClick);

    //tenemos que usar el metodo findIndex para saber si ya es amigo o no
    
   /* const isFriend = dataFriends.findIndex((elem) => elem.id === idFriendClick);
    console.log(isFriend);

    let clickUser = data.results.find((elem) => elem.id === idFriendClick);
    console.log(clickUser);

    //encuentrame (dentro de los amigos) el elemento cuyo id es igual a idFriendClick (el id en el que se ha hecho click en el evento)
    if (isFriend !== -1){
        console.log(clickUser);
        clickUser.isFriend = true;
        
    } else {
        
        clickUser.isFriend = false;
    }*/
}


function handleSave(){
 localStorage.setItem("listUser", JSON.stringify(data.results)); 
 console.log(data.results);
}



 


//EVENTOS


btnSave.addEventListener('click', handleSave);
//btnRecover.addEventListener('click', handleRecover);




