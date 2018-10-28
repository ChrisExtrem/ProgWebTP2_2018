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
            cargarPrimerosUsuarios();
        }
    );

//Funciones
var cargarPrimerosUsuarios = function(){
    let primerosUsuarios=data.slice(0,10);
    cargarUsuarios(primerosUsuarios);
}

var cargarUsuarios = function(usuarios){
    let cards='';
    usuarios.forEach(user => {
        /*let nombre=user.name.first;
        let apellido=user.name.last;
        let titulo=user.name.title;
        let usuario=user.login.username
        let telefono=user.phone;
        let correo=user.email;
        let foto=user.picture.thumbnail;*/
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
    if(genero=='unknow')
    {
        console.log('Sin Seleccioar Genero');
        resultado=filterByText(data,buscado);
        console.log(resultado); 
    }
    if(genero=='male'){
        tmp=data.filter(elemento => {return elemento.gender=='male'});
        resultado=filterByText(tmp,buscado);
        console.log(resultado); 
        }
    if(genero=='female'){
        tmp=data.filter(elemento => {return elemento.gender=='female'});
        resultado=filterByText(tmp,buscado);
        console.log(resultado); 
    }
    return resultado;
}

var filterByText = function(array,buscado){
    let resultado = array.filter(elemento => {return (elemento.name.first==buscado)||(elemento.name.last==buscado)})
    console.log(resultado);
    return resultado;
}

//Subscripcion a Eventos
var frm = document.getElementById('myForm');
frm.addEventListener('submit',function(evento){
    evento.preventDefault();
    let txt=document.getElementById('busqueda').value.toLowerCase();
    let sexo=document.getElementById('genero').value.toLowerCase();
    console.log(txt);
    console.log(sexo);
    cargarUsuarios(filtrar(txt,sexo));
    console.log(data);
});