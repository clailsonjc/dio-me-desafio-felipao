class Player {
  id;
  nome;
  velocidade;
  manobrabilidade;
  poder;
  pontosRodada;
  pontosTotal;

  constructor(id, nome, velocidade, manobrabilidade, poder) {
    this.id = id;
    this.nome = nome;
    this.velocidade = velocidade;
    this.manobrabilidade = manobrabilidade;
    this.poder = poder;
  }
}

const player1 = new Player(1, "Mario", 4, 3, 3);
const player2 = new Player(2, "Luigi", 3, 4, 4);
const player3 = new Player(3, "Peach", 3, 4, 2);
const player4 = new Player(4, "Yoshi", 2, 4, 3);
const player5 = new Player(5, "Bowser", 5, 2, 5);
const player6 = new Player(6, "Donkey Kong", 2, 2, 5);

//rolar dados
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
//sortear pistas
function drawClue() {
  let num = Math.floor(Math.random() * 3) + 1;
  let pista = {
    1: "RETA",
    2: "CURVA",
    3: "CONFRONTO",
  }[num];
  return pista;
}

//só para substituir o console.log rsrsrs
function print(texto) {
  console.log(texto);
}

function returnWinner(playerA, playerB, draw) {
  let dice;
  if (draw === "RETA") {
    //player A
    dice = rollDice();
    playerA.pontosRodada = playerA.velocidade + dice;
    print(
      `${playerA.nome} 🎲 rolou um dado de velocidade ${dice} + ${playerA.velocidade} = ${playerA.pontosRodada}`
    );
    //player B
    dice = rollDice();
    playerB.pontosRodada = playerB.velocidade + dice;
    print(
      `${playerB.nome} 🎲 rolou um dado de velocidade ${dice} + ${playerB.velocidade} = ${playerB.pontosRodada}`
    );
  } else if (draw === "CURVA") {
    dice = rollDice();
    playerA.pontosRodada = playerA.manobrabilidade + dice;
    print(
      `${playerA.nome} 🎲 rolou um dado de manobrabilidade ${dice} + ${playerA.manobrabilidade} = ${playerA.pontosRodada}`
    );
    //player B
    dice = rollDice();
    playerB.pontosRodada = playerB.manobrabilidade + dice;
    print(
      `${playerB.nome} 🎲 rolou um dado de manobrabilidade ${dice} + ${playerB.manobrabilidade} = ${playerB.pontosRodada}`
    );
  } else {
    dice = rollDice();
    playerA.pontosRodada = playerA.poder + dice;
    print(
      `${playerA.nome} 🎲 rolou um dado de poder ${dice} + ${playerA.poder} = ${playerA.pontosRodada}`
    );
    //player B
    dice = rollDice();
    playerB.pontosRodada = playerB.poder + dice;
    print(
      `${playerB.nome} 🎲 rolou um dado de poder ${dice} + ${playerB.poder} = ${playerB.pontosRodada}`
    );
  }
  return playerA.pontosRodada > playerB.pontosRodada ? playerA : playerB;
}

//main e escolha dos jogadores
(function main() {
  print("🏁🚨 ESCOLHA UM DOS JOGADORES ABAIXO:");
  print("1-MÁRIO\n2-LUIGI\n3-PEACH\n4-YOSHIN5-BOWSER\n6-DONKEY KONG");
  print("");
  playRaceEngine(player1, player5);
})();

// 5 rodadas
function playRaceEngine(playerA, playerB) {
  print(`🏁🚦 Corrida entre ${playerA.nome} e ${playerB.nome} começando...\n`);
  print(`${playerA.nome} contra ${playerB.nome}`);
  playerA.pontosTotal = 0;
  playerB.pontosTotal = 0;
  let roundExtra = 0;

  for (let round = 1; round <= 5; round++) {
    let draw = drawClue();

    print(`🏁 RODADA ${round + roundExtra}\nBloco: ${draw}\n`);
    const vencedor = returnWinner(playerA, playerB, draw);
    print(`🥊${vencedor.nome} venceu o confronto da ${round}ª rodada: `);

    //atribuindo pontuação
    if (vencedor.id === playerA.id) {
      playerA.pontosTotal++;
      if (playerB.pontosTotal != 0) {
        playerB.pontosTotal--;
        print(`${playerB.nome} perde 1 ponto.🐢`);
      }
    } else {
      playerB.pontosTotal++;
      if (playerA.pontosTotal != 0) {
        playerA.pontosTotal--;
        print(`${playerA.nome} perde 1 ponto.🐢`);
      }
    }

    print("--------------------------------------");
    //condição para desempate
    if (round == 5) {
      if (playerA.pontosTotal == playerB.pontosTotal) {
        print(`${playerA.nome} fez  ${playerA.pontosTotal} ponto(s).`);
        print(`${playerB.nome} fez  ${playerB.pontosTotal} ponto(s).`);
        round = 4;
        roundExtra++;
        print("RODADA DE DESEMPATE!!!");
      }
    }
  }
  print("****** Resultado final: ******");
  print(`${playerA.nome} fez ${playerA.pontosTotal} ponto(s).`);
  print(`${playerB.nome} fez ${playerB.pontosTotal} ponto(s).`);

  playerA.pontosTotal > playerB.pontosTotal
    ? print(`🏆 ${playerA.nome} venceu a corrida! Parabéns!🏆`)
    : print(`🏆 ${playerB.nome} venceu a corrida! Parabéns!🏆`);
}
