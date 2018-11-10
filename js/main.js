var url = 'https://randomuser.me/api/?results=500';
var data;

//Promesa
fetch(url)
    .then(
        function(respuesta){
            return respuesta.json();
        }
    )
    .then(
        function(myJson){
            data=myJson.results;
            cargarUsuarios(obtenerPrimerosUsuarios());
        }
    );

//Funciones
var obtenerPrimerosUsuarios = function(){
    let primerosUsuarios=data.slice(0,10);
    return primerosUsuarios;
}

var cargarUsuarios = function(usuarios){
    let cards='';
    usuarios.forEach(user => {
        cards+=`
        <div class="col-md-4">
            <div class="card">
                <img src="${user.picture.large}" alt="" class="rounded-circle card-img-top mx-auto">
                <br>
                <div class="card-body">
                    <h5 class="card-title text-center">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                    <h6 class="card-subtitle mb-2 text-muted"><b>username:</b> ${user.login.username}</h6>
                    <p class="card-text">
                        <b>Phone:</b> ${user.phone}<br>
                        <b>Email:</b> ${user.email}<br>
                    </p>
                </div>
            </div>
            <br>
        </div>`;
    });
    console.log(cards);
    document.getElementById('listaUsuarios').innerHTML=cards;
} //Fin Funcion CargarUsuarios

var filtrar = function(buscado,genero){
    let resultado,tmp;
    if(buscado==''){
        tmp=obtenerPrimerosUsuarios();
    }else{
        tmp=filterByText(data,buscado);
    }
    resultado=filterByGender(tmp,genero);
    return resultado;
}

var filterByText = function(array,buscado){
    let resultado = array.filter(elemento => {return (elemento.name.first.includes(buscado)||elemento.name.last.includes(buscado))})
    return resultado;
}

var filterByGender = function(array,genero){
    if(genero=='unknow')
    {
        return array;
    }else{ //Inicio Else
        if(genero=='male'){//Inicio If Interior
            return array.filter(elemento => {return elemento.gender=='male'});
            }else{//Fin If Interior | Inicio Else Interior
            return array.filter(elemento => {return elemento.gender=='female'});
        }//Fin Else Interior
    }//Fin Else
}

var buscar = function(evento){
    evento.preventDefault();
    let txt=document.getElementById('busqueda').value.toLowerCase();
    let sexo=document.getElementById('genero').value.toLowerCase();
    cargarUsuarios(filtrar(txt,sexo));
}

var volver = function(){
    cargarUsuarios(obtenerPrimerosUsuarios());
}

//Subscripcion a Eventos
document.getElementById('myForm').addEventListener('submit',buscar);
document.getElementById('btnVolver').addEventListener('click', volver);