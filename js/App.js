// import {ElementMethods} from './ElementMethods.js' 

// export 
class App{
	static amountQuestion = 1; ////menghitung jumlah pertanyaan yang tmapil
	static trueQuestion = 0;
	static falseQuestion = 0;
	static trueAnswer = 0;
	
	static player = 'single';
	static pointPlayers = {
		'player-1' : {
			trueQuestion : 0,
			falseQuestion : 0,
		}, 
		'player-2' : {
			trueQuestion : 0,
			falseQuestion : 0,
		}, 
	}
	static range = 0;
	static typeGroup = '';
	static type = '';
	static mode = false;
	static modeOption = false;
 
	static inCheck = false;

	
	
	
	static modes = {
		/* 'nama-mode' : {
			name : 'nama-mode',
			caption : 'keterangan dari mode',
			options : 'opsi dari mode',
			actionIfRight : () => {
				//tentukan aksi jikalau user menjawab benar pada mode ini				
			},
			actionRunning : () => {
				//tentukan aksi yang akan berjalan ketika pertanyaan sudah ditampilkan pada mode ini				
			},
		}, */
		'tak terbatas' : {
			name : 'tak terbatas',
			caption : 'Soal akan diberikan dengan jumlah tanpa batas.',
			captionInBox : false,
			options : false,
			actionIfRight : () => {
				this.createQuestionBar()				
			},
			actionIfWrong : () => {
				this.createQuestionBar()				
			},
			actionRunning : false
		},
		'soal terbatas' : {
			name : 'soal terbatas',
			caption : 'Soal akan diberikan dengan jumlah batas tertentu.',
			captionInBox : 'soal',
			options : [5,10,15,20,30,50,100,150,200,500],
			actionIfRight : () => {
				if(this.modeOption != (this.trueQuestion + this.falseQuestion)){
					this.createQuestionBar()
				}else{
					this.createResultBar()
				}				
			},
			actionIfWrong : () => {
				if(this.modeOption != (this.trueQuestion + this.falseQuestion)){
					this.createQuestionBar()
				}else{
					this.createResultBar()
				}			
			},
			actionRunning : false

		},
		'batas waktu' : {
			name : 'batas waktu',
			caption : 'Anda harus menjawab pertanyaan sebelum waktu habis atau quis akan berakhir.',
			captionInBox : 'detik',
			options : [5,10,15,20,30,50,100,150,200,500],
			time: false,
			actionIfRight : () => {
				clearInterval(this.time)
				this.createQuestionBar()
			},
			actionIfWrong : () => {
				clearInterval(this.time)
				this.createQuestionBar()
			},
			actionRunning : () => {
				let timePlace = document.querySelector('#time')
				let time = this.modeOption

				this.time = setInterval(() => {
					timePlace.innerHTML = '(' + time + ')' 
					time = time-1
					
					if(time == 0){
						this.createResultBar()
						clearInterval(this.time)
					}
				}, 1000);
			}

		}
	}

	static bgColor = ['bg-primary', 'bg-warning', 'bg-danger', 'bg-success'];
	static indexOfBgColor = -1;
	static setBgColor = ()=> {
		let bgColor = ['bg-primary', 'bg-warning', 'bg-danger', 'bg-success'];

		this.indexOfBgColor++;
		if(this.indexOfBgColor == this.bgColor.length) this.indexOfBgColor = 0
		return bgColor[this.indexOfBgColor]
	}

	static createHome(){
		let container = `<div class="home-bar w-85pers column">
			<h1 class="center f-50px">Debola <span class="text-warning">MATH</span> </h3></h1>
			<p class="text-secondary center">Aplikasi Quiz Matematika Sederhana Untuk Mengasah Otak</p>
			<button class="play-single btn text-light bg-primary bg-opacity-75 btn-lg mt-5 mb-2 rounded-pill shadow">Single Player</button>
			<button class="play-multi btn text-light bg-primary bg-opacity-75 btn-lg mb-5 rounded-pill shadow">Multi Player</button>
			<p class="text-secondary center mt-5">Copyright Aba Aula 2024</p>
		</div>`

        ElementMethods.getElement('.container-custom').set(container)
        ElementMethods.getElement('nav').thenDo((el) => {el.style.display = 'none'})
		ElementMethods.getElement('footer').thenDo((el) => {el.style.display = 'none'})
	}

	static createQuizType(player = 'single'){
		this.player = player //atur jumlah pemain

		let container = `<div class="type">
			<h5 class='fw-bold'>Pilih Tipe Quiz <p class="back-to-home text-secondary f-15px pointer">kembali</p></h5>
		` 

		for (const index in types) {
			const type = types[index];
			let group = ''
			if(index != 'mainProperty'){			
				const typeContent = types[index];
				for (const index2 in typeContent) {		
					if(index2 != 'mainProperty'){			
						group += `<div class="type-box rounded-pill ${this.setBgColor()} us-none pointer bg-gradient bg-opacity-75 p-2 fw-bold text-white border-4 border my-3" value="${index2}" valueGroup="${index}">${index2}</div>`
					}
				}
				
				container += `
					<h4 class="text-secondary m-p-0 mt-3 capitalize">${index}</h4>
					${group}
				`
			}
		}


		container += '</div>'

		ElementMethods.getElement('nav').thenDo((el) => {el.style.display = 'block'})
		ElementMethods.getElement('footer').thenDo((el) => {el.style.display = 'block'})
		ElementMethods.getElement('.container-custom').set(container)
	}
	static createQuizRange(){
		let ranges = [10, 20, 50, 100, 200, 500, 800, 1000]

		let container = `<div class="range">
			<h5 class='fw-bold'>Pilih Range Quiz <p class="back-to-type-btn text-secondary f-15px pointer">kembali</p></h5>
		`

		ranges.forEach(r => {
			container += `
				<div class="range-box rounded-pill ${this.setBgColor()} us-none pointer bg-gradient bg-opacity-75 card p-2 fw-bold text-white border-4 border my-3" value="${r}">Bilangan dari 0 - ${r}</div>
			`
		})

		container += '</div>'

		ElementMethods.getElement('.container-custom').set(container)
	}
	static createQuizMode(){
		let container = `<div class="range">
			<h5 class='fw-bold'>Pilih Mode Quiz <p class="back-to-range-btn text-secondary f-15px pointer">kembali</p></h5>
		`

		for (let index in this.modes) {
			let mode = this.modes[index]

			if (mode.options) {
				let group = ''
				let captionInBox = mode.captionInBox
				mode.options.forEach(e => {
					group += `<div class="mode-box ${this.setBgColor()} rounded-pill m-2 us-none pointer bg-gradient bg-opacity-75 p-2 fw-bold text-white border-4 border" value="${mode.name}" valueOption="${e}">${e} ${captionInBox}</div>`
				})
				container += `
					<details>
						<summary class="rounded-pill ${this.setBgColor()} us-none pointer bg-gradient bg-opacity-75 card p-2 fw-bold text-white border-4 border my-3">
							<p class="m-p-0 f-20px capitalize">${mode.name}</p>
							<p class="m-p-0">${mode.caption}</p>
						</summary>
						<p class="text-secondary">Pilih submode quiz</p>
						<div class="summary-container wrap-start">
							${group}
						</div>
					</details>
				`
			}else{
				container += `
					<div class="mode-box rounded-pill ${this.setBgColor()} us-none pointer bg-gradient bg-opacity-75 card p-2 fw-bold text-white border-4 border my-3" value="${mode.name}">
						<p class="mode-box m-p-0 f-20px capitalize" value="${mode.name}">${mode.name}</p>
						<p class="mode-box m-p-0" value="${mode.name}">${mode.caption}</p>
					</div>
				`
			}
			
		}

		container += '</div>'

		ElementMethods.getElement('.container-custom').set(container)
	}
	static createPlayBar(){
		let container = `
			<div class="play-bar w-100">			
				
			</div>
		`

		ElementMethods.getElement('.container-custom').set(container)
	}

	static createReadyBar(){
		let container = `
			<div class="ready-bar mt-5">			
				<h1 align="center" class="fw-bold">Kamu Sudah Siap?</h1>
				<h5 align="center" class="fw-bold text-secondary">Bermain quiz ${this.type}</h5>
				<h5 align="center" class="fw-bold text-secondary">Dengan bilangan antara 0 - ${this.range}</h5>
				<h5 align="center" class="fw-bold text-secondary">Di mode ${this.mode}</h5>

				<p class="center my-2">Tips : <br>${types[this.typeGroup][this.type].caption? types[this.typeGroup][this.type].caption : '-'}</p>

				<div class="column">			
					<button class="ready-btn bg-primary bg-gradient btn btn-primary mx-auto my-3 btn-lg rounded-pill" id="">Mulai Sekarang</button>
					<button class="back-to-mode-btn btn text-secondary f-15px my-2 fw-bold">Kembali</button>
				</div>
			</div>
		`

		ElementMethods.getElement('.play-bar').set(container)
	}

	static createQuestionBar(){
		let data = types[this.typeGroup][this.type].createQuestion()
		
		let amountQuestionBar = this.player == 'multi' ? 2 : 1
		let width = this.player == 'multi' ? 'w-45pers' : 'w-100'
		let playerPointBar = ''

		let container = `<div class="container-question-bar">
			<div class="question-wrapper f-30px p-2 white my-2 between-center">
				<div class="question-box w-60pers">${data.question} : </div>
				<div class="amount-of-question text-secondary f-20px w-40pers right">Soal Ke ${this.trueQuestion + this.falseQuestion + 1} <div id="time"></div></div>
			</div>
		`
		let box = ''
		let answerBoxs = ''
		let list = ['A', 'B', 'C', 'D']
		let number = 0
		let listOfKey = [['1', '2', '3', '4'], ['H', 'J', 'K', 'L']]

		for (let index = 1; index <= amountQuestionBar; index++) {
			if(this.player == 'multi'){
				playerPointBar = `<div class="poin-bar f-20px p-2 white my-2 between-center">
					<div class="question-box w-60pers">Player ${index}</div>
					<div class="player-point text-secondary f-20px w-40pers right" id="player-point-${index}">${this.pointPlayers['player-' + (index)].trueQuestion}</div>
				</div>	`
			}
			for (let index2 = 0; index2 < 4; index2++) {
				answerBoxs += `<div class="radio-answer between-center p-3 fw-bold rounded-pill my-2 border-4 border" id="radio-answer-${number}" user="player-${index}" value="${data.answer[index2]}">
							<p class="radio-answer w-80pers m-p-0" user="player-${index}" value="${data.answer[index2]}">${list[index2]}. ${data.answer[index2]} ${data.charForAnswer ?? ''}</p>
							<p class="text-secondary f-15px right w-20pers m-p-0" user="player-${index}" value="${data.answer[index2]}">Ketik ${listOfKey[index-1][index2]}</p>
						</div>`
				number++
			}
			box += `
				<div class="question-bar ${width}">	
					${playerPointBar}
					<div class="answers-bar  p-2 white my-2">
						${answerBoxs}
					</div>												
				</div>						
			`

			answerBoxs = ''
		}
		container += `
			<div class="wrapper-question between-center">
				${box}
			</div>
			<div class="wrong-answer-bar border-danger rounded p-2"></div>	
			<button class="stop-btn bg-danger bg-gradient btn btn-danger mx-auto my-3 btn-lg rounded-pill">Hentikan</button>
			<div class="tips-bar text-secondary p-2">Tips: jika anda menggunakan komputer / laptop, anda bisa memilih jawaban menggunakan key yang tersedia pada masing masing jawaban</div>	
			`
		ElementMethods.getElement('.play-bar').set(container)

		if(this.modes[this.mode].actionRunning){
			this.modes[this.mode].actionRunning() //lakukan aksi berdasarkanmode yang dipilih
		}
	}
	static createResultBar(){
		clearTimeout(this.inCheck)

		let playerPointBar = ``
		if(this.player == 'multi'){
			let amountQuestion = function (pointPlayers){
				let a = pointPlayers['player-1'].trueQuestion 
				let b = pointPlayers['player-1'].falseQuestion 
				let c = pointPlayers['player-2'].trueQuestion 
				let d = pointPlayers['player-2'].falseQuestion 
				return a + b + c + d
			}
			playerPointBar = `<h5>Jumlah Soal : <span>${amountQuestion(this.pointPlayers)}</span></h5>`
			for (let index = 0; index < 2; index++) {
				playerPointBar += `<h4 class="mt-2">Player ${index + 1}</h4>
					<h5>Jawaban Benar : <span>${this.pointPlayers['player-' + (index + 1)].trueQuestion}</span></h5>
					<h5>Jawaban Salah : <span>${this.pointPlayers['player-' + (index + 1)].falseQuestion}</span></h5>`		
			}			
		}else{
			playerPointBar = `<h5>Jumlah Soal : <span>${this.trueQuestion + this.falseQuestion}</span></h5>
				<h5>Jawaban Benar : <span>${this.trueQuestion}</span></h5>
				<h5>Jawaban Salah : <span>${this.falseQuestion}</span></h5>`
		}
		let container = `
			<div class="result-bar">
				<h1 class="mb-3">Quiz Selesai</h1>
				<h5 class="fw-bold">Bermain quiz ${this.type}</h5>
				<h5 class="fw-bold">Dengan bilangan antara 0 - ${this.range}</h5>
				<h5 class="fw-bold mb-4">Di mode ${this.mode}</h5>

				${playerPointBar}

				<div class="between-center mt-3">					
					<button class="replay-btn bg-gradient btn btn-outline-primary mx-auto my-3 btn-lg rounded-pill">Mulai Lagi</button>
					<button class="home-btn bg-primary bg-gradient btn btn-primary mx-auto my-3 btn-lg rounded-pill">Ke Beranda</button>
				</div>
			</div>
		`	


		ElementMethods.getElement('.play-bar').set(container)
	}

	static checkAnswer(element){
		if(this.inCheck) return false // jika user berada di kondisi salah maka jangan biarkan menjawab soal

		let answer = element.getAttribute('value')
		
		if(answer == this.trueAnswer){
			if(this.player == 'multi'){
				this.inCheck = true //masukkan user ke kondisi pengecekan sehingga ia tidak bisa menjawab soal
				element.style.background = '#3eb848'

				//jika user benar maka cek user mana yang salah
				let whoAnswer = element.getAttribute('user')
				this.pointPlayers[whoAnswer].trueQuestion += 1
			
				setTimeout(() => {
					this.modes[this.mode].actionIfRight() //lakukan aksi berdasarkanmode yang dipilih
					this.inCheck = false
			}, 1000)
			}else{
				this.trueQuestion += 1
				this.modes[this.mode].actionIfRight() //lakukan aksi berdasarkanmode yang dipilih
			}
		}else{
			this.falseQuestion += 1
			ElementMethods.getElement('.wrong-answer-bar').set('Jawaban anda salah, jawaban yang benar adalah ' + this.trueAnswer + ' (tunggu 3 detik untuk soal berikutnya)')
			this.inCheck = true //masukkan user ke kondisi pengecekan sehingga ia tidak bisa menjawab soal
			element.style.background = '#e07474'

			//jika user salah ketika main multi player maka cek user mana yang salah
			if (this.player == 'multi') {
				let whoAnswer = element.getAttribute('user')
				this.pointPlayers[whoAnswer].falseQuestion += 1
		
			}
						
			this.inCheck = setTimeout(() => {
				this.modes[this.mode].actionIfWrong() //lakukan aksi berdasarkanmode yang dipilih
				this.inCheck = false
			}, 3000)
		}
	}

	static setType(element){
		this.type = element.getAttribute('value')
		this.typeGroup = element.getAttribute('valueGroup');
	}
	static setRange(element){
		this.range = element.getAttribute('value')
	}
	static setMode(element){
		this.mode = element.getAttribute('value')
		if(this.modes[this.mode].options){
			this.modeOption = element.getAttribute('valueOption')
		}
	}

	//utnuk "pergi ke beranda"
	static endGame(){
		this.amountQuestion = 1; 
        this.trueQuestion = 0;
        this.falseQuestion = 0;
		this.trueAnswer = 0;
		this.range = 0;
		this.type = '';
		this.typeGroup = '';

		this.pointPlayers = {
			'player-1' : {
				trueQuestion : 0,
				falseQuestion : 0,
			}, 
			'player-2' : {
				trueQuestion : 0,
				falseQuestion : 0,
			}, 
		}
		this.inCheck = false;
	}
	
	//utnuk "main lagi"
	static endRound(){
		this.amountQuestion = 1;
        	this.trueQuestion = 0;
        	this.falseQuestion = 0;
		this.trueAnswer = 0;

		this.pointPlayers = {
			'player-1' : {
				trueQuestion : 0,
				falseQuestion : 0,
			}, 
			'player-2' : {
				trueQuestion : 0,
				falseQuestion : 0,
			}, 
		}
	
		this.inCheck = false;
	}
}

// Menghubungkan objek mainProperty ke objek penjumlahan dan pengurangan
types['aritmatika (bilangan bulat)'].penjumlahan.mainProperty = types['aritmatika (bilangan bulat)'].mainProperty;
types['aritmatika (bilangan bulat)'].pengurangan.mainProperty = types['aritmatika (bilangan bulat)'].mainProperty;
types['aritmatika (bilangan bulat)'].perkalian.mainProperty = types['aritmatika (bilangan bulat)'].mainProperty;
types['aritmatika (bilangan bulat)'].pembagian.mainProperty = types['aritmatika (bilangan bulat)'].mainProperty;
types['aritmatika (bilangan bulat)'].persen.mainProperty = types['aritmatika (bilangan bulat)'].mainProperty;

types['aritmatika (bilangan desimal)'].penjumlahan.mainProperty = types['aritmatika (bilangan desimal)'].mainProperty;
types['aritmatika (bilangan desimal)'].pengurangan.mainProperty = types['aritmatika (bilangan desimal)'].mainProperty;
types['aritmatika (bilangan desimal)'].perkalian.mainProperty = types['aritmatika (bilangan desimal)'].mainProperty;
types['aritmatika (bilangan desimal)'].pembagian.mainProperty = types['aritmatika (bilangan desimal)'].mainProperty;

types.geometri.persegi.mainProperty = types.mainProperty;
types.geometri.lingkaran.mainProperty = types.mainProperty;
types.geometri.segitiga.mainProperty = types.mainProperty;
types.geometri.trapesium.mainProperty = types.mainProperty;
types.geometri['persegi panjang'].mainProperty = types.mainProperty;
types.geometri['jajar genjang'].mainProperty = types.mainProperty;
