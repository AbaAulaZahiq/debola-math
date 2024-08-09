import {ElementMethods} from './ElementMethods.js' 

export class App{
	static amountQuestion = 1; ////menghitung jumlah pertanyaan yang tmapil
	static trueQuestion = 0;
	static falseQuestion = 0;
	static trueAnswer = 0;

	static range = 0;
	static typeGroup = '';
	static type = '';
	static mode = false;
	static modeOption = false;
 
	static inWrong = false;

	static types = {
		/* 'nama-tipe' : {
			'mainProperty : properti atau function yang digunakan oleh banyak preperti lain
			'nama-tipe-content' : {
				name : 'penjumlahan',
				questionFormat : (a, b) => {
					return `${a} + ${b}`
				},
				createQuestion: function() {
					let [a,b] = this.mainProperty.createNumber()
					App.trueAnswer = a + b;
					
					return {
						question : this.questionFormat(a, b),
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			}
		}, 
		App.types[nama-tipe].[nama-tipe-content].mainProperty = App.types.[nama-tipe-content].mainProperty;
		*/
		mainProperty : {
			algoAnswersPlacement : function() {
				// Menentukan 3 angka terdekat (sebelum dan sesudah)
				const closestNumbers = [
					App.trueAnswer - 2, 
					App.trueAnswer, 
					App.trueAnswer + 3, 
					App.trueAnswer - 5, 
				];

				// Mengacak urutan elemen dalam array
				for (let i = closestNumbers.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[closestNumbers[i], closestNumbers[j]] = [closestNumbers[j], closestNumbers[i]];
				}

				return closestNumbers.slice(0, 4)
			}
		},
		'aritmatika' : {
			'mainProperty' : {
				createNumber : function() {
					const a = Math.floor(Math.random() * App.range);
					const b = Math.floor(Math.random() * App.range);
					return [a,b]
				},
				algoAnswersPlacement : function() {
					// Menentukan 3 angka terdekat (sebelum dan sesudah)
					const closestNumbers = [
						App.trueAnswer - 2, 
						App.trueAnswer, 
						App.trueAnswer + 3, 
						App.trueAnswer - 5, 
					];

					// Mengacak urutan elemen dalam array
					for (let i = closestNumbers.length - 1; i > 0; i--) {
						const j = Math.floor(Math.random() * (i + 1));
						[closestNumbers[i], closestNumbers[j]] = [closestNumbers[j], closestNumbers[i]];
					}

					return closestNumbers.slice(0, 4)
				}
			},
			'penjumlahan' : {
				name : 'penjumlahan',
				questionFormat : (a, b) => {
					return `${a} + ${b}`
				},
				createQuestion: function() {
					let [a,b] = this.mainProperty.createNumber();
					App.trueAnswer = a + b;
					
					return {
						question : this.questionFormat(a, b),
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			},
			'pengurangan' : {
				name : 'pengurangan',
				questionFormat : (a, b) => {
					return `${a} - ${b}`
				},
				createQuestion: function() {
					let [a,b] = this.mainProperty.createNumber()
					App.trueAnswer = a - b;
					
					return {
						question : this.questionFormat(a, b),
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			},
			'perkalian' : {
				name : 'perkalian',
				questionFormat : (a, b) => {
					return `${a} x ${b}`
				},
				createQuestion: function() {
					let [a,b] = this.mainProperty.createNumber()
					App.trueAnswer = a * b;
					
					return {
						question : this.questionFormat(a, b),
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			},
			'pembagian' : {
				name : 'pembagian',
				questionFormat : (a, b) => {
					return `${a} : ${b}`
				},
				createQuestion: function() {
					let [a,b] = this.mainProperty.createNumber()
					App.trueAnswer =  parseFloat(( a / b ).toFixed(3));
					
					return {
						question : this.questionFormat(a, b),
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			}
		},
		'geometri' : {
			'persegi' : {
				name : 'persegi',
				caption : 'Cara menghitung luas : sisi x sisi <br> Cara menghitung keliling : sisi x 4',
				questionFormat : (type, s) => {
					if(type == 1){ //untuk keliling
						return `Jika sebuah persegi memiliki panjang sisi ${s}, berapakah kelilingnya`
					}else{//untuk luas
						return `Jika sebuah persegi memiliki panjang sisi ${s}, berapakah luasnya`
					}
				},
				createQuestion: function() {
					const s = Math.floor(Math.random() * App.range);

					const type = Math.round(Math.random() * 2);
					if(type == 1){ //tentukan keliling
						App.trueAnswer = s * 4;
					}else{ //tentuknan luas
						App.trueAnswer = s**2;
					}
					let question = this.questionFormat(type, s)
					
					return {
						question,
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			},
			'persegi panjang' : {
				name : 'persegi panjang',
				caption : 'Cara menghitung luas : panjang x lebar <br> Cara menghitung keliling : 2 x (panjang x lebar)',
				questionFormat : (type, p,l) => {
					if(type == 1){ //untuk keliling
						return `Jika sebuah persegi panjang memiliki panjang ${p} dan lebar ${l}, berapakah kelilingnya`
					}else{//untuk luas
						return `Jika sebuah persegi panjang memiliki panjang ${p} dan lebar ${l}, berapakah luasnya`
					}
				},
				createQuestion: function() {
					const p = Math.floor(Math.random() * App.range);
					const l = Math.floor(Math.random() * App.range);

					const type = Math.round(Math.random() * 2);
					if(type == 1){ //tentukan keliling
						App.trueAnswer = 2 * (p + l);
					}else{ //tentuknan luas
						App.trueAnswer = p*l;
					}
					let question = this.questionFormat(type, p,l)
					
					return {
						question,
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			},
			'lingkaran' : {
				name : 'lingkaran',
				caption : 'Cara menghitung luas : 3,14 x jari-jari x 2 <br> Cara menghitung keliling : 2 x 3,14 x jari-jari x 2',
				questionFormat : (type, r) => {
					if(type == 1){ //untuk keliling
						return `Jika sebuah lingkaran memiliki jari-jari ${r}, berapakah kelilingnya`
					}else{//untuk luas
						return `Jika sebuah lingkaran memiliki jari-jari ${r}, berapakah luasnya`
					}
				},
				createQuestion: function() {
					const r = Math.floor(Math.random() * App.range);
				
					const type = Math.round(Math.random() * 2);
					const phi = 3.14
					if(type == 1){ //tentukan keliling
						App.trueAnswer = parseFloat((2 * phi * r * r).toFixed(3));
					}else{ //tentuknan luas
						App.trueAnswer = parseFloat(( phi * r * r ).toFixed(3));
					}
					let question = this.questionFormat(type, r)
					
					return {
						question,
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			},
			'jajar genjang' : {
				name : 'jajar genjang',
				caption : 'Cara menghitung luas : alas x tinggi <br> Cara menghitung keliling : 2 x (alas + tinggi)',
				questionFormat : (type, a, t) => {
					if(type == 1){ //untuk keliling
						return `Jika sebuah jajar genjang memiliki alas ${a} dan tinggi ${t}, berapakah kelilingnya`
					}else{//untuk luas
						return `Jika sebuah jajar genjang memiliki alas ${a} dan tinggi ${t}, berapakah luasnya`
					}
				},
				createQuestion: function() {
					const type = Math.round(Math.random() * 2);
					
					const a = Math.floor(Math.random() * App.range);
					const b = Math.floor(Math.random() * App.range);
					if(type == 1){ //tentukan keliling
						App.trueAnswer = 2*(a+b);
					}else{ //tentuknan luas
						App.trueAnswer = a * b;
					}
					let question = this.questionFormat(type, a,b)
					
					return {
						question,
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			},
			'segitiga' : {
				name : 'segitiga',
				caption : 'Cara menghitung luas : 1/2 x alas x tinggi <br> Cara menghitung keliling : sisi a + b + c',
				// disini saya menggunakan parameter params karena keliling dan luas punya variabel yang berbeda
				questionFormat : (type, params1, params2, params3) => {
					if(type == 1){ //untuk keliling
						return `Jika sebuah segitiga memiliki sisi a = ${params1}, sisi b = ${params2} dan sisi c = ${params3}, berapakah kelilingnya`
					}else{//untuk luas
						return `Jika sebuah segitiga memiliki alas ${params1} dan tinggi ${params2}, berapakah luasnya`
					}
				},
				createQuestion: function() {
					const type = Math.round(Math.random() * 2);
					let question
					if(type == 1){ //tentukan keliling
						const a = Math.floor(Math.random() * App.range);
						const b = Math.floor(Math.random() * App.range);
						const c = Math.floor(Math.random() * App.range);
						App.trueAnswer = a + b + c;
						question = this.questionFormat(type, a,b,c)
					}else{ //tentuknan luas
						const t = Math.floor(Math.random() * App.range);
						const a = Math.floor(Math.random() * App.range);				
						App.trueAnswer = 0.5 * a * t;
						question = this.questionFormat(type, a,t)
					}
					
					return {
						question,
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			},
			'trapesium' : {
				name : 'trapesium',
				caption : 'Cara menghitung luas : 1/2 x (sisi a + b) x tinggi <br> Cara menghitung keliling : sisi a + b + c +d',
				// disini saya menggunakan parameter params karena keliling dan luas punya variabel / rumus yang berbeda
				questionFormat : (type, params1, params2, params3, params4) => {
					if(type == 1){ //untuk keliling
						return `Jika sebuah trapesium memiliki sejajar a = ${params1} dan b = ${params2}, dan  dua sisi c = ${params3} dan d = ${params4}, berapakah kelilingnya`
					}else{//untuk luas
						return `Jika sebuah trapesium memiliki sisi sejajar atas a = ${params1}, sisi sejajar bawah b = ${params2} dan sisi tinggi c = ${params3}, berapakah luasnya`
					}
				},
				createQuestion: function() {
					const type = Math.round(Math.random() * 2);
					let question
					if(type == 1){ //tentukan keliling
						const a = Math.floor(Math.random() * App.range);
						const b = Math.floor(Math.random() * App.range);
						const c = Math.floor(Math.random() * App.range);
						const d = Math.floor(Math.random() * App.range);
						App.trueAnswer = a + b + c + d;
						question = this.questionFormat(type, a,b,c,d)
					}else{ //tentuknan luas
						const t = Math.floor(Math.random() * App.range);
						const b = Math.floor(Math.random() * App.range);
						const a = Math.floor(Math.random() * App.range);				
						App.trueAnswer = 0.5 * (a+b) * t;
						question = this.questionFormat(type, a,t,b)
					}
					
					return {
						question,
						answer : this.mainProperty.algoAnswersPlacement()
					};
				}
			},
			'campuran' : {
				name : 'campuran',
				createQuestion : function() {
					let geometri = ['persegi', 'persegi panjang', 'lingkaran', 'segitiga', 'trapesium', 'jajar genjang']
					let index = Math.floor(Math.random() * (geometri.length - 1))
					let {question : question, answer : answer} = App.types[App.typeGroup][geometri[index]].createQuestion()
					
					return {question, answer};
				}
			}
		}
	}
	
	
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

	static createQuizType(){
		let container = `<div class="type">
			<h5 class='fw-bold'>Pilih Tipe Quiz</h5>
		` 

		for (const index in this.types) {
			const type = this.types[index];
			let group = ''
			if(index != 'mainProperty'){			
				const typeContent = this.types[index];
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
			<div class="play-bar">			
				
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

				<p class="center my-2">Tips : <br>${this.types[this.typeGroup][this.type].caption? this.types[this.typeGroup][this.type].caption : '-'}</p>

				<div class="column">			
					<button class="ready-btn bg-primary bg-gradient btn btn-primary mx-auto my-3 btn-lg rounded-pill" id="">Mulai Sekarang</button>
					<button class="back-to-mode-btn btn text-secondary f-15px my-2 fw-bold">Kembali</button>
				</div>
			</div>
		`

		ElementMethods.getElement('.play-bar').set(container)
	}

	static createQuestionBar(){
		let data = this.types[this.typeGroup][this.type].createQuestion()
		let container = `
			<div class="question-bar">
				<div class="question-wrapper f-30px p-2 white my-2 between-center">
					<div class="question-box w-60pers">${data.question} : </div>
					<div class="amount-of-question text-secondary f-20px w-40pers right">Soal Ke ${this.trueQuestion + this.falseQuestion + 1} <div id="time"></div></div>
				</div>

				<div class="answers-bar  p-2 white my-2">
					<div class="radio-answer between-center p-3 fw-bold rounded-pill my-2 border-4 border" id="radio-answer-1" value="${data.answer[0]}">
						<p class="radio-answer w-80pers m-p-0" value="${data.answer[0]}">A. ${data.answer[0]}</p>
						<p class="radio-answer w-20pers m-p-0 text-secondary" value="${data.answer[0]}">Klik 1</p>
					</div>
					<div class="radio-answer between-center p-3 fw-bold rounded-pill my-2 border-4 border" id="radio-answer-2" value="${data.answer[1]}">
						<p class="radio-answer w-80pers m-p-0" value="${data.answer[1]}">B. ${data.answer[1]}</p>
						<p class="radio-answer w-20pers m-p-0 text-secondary" value="${data.answer[1]}">Klik 2</p>
					</div>
					<div class="radio-answer between-center p-3 fw-bold rounded-pill my-2 border-4 border" id="radio-answer-3" value="${data.answer[2]}">
						<p class="radio-answer w-80pers m-p-0" value="${data.answer[2]}">C. ${data.answer[2]}</p>
						<p class="radio-answer w-20pers m-p-0 text-secondary" value="${data.answer[2]}">Klik 3</p>
					</div>
					<div class="radio-answer between-center p-3 fw-bold rounded-pill my-2 border-4 border" id="radio-answer-4" value="${data.answer[3]}">
						<p class="radio-answer w-80pers m-p-0" value="${data.answer[3]}">D. ${data.answer[3]}</p>
						<p class="radio-answer w-20pers m-p-0 text-secondary" value="${data.answer[3]}">Klik 4</p>
					</div>

					<button class="stop-btn bg-danger bg-gradient btn btn-danger mx-auto my-3 btn-lg rounded-pill">Hentikan</button>
				</div>
				
				<div class="wrong-answer-bar border-danger rounded p-2"></div>
				
			</div>
		`

		ElementMethods.getElement('.play-bar').set(container)

		if(this.modes[this.mode].actionRunning){
			this.modes[this.mode].actionRunning() //lakukan aksi berdasarkanmode yang dipilih
		}
	}
	static createResultBar(){
		let container = `
			<div class="result-bar">
				<h1 class="mb-3">Quiz Selesai</h1>
				<h5 class="fw-bold">Bermain quiz ${this.type}</h5>
				<h5 class="fw-bold">Dengan bilangan antara 0 - ${this.range}</h5>
				<h5 class="fw-bold mb-4">Di mode ${this.mode}</h5>

				<h5>Jumlah Soal : <span>${this.trueQuestion + this.falseQuestion}</span></h5>
				<h5>Jawaban Benar : <span>${this.trueQuestion}</span></h5>
				<h5>Jawaban Salah : <span>${this.falseQuestion}</span></h5>

				<div class="between-center mt-3">					
					<button class="replay-btn bg-gradient btn btn-outline-primary mx-auto my-3 btn-lg rounded-pill">Mulai Lagi</button>
					<button class="home-btn bg-primary bg-gradient btn btn-primary mx-auto my-3 btn-lg rounded-pill">Ke Beranda</button>
				</div>
			</div>
		`	

		clearTimeout(this.inWrong)

		ElementMethods.getElement('.play-bar').set(container)
	}

	static checkAnswer(element){
		if(this.inWrong) return false // jika user berada di kondisi salah maka jangan biarkan menjawab soal

		let answer = element.getAttribute('value')
		
		if(answer == this.trueAnswer){
			this.trueQuestion += 1
			this.modes[this.mode].actionIfRight() //lakukan aksi berdasarkanmode yang dipilih
		}else{
			this.falseQuestion += 1
			ElementMethods.getElement('.wrong-answer-bar').set('Jawaban anda salah, jawaban yang benar adalah ' + this.trueAnswer + ' (tunggu 3 detik untuk soal berikutnya)')
			this.inWrong = true //masukkan user ke kondisi salah sehingga ia tidak bisa menjawab soal
						
			this.inWrong = setTimeout(() => {
				this.modes[this.mode].actionIfWrong() //lakukan aksi berdasarkanmode yang dipilih
				this.inWrong = false
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
	
		this.inWrong = false;
	}
	
	//utnuk "main lagi"
	static endRound(){
		this.amountQuestion = 1;
        this.trueQuestion = 0;
        this.falseQuestion = 0;
		this.trueAnswer = 0;
	
		this.inWrong = false;
	}
}

// Menghubungkan objek mainProperty ke objek penjumlahan dan pengurangan
App.types.aritmatika.penjumlahan.mainProperty = App.types.aritmatika.mainProperty;
App.types.aritmatika.pengurangan.mainProperty = App.types.aritmatika.mainProperty;
App.types.aritmatika.perkalian.mainProperty = App.types.aritmatika.mainProperty;
App.types.aritmatika.pembagian.mainProperty = App.types.aritmatika.mainProperty;

App.types.geometri.persegi.mainProperty = App.types.mainProperty;
App.types.geometri.lingkaran.mainProperty = App.types.mainProperty;
App.types.geometri.segitiga.mainProperty = App.types.mainProperty;
App.types.geometri.trapesium.mainProperty = App.types.mainProperty;
App.types.geometri['persegi panjang'].mainProperty = App.types.mainProperty;
App.types.geometri['jajar genjang'].mainProperty = App.types.mainProperty;
