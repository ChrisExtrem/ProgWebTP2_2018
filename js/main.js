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
        <div class="card"><!--Inicio Card-->
            <img src="${user.picture.large}" alt="" class="mt-3 rounded-circle card-img-top mx-auto">
            <br>
            <div class="card-body"><!--Inicio Card Body-->
                <h5 class="card-title text-center">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><b>username:</b> ${user.login.username}</h6>
                <p class="card-text">
                    <b>Phone:</b> ${user.phone}<br>
                    <b>Email:</b> ${user.email}<br>
                </p>
            </div><!--Fin Card Body-->

            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary w-50 mx-auto mb-3" data-toggle="modal" data-target="#${user.login.username}ModalCenter">
              Ver Detalles
            </button>

            <!-- Modal -->
            <div class="modal fade" id="${user.login.username}ModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Detalles Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="card"> <!--CardInterno-->
                        <img src="${user.picture.large}" alt="" class="mt-1 rounded-circle card-img-top mx-auto">
                        <br>
                        <div class="card-body"><!--Inicio Card Body-->
                            <h5 class="card-title text-center">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                            <h6 class="card-subtitle mb-2 text-muted"><b>username:</b> ${user.login.username}</h6>
                            <p class="card-text">
                                <b>Contraseña: </b>${user.login.password}<br>
                                <b>Email:</b> ${user.email}<br>
                                <b>Telefono:</b> ${user.phone}<br>
                                <b>Celular:</b> ${user.cell}<br>
                                <b>Cumpleaños:</b> ${user.dob.date}<br>
                                <b>Domicilio:</b> ${user.location.street} <br>
                                <b>Ciudad:</b> ${user.location.city}<br>
                            </p><!--FinCardInterno-->  
                        </div><!--Fin Card Body-->

                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>


        </div><!--Fin Card-->

        <br>
    </div>`;
    });
    console.log(cards);
    document.getElementById('listaUsuarios').innerHTML=cards;
} //Fin Funcion CargarUsuarios

var filtrar = function(buscado,genero){
    let resultado,tmp;
    if(buscado.trim()==''){
        tmp=obtenerPrimerosUsuarios();
    }else{
        tmp=filterByText(data,buscado);
    }
    resultado=filterByGender(tmp,genero);
    return resultado;
}

var filterByText = function(array,buscado){
    let resultado;
    let texto=buscado.trim().split(" ");
    if(texto[1]==null){
        resultado=array.filter(elemento => {return isIncluded(elemento,texto[0])});
    }else{
        let subTexto=texto.slice(1);
        resultado= array.filter(elemento => {return isIncluded(elemento,texto[0]) && isIncludedLast(elemento,subTexto)});
    }
    return resultado;
}

var isIncluded = function(elemento,palabra){
    let valor=false;
    if(elemento.name.first.includes(palabra)||elemento.name.last.includes(palabra)) valor=true;
    return valor;
}

var isIncludedLast = function(elemento,arrayPalabras){
    let valor=false;
    arrayPalabras.forEach(palabra =>{if(elemento.name.last.includes(palabra)) valor=true;});
    return valor;
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