let tentativa = 'a';
let letentativa = 1;
let correta = '';

function update() {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET","/busca", true);
  
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    correta = xmlhttp.responseText;
  }
  
  xmlhttp.send();
}

update();

function pinta(respo){
  let conta = 0;
  for(i=1; i<=5; i++){
    if(respo[i.toString()] == 'ok'){
      document.getElementById(tentativa+i).style.backgroundColor = '#3afd61';
      conta++; 
    }else if(respo[i.toString()] == 'notok'){
      document.getElementById(tentativa+i).style.backgroundColor = '#f0fd3a';
    }else{
      document.getElementById(tentativa+i).style.backgroundColor = '#9c9c9c';
    }    
  }
  
  tentativa = String.fromCharCode(tentativa.charCodeAt(0) + 1);
  letentativa = 1;

  if(conta == 5){
    let resposta = confirm('PARABENS, Confirme para jogar novamente!!');
    if(resposta){
      tentativa = 'a';
      letentativa = 1;
      
      let q = document.getElementsByClassName('quad');
      for(i=0; i<q.length; i++){
        q[i].style.backgroundColor = '#f9d2d2';
        q[i].innerHTML = '';
      }
      
      update();
    }    
  }

  if(tentativa.charCodeAt(0) >= 'g'.charCodeAt(0)){
    let resposta = confirm('PERDEU!! A palavra correta é '+correta.toUpperCase()+'!! Confirme para jogar novamente!!');
    if(resposta){
      tentativa = 'a';
      letentativa = 1;
      
      let q = document.getElementsByClassName('quad');
      for(i=0; i<q.length; i++){
        q[i].style.backgroundColor = '#f9d2d2';
        q[i].innerHTML = '';
      }
      
      update();
    }
  }
}

function corrige(palavra) {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST","/valida", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    pinta(JSON.parse(xmlhttp.responseText));
  }
  
  xmlhttp.send('digitada='+palavra+'&resposta='+correta);
}

function envia(){
  let palavra = '';
  let l = '';

  for(i=1; i<=5; i++){
    l = document.getElementById(tentativa+i).innerHTML;
    console.log(l);
    if(l == ' '){
      alert("Palavra Invalida!!");
      return;
    }
    palavra += l;
  }
  
  corrige(palavra);
}

function letra(letra){
  if(letra == 'del'){
    if(letentativa > 1){
      letentativa--;
      document.getElementById(tentativa+letentativa).innerHTML = '';
    }   
  }else if(letra == 'ent'){
    envia();
  }else{
    if(letentativa <= 5){
      document.getElementById(tentativa+letentativa).innerHTML = letra;
      letentativa++;
    }
  }
}