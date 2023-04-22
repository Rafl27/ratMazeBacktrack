function printaMatriz(matriz) {
	for (let i = 0; i < N; i++) {
		let row = "[";
		for (let j = 0; j < N; j++) {
			row += matriz[i][j];
			if (j < N - 1) {
				row += ", ";
			}
		}
		row += "]";
		console.log(row);
	}
}

//verifica se x e y estão dentro dos limites do labirinto (entre 0 e n - 1)
function verificarLimites(labirinto, x, y) {
	if (x < 0 || x >= N || y < 0 || y >= N || labirinto[x][y] !== 1) {
		return false; // (x, y) fora dos limites
	}
	else {
		return true; // (x, y) estao dentro dos limites
	}
}

function encontrarCaminho(labirinto) {
	let matrizSolucao = new Array(N);
	for (let i = 0; i < N; i++) {
		matrizSolucao[i] = new Array(N);
		for (let j = 0; j < N; j++) {
			matrizSolucao[i][j] = 0;
		}
	}

	if (backtracking(labirinto, 0, 0, matrizSolucao) == false) {
		console.log("Não foi possível encontrar uma saída ☠️");
		return false;
	}

	//encontrou so resta printar
	printaMatriz(matrizSolucao);
	return true;
}

function backtracking(labirinto, x, y, matrizSolucao) {
	//quando labirinto[n-1][n-1] for 1, quer dizer que chegamos na saida, entenda que o labirinto ja tem valores 1 por padrao, mas sempre que um caminho nao e a matrizSolucao, setamos o mesmo para 0 na linha 79.
	if (x == N - 1 && y == N - 1
		&& labirinto[x][y] == 1) {
		matrizSolucao[x][y] = 1;
		return true;
	}

	//primeiro verificamos se x e y são validos usando verificarLimites
	if (verificarLimites(labirinto, x, y) == true) {
		// [] = 1 quer dizer que e um caminho, se o mesmo já for 1 já passamos por ele e podemos ignorar
		if (matrizSolucao[x][y] == 1)
			return false;

		//X,Y se torna parte da solução
		matrizSolucao[x][y] = 1;

		//avancamos x + 1
		if (backtracking(labirinto, x + 1, y, matrizSolucao))
			return true;

		//se avancar + 1 em X nao da a matrizSolucao, fazemos o mesmo com Y
		if (backtracking(labirinto, x, y + 1, matrizSolucao))
			return true;

		//se ir pra frente nao funcionou nos dois, voltamos 1 em X
		if (backtracking(labirinto, x - 1, y, matrizSolucao))
			return true;

		//voltamos - 1 em Y tambem se X nao funcionar
		if (backtracking(labirinto, x, y - 1, matrizSolucao))
			return true;

		//se nenhum deles funcionar, o backtrack acontece, matrizSolucao[X][Y] que antes era = 1, agora sera = 0, para removermos o mesmo da matrizSolucao.
		matrizSolucao[x][y] = 0;
		return false;
	}

	//Nao foi possivel encontrar uma saida
	return false;
}


// Um rato deve chegar ao final deste labirinto, comecando de [0][0] e tendo de chegar em [n-1][n-1]
// Movimentos permitidos sao para frente e para baixo (por isso e usado X e Y, sendo X para frente e Y para baixo)
// 1 quer dizer que e um caminho possivel, nao podemos pisar no 0 
let labirinto = [
	[1, 0, 0, 0],
	[1, 1, 0, 1],
	[0, 1, 0, 0],
	[1, 1, 1, 1]
];

let N = labirinto.length;
console.log('---Labirinto---')
printaMatriz(labirinto)
console.log('\n')
console.log('---Resolvido---')
encontrarCaminho(labirinto);