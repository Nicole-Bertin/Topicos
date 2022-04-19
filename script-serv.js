const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const puxap = fs.readFileSync('./dicionario.txt', 'utf-8').split('\n');
console.log (puxap);


app.use('/proj', express.static('Front'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname  + '/Front/index.html');
});

app.get('/busca', function (req, res){
    //console.log(Math.floor(Math.random()*puxap.length));
    res.send(puxap[Math.floor(Math.random()*puxap.length)]);
});

app.post('/valida', function(req, res){
    palavra = req.body.digitada.toUpperCase();
    correta = req.body.resposta.toUpperCase();
    let p = palavra.split('');
    let c = correta.split('');
    /*let p2 = palavra.charAt(1);
    let c2 = correta.charAt(1);
    let p3 = palavra.charAt(2);
    let c3 = correta.charAt(2);
    let p4 = palavra.charAt(3);
    let c4 = correta.charAt(3);
    let p5 = palavra.charAt(4);
    let c5 = correta.charAt(4);*/
    resultado = {
        '1':'','2':'','3':'','4':'','5':''
    }

    for(i=0, j=1; i<5; i++, j++){
        console.log('a='+palavra+correta);
        console.log('b='+p[i]+c[i]+j);
        
        if(p[i] == c[i]){
            resultado[j.toString()] = 'ok';
        }else if(correta.includes(p[i])){
            resultado[j.toString()] = 'notok';
        }else{
            resultado[j.toString()] = 'out';
        }
    }

    res.send(resultado);

});

app.listen(process.env.PORT || 5000, function() {
    console.log(`O servidor está escutando na porta 5000!`);
});