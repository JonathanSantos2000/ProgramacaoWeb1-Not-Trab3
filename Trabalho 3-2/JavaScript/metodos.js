//variaveis globais
var nmClasse = [];
var varClasse = "";
var IDClasse;
var IDAluno;

var input_NomeClasse = document.querySelector("input[name='nomeClasse']");

var input_Nome = document.querySelector("input[name='nome']");
var input_Serie = document.querySelector("input[name='Serie']");
var input_Idade = document.querySelector("input[name='idade']");

//--------
//Funções
//------------------------------------------------------------------------------------
function FormClasse() {
  document.querySelector('.FormNewClasse').style.display = 'flex';

  document.querySelector('.FormNewAluno').style.display = 'none';
}

function FormAlunos(){
  document.querySelector('.FormNewAluno').style.display = 'flex';
  document.querySelector('.FormNewClasse').style.display = 'none';

  for (let i = 0; i < nmClasse.length; i++) {
    varClasse += "<option value='"+nmClasse[i]+"'>"+nmClasse[i]+"</option>";
  }
  document.getElementById("listaClasse").innerHTML = varClasse;
}

//----------------------------Parte Classe
function MostraClasse() {
  //-----------------------Abrir a lista de classe
  document.querySelector('.tabAluno').style.display = 'none';
  document.querySelector('.tabClasse').style.display = 'flex';
  //-----------------------buscar API
  var request = new XMLHttpRequest();
  var texto = "";
  request.open('GET', 'https://private-67cbdd-escolaapi.apiary-mock.com/Classes');
  
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status == 200) {
      var classe = JSON.parse(this.responseText);
      for (var i = 0; i <  classe.length; i++) {
        var Ano = classe[i];
        nmClasse[i] = Ano.nome;
        texto += "<tr>"
                    +"<td>"+ Ano.id +"</td>"
                    +"<td>"+ Ano.nome +"</td>"
                    +"<td>"
                    +"<input id='"+Ano.id+"' type='button' value='Editar' onclick='EditarClasse(this.id);'>"
                    +"<input id='"+Ano.id+"' type='button' value='Excluir' onclick='RemoverClasse(this.id);'>"
                    +"</td>"+
                  "</tr>";
      }
      document.getElementById("demo").innerHTML = texto;
    }
  };
  
  request.send();
}

function addClasse() {
  var request = new XMLHttpRequest();
  request.open('POST', 'https://private-67cbdd-escolaapi.apiary-mock.com/Classes');
  request.setRequestHeader('Content-Type', 'application/json');
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      console.log('Status:', this.status);
      console.log('Headers:', this.getAllResponseHeaders());
      console.log('Body:', this.responseText);
    }
  };
  var body = {
    'nome': input_NomeClasse
  };
  
  request.send(JSON.stringify(body));

}
//------------------------------------------------------------------------------------
var NomeEditarClasse = document.querySelector("input[name='nomeEditClasse']");

function EditarClasse(id){
  document.querySelector('.editClasse').style.display = 'flex';
  IDClasse = id;

  var request = new XMLHttpRequest();

  request.open('GET', `https://private-67cbdd-escolaapi.apiary-mock.com/Classes/${id}`);
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var classe = JSON.parse(this.responseText);
      ShowTelaEditClasse(classe.nome);
    }
  };
  
  request.send();
};

function salvarEditarClasse(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var classe = JSON.parse(this.responseText);
          var nome = classe.nome;
      }
  };

  xhttp.open("PUT", `http://rest-api-employees.jmborges.site/api/v1/update/${IDClasse}`);
  xhttp.setRequestHeader("Content-type", "application/json");
  var novaClasse = {
      name: NomeEditarClasse.value,
  }
  debugger;
  xhttp.send(JSON.stringify(novaClasse));
};

function sairEditClasse(){
  document.querySelector('.editClasse').style.display = 'none';
};


function ShowTelaEditClasse(nome) {
  NomeEditarClasse.value = nome;
}
//------------------------------------------------------------------------------------------------------
function RemoverClasse(id){
  document.querySelector('.deleteClasse').style.display = 'flex';
  IDfuncionario = id;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var classe = JSON.parse(this.responseText);
      ShowTelaDeletarClasse(classe.nome);
    }
  };
  xhttp.open("GET", `https://private-67cbdd-escolaapi.apiary-mock.com/Classes/${id}`, true);
  xhttp.send();
};


function sairDeleteClasse(){
  document.querySelector('.deleteClasse').style.display = 'none';
};

function ShowTelaDeletarClasse(nome) {
  document.getElementById("textoExcluir").innerHTML = "deseja realmente excluir a classe "+nome+"?";
}

function deletar(){
  debugger;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          location.reload();
      }
    };
    xhttp.open("DELETE", `https://private-67cbdd-escolaapi.apiary-mock.com/Classes/${IDfuncionario}`, true);
    xhttp.send();
};

//------------------------------------------------Parte Alunos
function MostraAlunos(){
  //-----------------------Abrir a lista de Alunos
  document.querySelector('.tabClasse').style.display = 'none';
  document.querySelector('.tabAluno').style.display = 'flex';
  //-----------------------buscar API
  var request = new XMLHttpRequest();
  var texto = "";
  request.open('GET', 'https://private-67cbdd-escolaapi.apiary-mock.com/Aluno');

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status == 200) {
      var alunos = JSON.parse(this.responseText);
      for (var i = 0; i <  alunos.length; i++) {
        debugger;
        var Aluno = alunos[i];
        texto += "<tr>"
                    +"<td>"+ Aluno.id +"</td>"
                    +"<td>"+ Aluno.nome +"</td>"
                    +"<td>"+ Aluno.classe +"</td>"
                    +"<td>"+ Aluno.idade +"</td>"
                    +"<td>"
                    +"<input id='"+Aluno.id+"' type='button' value='Editar' onclick='EditarAluno(this.id);'>"
                    +"<input id='"+Aluno.id+"' type='button' value='Excluir' onclick='RemoverAluno(this.id);'>"
                    +"</td>"+
                  "</tr>";
      }
      document.getElementById("demo2").innerHTML = texto;
    }
  };

  request.send();
}

function addAluno() {
var request = new XMLHttpRequest();
request.open('POST', 'https://private-67cbdd-escolaapi.apiary-mock.com/Aluno');
request.setRequestHeader('Content-Type', 'application/json');
request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

var body = {
  'nome': input_Nome,
  'classe':input_Serie,
  'idade': input_Idade
};
request.send(JSON.stringify(body));
}

//------------------------------------------------------------------------------------
var NomeEditarAluno = document.querySelector("input[name='nomeEditAluno']");
var SerieEditAluno = document.querySelector("input[name='SerieEditAluno']");
var IdadeEditAluno = document.querySelector("input[name='idadeEditAluno']");

function EditarAluno(id){
  document.querySelector('.editAluno').style.display = 'flex';
  IDAluno = id;
  
  for (let i = 0; i < nmClasse.length; i++) {
    varClasse += "<option value='"+nmClasse[i]+"'>"+nmClasse[i]+"</option>";
  }  
  document.getElementById("SerieEditAluno").innerHTML = varClasse;

  var request = new XMLHttpRequest();

  request.open('GET', `https://private-67cbdd-escolaapi.apiary-mock.com/Aluno/${id}`);
  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var classe = JSON.parse(this.responseText);
      ShowTelaEditAluno(classe.nome,classe.classe,classe.idade);
    }
  };
  
  request.send();
};

function salvarEditarAluno(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
  };

  xhttp.open("PUT", `https://private-67cbdd-escolaapi.apiary-mock.com/Aluno/${IDClasse}`);
  xhttp.setRequestHeader("Content-type", "application/json");
  var novaClasse = {
    'nome': NomeEditarClasse.value,
    'classe': SerieEditAluno.value,
    'idade': IdadeEditAluno.value
  }
  debugger;
  xhttp.send(JSON.stringify(novaClasse));
};

function sairEditClasse(){
  document.querySelector('.editAluno').style.display = 'none';
};


function ShowTelaEditAluno(nome,classe,idade) {
  NomeEditarClasse.value = nome;
  SerieEditAluno.value=classe;
  IdadeEditAluno.value=idade;
}
//------------------------------------------------------------------------------------------------------
function RemoverAluno(id){
  document.querySelector('.deleteAluno').style.display = 'flex';
  IDfuncionario = id;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var classe = JSON.parse(this.responseText);
      ShowTelaDeletarClasse(classe.nome);
    }
  };
  xhttp.open("GET", `https://private-67cbdd-escolaapi.apiary-mock.com/Aluno/${id}`);
  xhttp.send();
};


function sairDelete(){
  document.querySelector('.deleteAluno').style.display = 'none';
};
function ShowTelaDeletar(nome) {
  document.getElementById("textoExcluir").innerHTML = "deseja realmente excluir o Aluno "+nome+"?";
}

function deletar(){
  debugger;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          console.log('Status:', this.status);
          console.log('Headers:', this.getAllResponseHeaders());
          console.log('Body:', this.responseText);
          location.reload();
      }
    };
    xhttp.open("DELETE", `https://private-67cbdd-escolaapi.apiary-mock.com/Aluno${IDfuncionario}`);
    xhttp.send();
};
