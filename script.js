const celulas = document.querySelectorAll(".celulas");
let inputCheck = document.getElementById("inputCheck");
let jogueNovamente = document.getElementById("alertaJogueNovamente");
let checkTurno = true;
let fimDeJogo = false;
const jogadorX = "X";
const jogadorO = "O";
const combinacoes = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

document.addEventListener("click", (evento) => {
  //se o clique for em "celulas"

  if (evento.target.matches(".celulas")) {
    //verifco se quero jogar contra o bot ou não

    if (inputCheck.checked == false) {
      //passo o id da div "celulas" ex: celulas[0], celulas[1] para a função jogar;
      jogar(evento.target.id);
    } else {
      jogarBot(evento.target.id, jogadorX);
      setTimeout(() => {
        bot();
      }, 350);
    }
  }
});

//função para jogar contra humano, onde preciso checkar qual o turno
function jogar(id) {
  // //pego o id da minha div "linhas"
  const celula = document.getElementById(id);

  if (celula.textContent) {
     jogueNovamente.style.display = "block";
    return (jogueNovamente.innerHTML = `Posição inválida, jogue novamente!`);
  }
  celula.style.transform = "scale(1.1)";
  //verifico qual o jogador que jogou, se foi o jogadorX ou jogadorO
  turnoDoJogador = checkTurno ? jogadorX : jogadorO;
  //faço minha div celula[id] receber o turno do jogador, escrevo na minha div X or O
  celula.textContent = turnoDoJogador;
  if (turnoDoJogador === jogadorO) {
    celula.style.color = "hsl(52, 100%, 62%)";
  }
  //adiciono qual jogador jogou na class da minha div celula, ex:celulas O ou celulas X

  if (
    !celula.classList.contains(jogadorX) &&
    !celula.classList.contains(jogadorO)
  ) {
    celula.classList.add(turnoDoJogador);
  }

  //passo para a minha função de checar o vencedor, o turno do jogador.
  checkVencedor(turnoDoJogador);
}
//gerando uma posição aleatoria onde o bot vai jogar
function bot() {
  let posicoesDisp = [];
  let i = 0;
  //percorro as celulas na minha grid
  for (i in celulas) {
    //verifico se index é número
    if (!isNaN(i)) {
      //se for um número, verifico se minha linha com id tal, já está preenchida com X or O

      if (
        !celulas[i].classList.contains(jogadorX) &&
        !celulas[i].classList.contains(jogadorO)
      ) {
        //coloco na minha lista as posições disponiveis
        posicoesDisp.push(i);
      }
    }
  }
  //gerando uma posição aleatória que é o ID
  let posicaoAleatoria = Math.floor(Math.random() * posicoesDisp.length);
  //estou passando para minha função "jogar" os parametros posicoesDisp[posicaoAleatoria] que é o id da proxima posição onde o jogadorO(que é o bot), vai jogar.
  //também estou identificando se não for fimdejogo o bot joga novamente, se for, ele não joga.
  if (!fimDeJogo) {
    jogarBot(posicoesDisp[posicaoAleatoria], jogadorO);
  }
}
//função para jogar contra o bot, não preciso checkar o turno já que está jogando contra bot.
function jogarBot(id, turno) {
  //pego o id da minha div "linhas"
  const celulaBot = document.getElementById(id);

  if (celulaBot.textContent) {
    return;
  }
  //criando uma elevação no meu botão quando ele é clicado.
  celulaBot.style.transform = "scale(1.1)";

  celulaBot.textContent = turno;

  //setando uma cor para minha celula O
  if (turno == jogadorO) {
    celulaBot.style.color = "hsl(52, 100%, 62%)";
  }
  //adiciono qual jogador jogou na class da minha div celulaBot, ex:celulaBots O ou celulaBots X
  if (
    !celulaBot.classList.contains(jogadorX) &&
    !celulaBot.classList.contains(jogadorO)
  ) {
    celulaBot.classList.add(turno);
  }

  //passo para a minha função de checar o vencedor, o turno do jogador.
  checkVencedor(turno);
}

function checkVencedor(turnoDoJogador) {
  //com o "some" estou verificando se algum elemento(posição) está preenchida, retorna true
  const vencedor = combinacoes.some((combinacao) => {
    //com o "every" estou verificando se o que está preenchido retornam o mesmo turnoJogador ex: X X X or O O O
    return combinacao.every((index) => {
      return celulas[index].classList.contains(turnoDoJogador);
    });
  });
  //verifico se ganhou ou não, se vencedor == true, ganhou, ai encerra o jogo.
  if (vencedor == true) {
    encerraJogo(turnoDoJogador);
  } else if (checkEmpate()) {
    encerraJogo();
  } else if (inputCheck.checked == false) {
    checkTurno = !checkTurno;
     jogueNovamente.innerHTML = "";
  }
}

function encerraJogo(vencedor = null) {
  let res = document.getElementById("resultado");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  fimDeJogo = true;
  res.style.display = "block";
  res.appendChild(h2);
  res.appendChild(h3);
  if (vencedor) {
    h2.innerHTML = `Jogador <span>${vencedor}</span>, venceu!`;
    let button = document.querySelector(".button");

    button.style.transform = "scale(1.1)";
  } else {
    let button = document.querySelector(".button");

    button.style.transform = "scale(1.1)";
    h2.innerHTML = `Empatou`;
  }
}

//verificando o empate
function checkEmpate() {
  let x = 0;
  let o = 0;
  for (index in celulas) {
    //verifico se index é um número
    if (!isNaN(index)) {
      //se for um número, verifico se minha linha com id tal contém X
      if (celulas[index].classList.contains(jogadorX)) {
        x++;
      }
      //se for um número, verifico se minha linha com id tal contém O
      if (celulas[index].classList.contains(jogadorO)) {
        o++;
      }
    }
  }
  //verifico se a soma dos elementos é igual a 9 que corresponde ao tamanho da minha grid, se sim, significa empate, então ele retorna true.
  return x + o === 9 ? true : false;
}

function resetar() {
  location.reload();
}
