'use strict';


const btnSave = document.querySelector('.js-btn-save');
const btnRecover = document.querySelector('.js-btn-recover');
const ulElement = document.querySelector('.js-list-user');


let data = [];
let cleanData = [];//para guardar dentro los elementos que me interesan y no tener el data del api al completo.

let dataFriends = [];
//buscador de usuarios

//1.- obtener 10 usuarios al azar al arrancar la pag
//2.- hacer el fetch
//3.- pintar en la pantalla

fetch('https://randomuser.me/api/?results=10')
.then((response)=>response.json())
.then((data)=>{
console.log(data.results)
for (const user of data.results) {
    
    cleanData.push([user.id, user.picture.medium, user.name.first, user.name.last, user.location.city, user.login.username]);//meto los elementos que me interesan en la variable cleanData con el método push(que he creado en la raiz vacía).
    ulElement.innerHTML += `<li class="js-list-user-twitterlab list-twitter" id="${user.login.uuid}" ><img class="img" src="${user.picture.medium}" alt=""><h2 class="title-name">${user.name.first} ${user.name.last}</h2><h3 class="title-city">${user.location.city}</h3><h3 class="title-username">${user.login.username}</h3></li>`//cojo login.uuid xk hay id vacios.
}
addListenerUser();
});

//console.log(cleanData);


function addListenerUser(){
const allUser = document.querySelectorAll('.js-list-user-twitterlab');//me traigo toda la lista de usuarios pintados en el html
for (const user of allUser) {// para cada usuario de la lista que me he traido, añademe un escuchador (lineser) que cuando haga click llame a handleclickFriend
    user.addEventListener('click', handleClickFriend);
}}




function handleClickFriend(event){
    event.preventDefault();
    //tenemos que definir el id en el que hemos hecho click
    const idFriendClick = (event.currentTarget.id);//guardo en const idFriendClick el id en el que se ha hecho click (y el parseInt es para que me convierta el string en numero)
    //console.log(idFriendClick);

    //tenemos que usar el metodo findIndex para saber si ya es amigo o no
    const isFriend = dataFriends.findIndex((elem) => elem.id === idFriendClick);
    console.log(isFriend);
    let clickUser = data.results.find((elem) => elem.id === idFriendClick);
    console.log(clickUser);
    //encuentrame (dentro de los amigos) el elemento cuyo id es igual a idFriendClick (el id en el que se ha hecho click en el evento)
   /* if (isFriend !== -1){
        console.log(clickUser);
       // clickUser.isFriend = true;
    } else {
        
        //clickUser.isFriend = false;
    }*/
}











//EVENTOS


//btnSave.addEventListener('click', handleSave);
//btnRecover.addEventListener('click', handleRecover);




