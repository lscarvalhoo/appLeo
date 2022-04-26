
function requisicaoDados(){
    var request = new XMLHttpRequest();
    request.onload = adicionaItensCarrinho, adicionaTotalItens;
    request.open("GET", "http://www.mocky.io/v2/5b15c4923100004a006f3c07", true);
    request.send(); 
}