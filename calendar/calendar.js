//Carega dados
let url = 'https://raw.githubusercontent.com/oquejair/site/main/dados.json?token=GHSAT0AAAAAABW57GUSTBGJYPRCONC2XGXKYW55TMQ'
fetch(url)
.then(resposta => resposta.json())
.then(dados => mostrar (dados))

//Função para criar o pictograma
function mostrar(dados){

    //Cria variável para contagem de dias
    let dias = 0

    //Para cada dado dos dados
    for (d of dados){
        //Soma todos os dias (pegando o elemento "total" dos dados)
        dias += d.total
    }   

    //Seleciona div onde vão estar quadradinhos
    let pictograma = document.querySelector(".pictogram")

    //Para cada dia do total de dias
    for (var i = 0; i < dias; i++) {
        
        //Cria uma div (que será o quadradinho)
        let div = document.createElement( 'div' )

        // Adiciona classe “apagado”
        div.classList.add( 'apagado' )

        //Adiciona na div pictogram o quadradinho
         pictograma.appendChild(div)
    }

    //Cria variável que seleciona os inputs do menu
    let menu = document.querySelectorAll('input[name="menu"]')

    //Para cada checkbox do menu
    for (let checkbox of menu) {
        
        //Ouvir o evento de input e acessar a função para acender o quadradinho
        checkbox.addEventListener('input', acendeQuadradinhos)
        }

    //Função para acender os quadradinhos
    function acendeQuadradinhos(event){

        //Cria variável com lista vazia para selecionar os horários
        let horariosSelecionados = []

        //Cria variável que captura div do quadradinho
        let quadradinhos = document.querySelectorAll('.pictogram > div')
        
        //Para cada quadradinho
        for (quadradinho of quadradinhos){
            
          //Apaga a cor do quadradinho
          quadradinho.style.removeProperty('background-color')
          
          //Adiciona a classe apagado (essas duas para já começar com os quadrados apagados)
          quadradinho.classList.add( 'apagado' )
        }

        //Para cada checkbox do menu 
        for (let checkbox of menu){
            
            //Cria variável que seleciona o valor do checkbox
            let valorCheckbox = checkbox.value
            
            //Se o checkbox estiver selecionado
            if (checkbox.checked){
                
                //Coloca o horário na lista de horários selecionados
                horariosSelecionados.push(valorCheckbox)
            }
        }

        //Para dado de dados
        for (dado of dados){
            
            //Cria vari[avel que seleciona classe "apagado"
            let apagados = document.querySelectorAll('.apagado')
            
            //Cria variavel que seleciona o total (de dias) do dado
            let total = dado.total
            
           //Cria variavel que seleciona a cor do dado
            let cor = dado.cor
            
            //Se na lista de horários selecionados estiver a hora do dado
            if ( horariosSelecionados.includes( dado.hora ) ){

                // inicia contador
                let contador = 0

                // para cada quadradinho apagado do gráfico
                for ( let apagado of apagados ) {

                    //Se a contagem for menor que total
                    if ( contador < total ) {

                        //Remove a classe "apagado"
                        apagado.classList.remove( 'apagado' )

                        //Pinta com cor específica do intervalo
                        apagado.style.backgroundColor = cor

                        // adiciona quantos quadradinhos são
                        contador++
                    }
                }             
            }
        }        
    }
}

//Carrega novos dados para inserir heatmap
let raw = 'https://raw.githubusercontent.com/oquejair/site/main/heatmap.txt';

//Abre os dados 
fetch(raw)
.then(function(response) {
  return response.text();
})
.then(function(response){

   let figura = document.querySelector('.fig');
   let img = document.createElement("IMG");
   img.src = response;
   figura.appendChild(img);
});
