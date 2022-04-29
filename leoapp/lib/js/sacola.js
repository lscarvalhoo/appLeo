var request = new XMLHttpRequest();
request.onload = adicionaItensCarrinho, adicionaTotalItens;
request.open("GET", "http://www.mocky.io/v2/5b15c4923100004a006f3c07", true);
request.send(); 

function trocaPagina() {
    window.location.href = "http://127.0.0.1:5500/leoapp/pagamento.html";
}

document.getElementById("botao1").onclick = trocaPagina;

function adicionaItensCarrinho(){

    var respostaXML = this.responseText;
    let resposta = JSON.parse(respostaXML); 
    resposta.items.forEach(element => { 
        adicionaItem(element);
    });
    adicionaTotalItens(resposta);
}

function adicionaItem(element){
    var itensCarrinho = document.getElementById("itens-carrinho");
        
    var itemCarrinho = criaItemCarrinho(element);

    itensCarrinho.appendChild(itemCarrinho);
}

function obterUrlImagem(element){
    let imageSource;
    element.product.imageObjects.forEach(imgObj => {
        imageSource = imgObj.small;
    });
    return imageSource;
}

function criaItemCarrinho(element){
        
    var imagem = "<img src='" + obterUrlImagem(element) + "' >";
    var descricao  = element.product.name;
    var preco = element.product.priceSpecification.price;

    let html = `<div id="item-carrinho" class="d-flex flex-row">
                    <div class="col-4">
                        <div id="img-produto">
                            ` + imagem + `
                        </div>
                    </div>
                    <div class="col-8">
                        <div id="desc-produto">
                            <p>` + descricao + `</p>
                        </div>
                        <div id="preco-produto" class="text-end">
                            <p>` + preco.duasCasas() + `</p>
                        </div>
                    </div>
                </div>`

    let div = document.createElement('div');

    div.innerHTML = html;
    return div;
}

function adicionaTotalItens(element){
    var totalItens = document.getElementById("total-itens");
        
    var calculaTotalItens = criaTotalItens(element);

    totalItens.appendChild(calculaTotalItens);
}

function criaTotalItens(element){

    let totalProdutos = 0;
    let frete = element.shippingTotal;
    let desconto = element.discount;
    
    element.items.forEach(element => { 
        totalProdutos +=  element.product.priceSpecification.price;
    });

    let total = (totalProdutos + frete) - desconto;

    let html = `<ul class="col">
                    <div class="d-flex justify-content-between flex-row">
                        <li>PRODUTOS</li>
                        <li>` + totalProdutos.duasCasas() + `</li>
                    </div>
                    <div class="d-flex justify-content-between flex-row">
                        <li>FRETE</li>
                        <li>` + frete.duasCasas() + `</li>
                    </div>
                    <div class="d-flex justify-content-between flex-row">
                        <li>DESCONTO</li>
                        <li>` + desconto.duasCasas() + `</li>
                    </div>
                    <br/>
                    <div class="d-flex justify-content-between flex-row val-total-itens">
                        <li>TOTAL</li>
                        <li>` + total.duasCasas() + `</li>
                    </div>
                </ul>`
    
    let divTotal = document.createElement("div");
    divTotal.innerHTML = html;

    return divTotal;
}

Number.prototype.duasCasas = function () {
    return this.toFixed(2).replace('.', ',');
}