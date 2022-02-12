document.addEventListener('DOMContentLoaded', () => {
    
    buscaDados();
});

let valor = null;
let moedaAtual = null;
let moedaFinal = null;
let result = null;
let real = null;
let dolar = null;
let euro = null;
let euroEmDolar = null;
let dolarEmEuro = null;

function calcular() {

    valor = document.querySelector('#moeda1').value;
    moedaAtual = document.querySelector('#moedas1').value;
    moedaFinal = document.querySelector('#moedas2').value;

    if (moedaAtual == 'USD' && moedaFinal == 'BRL') {
        result = dolar * valor;
    }
    if (moedaAtual == 'BRL' && moedaFinal == 'USD') {
        result = valor / dolar;
    }

    if (moedaAtual == 'EUR' && moedaFinal == 'BRL') {
        result = euro * valor;
    }
    if (moedaAtual == 'BRL' && moedaFinal == 'EUR') {
        result = valor / euro;
    }

    if (moedaAtual == 'EUR' && moedaFinal == 'USD') {
        result = euroEmDolar * valor;
    }
    if (moedaAtual == 'USD' && moedaFinal == 'EUR') {
        result = dolarEmEuro * valor;
    }

    if (moedaAtual == 'USD' && moedaFinal == 'USD' ||
        moedaAtual == 'EUR' && moedaFinal == 'EUR' ||
        moedaAtual == 'BRL' && moedaFinal == 'BRL') {
        result = Number(valor);
    }

    document.querySelector('#moeda2').value = result.toFixed(2);

    document.querySelector('#resultado').innerHTML = `${valor} ${moedaAtual} = ${result.toFixed(2)} ${moedaFinal}`;
}

async function buscaDados() {

    let url = `https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,EUR-USD,USD-EUR`;

    try {
        let dados = await fetch(url); //aguarda dados
        let cotacao = await dados.json(); //aguarda o obj json

        console.log(cotacao);

        dolar = cotacao.USDBRL.high;
        euro = cotacao.EURBRL.high;

        euroEmDolar = cotacao.EURUSD.high;
        dolarEmEuro = cotacao.USDEUR.high;
    }
    catch (error) {

        console.log('Houve um erro: ' + error);
    }
}   