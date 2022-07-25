
//Ativar botões ------------------------------------------------

let botoes = document.querySelectorAll("button[data-alvo]");

function ativaBotao(event){ 

  //Seleciona o botão que foi clicado
  let botaoAtual = event.target;

  //Pega o dataset do alvo
  let dataAlvo = botaoAtual.dataset.alvo;

  console.log(dataAlvo)

  //Seleciona a div que o botao deve abrir
  let elementoAlvo = document.querySelector(dataAlvo);

  console.log(elementoAlvo)

  //Seleciona a div que estava com a classe 'passo-ativo'
  let passoAnterior = document.querySelector('.passo-ativo');

  // remove a classe 'passo-ativo' do elemento que estava exibido, para escondê-lo
  passoAnterior.classList.remove('passo-ativo');

  // adiciona a classe 'passo-ativo' ao elemento que deve ser exibido
  elementoAlvo.classList.add('passo-ativo');

}

// para cada item da lista de botoes
for(let botao of botoes){
  // código a repetir
  botao.addEventListener('click', ativaBotao);
}

//Mostrar quiz e calcular ------------------------------------------------

// Seleciona todos os quizzes da página
let quizzes = document.querySelectorAll( '.quiz' )

//Inicia um contador de acertos
let correctAnswers = 0

//Calcula o total de quizzes na página (menos 2, pq tem a introdução e o resultado)
let totalAnswers = (quizzes.length) - 2 

//Coloca o número de quizzes
document.querySelector('.total').textContent = totalAnswers

//Para cada quiz da lista de quiz
for ( let quiz of quizzes ) {

  // Selecione todas as respectivas alternativas
  let options = quiz.querySelectorAll( 'li.quiz-list' )

  // Para cada uma das alternativas
  for ( let option of options ) {

    // Ouça pelo evento de clique e acione a função
    option.addEventListener( 'click', showQuiz )
  }
}

function showQuiz(event){

  // Cria variável que representa a alternativa clicada
  let option = event.target

  // Cria variável que representa o respectivo quiz
  let quiz = option.closest( '.quiz' )

  // Cria variável que representa as opções
  let lista = option.closest( 'ol' )

  // Cria variável que representa o RESPECTIVO resultado
  let result = quiz.querySelector( '.part-2' )

  // Desativa clique no quiz
  quiz.classList.add( 'inactive' )

  // Aplica classe “clicada” para estilizar via CSS
  option.classList.add( 'clicked' )

  // Ao clicar em qualquer resposta, mostrar correta e gráfico
  result.classList.add( 'show' )

  // Checha se alternativa tem a classe “.correct”
  let correct = option.classList.contains( 'correct' )
  
  if ( correct ){
    //Contabiliza acerto
    correctAnswers++
  }
  
  //Atualiza resultado geral
  document.querySelector( 'output' ).textContent = correctAnswers
  
  //Abre a página final com desfecho do quiz
  let final = document.querySelector(".final")
  
  //Abre a página final do quiz, não importa a contagem
  if (correctAnswers <= totalAnswers){
    final.classList.add("visible")
  }
}
