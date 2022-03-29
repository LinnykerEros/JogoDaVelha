const linhas = document.querySelectorAll(".linhas");
let checkTurno = true;
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
  //se o clique for em "linhas"
  if (evento.target.matches(".linhas")) {
    //passo o id da div "linhas" ex: linhas[0], linhas[1] para a função jogar;
    jogar(evento.target.id);
  }
});

function jogar(id) {
  //pego o id da minha div "linhas"
  const linha = document.getElementById(id);

  linha.style.transform = "scale(1.1)";

  //verifico qual o jogador que jogou, se foi o jogadorX ou jogadorO
  turnoDoJogador = checkTurno ? jogadorX : jogadorO;

  //faço minha div linha[id] receber o turno do jogador, escrevo na minha div X or O
  linha.innerHTML = turnoDoJogador;

  if (turnoDoJogador == jogadorO) {
    linha.style.color = "hsl(52, 100%, 62%)";
  }
  //adiciono qual jogador jogou na class da minha div linha, ex:linhas O ou linhas X
  linha.classList.add(turnoDoJogador);
  //passo para a minha função de checar o vencedor, o turno do jogador.
  checkVencedor(turnoDoJogador);
}

function checkVencedor(turnoDoJogador) {
  //com o "some" estou verificando se algum elemento(posição) está preenchida, retorna true
  const vencedor = combinacoes.some((combinacao) => {
    //com o "every" estou verificando se o que está preenchido retornam o mesmo turnoJogador ex: X X X or O O O
    return combinacao.every((index) => {
      return linhas[index].classList.contains(turnoDoJogador);
    });
  });
  console.log(vencedor);
  //verifico se ganhou ou não, se vencedor == true, ganhou, ai encerra o jogo.
  if (vencedor == true) {
    encerraJogo(turnoDoJogador);
  } else if (checkEmpate()) {
    encerraJogo();
  } else {
    checkTurno = !checkTurno;
  }
}

function encerraJogo(vencedor = null) {
  let res = document.getElementById("resultado");
  const h2 = document.createElement("h2");
  const h3 = document.createElement("h3");
  res.style.display = "block";
  res.appendChild(h2);
  res.appendChild(h3);
  if (vencedor) {
    h2.innerHTML = `Jogador <span>${vencedor}</span>, venceu!`;
    let button = document.querySelector(".button");

    button.style.transform = "scale(1.1)";
  } else {
    h2.innerHTML = `Empatou`;
  }
}

//verificando o empate
function checkEmpate() {
  let x = 0;
  let o = 0;
  for (index in linhas) {
    //verifico se index é um número
    if (!isNaN(index)) {
      //se for um número, verifico se minha linha com id tal contém X
      if (linhas[index].classList.contains(jogadorX)) {
        x++;
      }
      //se for um número, verifico se minha linha com id tal contém O
      if (linhas[index].classList.contains(jogadorO)) {
        o++;
      }
    }
  }
  //verifico se a soma dos elementos é igual a 9 que corresponde ao tamanho da minha grid, se sim, significa empate, então ele retorna true.
  return x + o === 9 ? true : false;
}
//resetar o jogo
function resetar() {
  location.reload();
}
