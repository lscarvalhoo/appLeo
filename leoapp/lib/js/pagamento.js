document.getElementById("num-cartao").onfocus = apagaTextoNumCartao;
document.getElementById("val-cartao").onfocus = apagaTextoValCartao;

document.onchange = load;

function trocaPagina() {
    window.location.href = "http://127.0.0.1:5500/leoapp/confirmacao.html";
}

var request = new XMLHttpRequest();
request.onload = adicionaItensCarrinho, adicionaTotalItens, load;
request.open("GET", "http://www.mocky.io/v2/5b15c4923100004a006f3c07", true);
request.send(); 

function adicionaItensCarrinho(){

    var respostaXML = this.responseText;
    let resposta = JSON.parse(respostaXML); 
    
    adicionaTotalItens(resposta);
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
        totalProdutos += element.product.priceSpecification.price;
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

function validaCartao(num){
	var msg = Array();

	if(num.length > 16 || num[0]==0){
		
		msg.push("Número de cartão inválido");
		
	} else {
		
		var total = 0;
		var arr = Array();
		
		for(i=0;i<num.length;i++){
			if(i%2==0){
				dig = num[i] * 2;
					
				if(dig > 9){
					dig1 = dig.toString().substr(0,1);
					dig2 = dig.toString().substr(1,1);
					arr[i] = parseInt(dig1)+parseInt(dig2);
				} else {
					arr[i] = parseInt(dig);
				}
							
				total += parseInt(arr[i]);
	
			} else {
	
				arr[i] =parseInt(num[i]);
				total += parseInt(arr[i]);
			} 
		}
				
		switch(parseInt(num[0])){
			case 0:
				msg.push("Número incorreto");
				break;
			case 1:
				tipo = "Empresas Aéreas";
				break;
			case 2:
				tipo = "Empresas Aéreas";
				break
			case 3:
				tipo = "Viagens e Entretenimento";
				if(parseInt(num[0]+num[1]) == 34 || parseInt(num[0]+num[1])==37){	operadora = "Amex";	} 
				if(parseInt(num[0]+num[1]) == 36){	operadora = "Diners";	} 
				break
			case 4:
				tipo = "Bancos e Instituições Financeiras";
				operadora = "visa";
				break
			case 5:
				if(parseInt(num[0]+num[1]) >= 51 && parseInt(num[0]+num[1])<=55){	operadora = "Mastercard";	} 
				tipo = "Bancos e Instituições Financeiras";
				operadora = "Mastercard"
				break;
			case 6:
				tipo = "Bancos e Comerciais";
				operadora = "";
				break
			case 7:
				tipo = "Companhias de petróleo";
				operadora = "";
				break
			case 8:
				tipo = "Companhia de telecomunicações";
				operadora = "";
				break
			case 9:
				tipo = "Nacionais";
				operadora = "";
				break
			default:
				msg.push("Número incorreto");
				break;
			}

}
	
if(msg.length>0){	
	
    return false;

} else {
		
		if(total%10 == 0){
            
			return true;
            
		} else {
			return false;
		}
	}
	
}

function validaNome(nome){ 
   	var padrao = /[^a-zà-ú]/gi;
   	var nomeCompleto = nome.replace(" ", ""); 

   	var valida_nome = nomeCompleto.match(padrao);

   	if( valida_nome || !nomeCompleto ){
    	return false;
   	}else{
    	return true;
   	}
}

function validaData(dataCartao){
	if(dataCartao !== null){
		let mes = dataCartao.substr(0, 2);
		let ano = dataCartao.substr(3);
		let validado = false;
		
		const date = new Date();

		
		if(ano.length >> 2){
			if(ano >= date.getFullYear()){
				if(mes >> date.getMonth()){
					validado = true;
				}
			}
		}
		return validado;
	}
	else{
		return false;
	}
}

function validaCVV(cvv){
	if(cvv !== null && cvv.length === 3){
		return true;
	}
	else{
		return false;
	}
}

function validator(){
    let numCartao = document.getElementById("num-cartao").value;
    let nomeTitular = document.getElementById("nome-titular-cartao").value;
	let dataCartao = document.getElementById("val-cartao").value;
	let cvvCartao = document.getElementById("cvv-cartao").value; 

    let cartaoOk = validaCartao(numCartao);
    let nomeOk = validaNome(nomeTitular);
	let dataOk = validaData(dataCartao);
	let cvvOk = validaCVV(cvvCartao);
 
    if(cartaoOk === true && nomeOk === true
		&& dataOk === true && cvvOk === true){
        document.getElementById("botao2").onclick = trocaPagina;
    }
}

function load(){
	var element = document.getElementById("cartao-credito");
	element.addEventListener("change", validator(), true);
}

function apagaTextoValCartao(){
    let vazio = "";
    return document.getElementById("val-cartao").value = vazio;
}

function apagaTextoNumCartao(){
    let vazio = "";
    return document.getElementById("num-cartao").value = vazio;
}

Number.prototype.duasCasas = function () {
    return this.toFixed(2).replace('.', ',');
}