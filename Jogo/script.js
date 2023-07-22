let lugar = document.querySelector(".container")
let letra = document.querySelector(".filho")
let word = generationWord()
// Transforma o Htmlcollection em Lista
let listWord = Array.from(word)
let timeStop = false
let validartime = false
let letrasDescobertas = 0

chooseRandomWord(word)
fullLife()
//Gerar um bloco para cada letra
function chooseRandomWord(word) {
	let sizeWord = word.length
	let contadorP = 0
	while (sizeWord > 0) {
		let elementAdd = document.createElement("div")
		elementAdd.classList.add("letra")
		elementAdd.innerHTML = `<spaw class="letrinha${contadorP}">${word[contadorP]}</spaw>`
		contadorP++
		lugar.insertBefore(elementAdd, letra)
		//Diminui o tamanho da letra em -1
		--sizeWord
	}
}
// Gerar a palavra
function generationWord() {
	let words = ["MANGA",
		"LARANJA",
		"MORANGO",
		"ACEROLA",
		"COCO",
		"CARAMBOLA",
		"PITANGA",
		"JACA",
		"AMEIXA",
		"UVA",
		"ABACAXI",
		"MELANCIA",
		"BANANA",
		"MEXERICA"]
	let lengthRandom = Math.floor(Math.random()*words.length)
	let randomWord = words[lengthRandom]
	return randomWord
}
//Encontrar a letra escolhida
function findLetter(letra) {
	let validar = 0
}
//Sistema de vida
function loseLife() {
	//Retira uma vida e a deixa laranja
	let life = document.querySelector("#vida").textContent -= 1
	document.querySelector("#vida").style.color = "orange";
	//Se for menor que duas ele fica vermelha
	if (life < 2) {
		document.querySelector("#vida").style.color = "red";
	}
	//se for igual a zero vc...
	if (life <= 0) {
		lose()
		console.log("parou")
		//vida será 0,nada abaixo disso
		document.querySelector("#vida").textContent = 0
	}
}
let I = 1
document.querySelector(".letras").addEventListener("click", btn => {
	if (btn.target.nodeName === "BUTTON") {
		let c = 0
		let validar = 0
		for (el of listWord/*sem acento*/) {
			if (btn.target.id === el) {
				letrasDescobertas++
				document.querySelector(`.letrinha${c}`).style.display = "block";
				document.querySelector(`#${btn.target.id}`).style.background = "green";
			} else {
				validar += 1
			}
			c++
		}
		//fimlop
		if (letrasDescobertas === listWord.length) {
			//    validartime = true
			win()
			bt_disabled(true, false, "blue")
			validar = 0
			c = 0
		}
		if (validar === listWord.length) {
			loseLife()
			//Se n tiver fique red
			document.querySelector(`#${btn.target.id}`).style.background = "red"				 
		}
		//fimse
		if (I === 1) {
			time()
			I++
		}
	}
})
function bt_disabled(btL, btR, color) {
	//todos os botões de letras
	let listaBt = document.querySelectorAll(".bt")
	//Percorre todos os botões de letras e desabilita eles
	Array.from(listaBt).map((x) => {
		x.disabled = btL
	})
	//Butão restarte
	let bt = document.querySelector("#bt-restart")
	//Desabilitar Butão restarte/por uma cor
	bt.disabled = btR
	bt.style.background = color;
}
function time() {
	let sec1 = 5
	let sec2 = 10
	let min = 1
	//realiza interações a cada 1 segundo
	const timeSecond = setInterval(() => {
		//decrementa 1 de sec2
		sec2--
		//seleciona o campo segundo2 e adicione 10
		document.querySelector("#secondOne").textContent = sec2
		//seleciona o campo segundo1 e adicione 5
		document.querySelector("#secondTwo").textContent = sec1
		//seleciona o campo minuto e adiciona 01:00
		document.querySelector("#minute").textContent = ": 0"+min+":"
		//O TEMPO FICARÁ ASSIM 01:59 NA PRIMEIRA VEZ
		//Se tudo chegar em 0 então..
		if (min + sec1 + sec2 == 0) {
			//O contador é pausado
			clearInterval(timeSecond)
			alert("Acabou o tempo")
			//letras desativam, restarte ativa
			bt_disabled(true, false, "blue")
		}
		//Se validar tempo for true
		if (timeStop) {
			//desativa letral e para tempo
			bt_disabled(true, false, "blue")
			//O contador é pausado
			clearInterval(timeSecond)
			timeStop = false
		}
		//se segundos forem 00 e validação de tempo for false então retire 1 de minuto e resete os segundos para 00:59
		if ((sec1 + sec2 == 0) && (!validartime)) {
			min--
			sec1 = 5
			sec2 = 10

		} else {
			//se chegar em uma casa redonda, segundo1 perderá 1 e segundo2 retornará a 9
			if (sec2%10 == 0) {
				sec1--
				sec2 = 10
			}}
	},
		1000)//Repete isso a cada 1 segundo
}
//Enche as vidas até 3
function fullLife() {
	document.querySelector("#vida").textContent = 3
	document.querySelector("#vida").style.color = "green";
	document.querySelector("#vida").style.color = "green";
	document.querySelector("#vida").style.color = "green";
}
function restarte() {
	location.reload();
}
function win() {
	alert("Parabéns você ganhou ")
	//Letras desativam e restarte Ativar
	bt_disabled(true, false, "blue")
	timeStop = true
	document.querySelector(".container").style.border = "2px solid green";
}
function lose() {
	alert("Você perdeu")
	//Letras desativam e restarte Ativar
	bt_disabled(true, false, "blue")
	timeStop = true
}

