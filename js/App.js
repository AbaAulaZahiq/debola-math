import {ElementMethods} from './ElementMethods.js' 

export class App{
	static amountQuestion = 1; //menghitung jumlah pertanyaan yang ditampilkan
	static trueQuestion = 0;
	static falseQuestion = 0;
	static trueAnswer = 0;
	static range = 0;
	static type = '';
 
	static inWrong = false;
	

	static bgColor = ['bg-primary', 'bg-warning', 'bg-danger', 'bg-success'];
	static indexOfBgColor = -1;
	static setBgColor = ()=> {
		let bgColor = ['bg-primary', 'bg-warning', 'bg-danger', 'bg-success'];

		this.indexOfBgColor++;
		if(this.indexOfBgColor == this.bgColor.length) this.indexOfBgColor = 0
		return bgColor[this.indexOfBgColor]
	}

	static createQuizType(){
		let types = ['penjumlahan', 'pengurangan', 'perkalian', 'pembagian']

		let container = `<div class="type">
			<h5 class='fw-bold'>Pilih Tipe Quiz</h5>
		` 

		types.forEach(t => {
			container += `
				<div class="type-box rounded-pill ${this.setBgColor()} us-none pointer bg-gradient bg-opacity-75 p-2 fw-bold text-white border-4 border my-3" value="${t}">${t}</div>
			`
		})

		container += '</div>'

		ElementMethods.getElement('nav').thenDo((el) => {el.style.display = 'block'})
		ElementMethods.getElement('footer').thenDo((el) => {el.style.display = 'block'})
		ElementMethods.getElement('.container-custom').set(container)
	}
	static createQuizRange(){
		let ranges = [10, 20, 50, 100, 200, 500, 800, 1000]

		let container = `<div class="range">
			<h5 class='fw-bold'>Pilih Range Quiz <p class="back-to-type-btn text-secondary f-15px">kembali</p></h5>
		`

		ranges.forEach(r => {
			container += `
				<div class="range-box rounded-pill ${this.setBgColor()} us-none pointer bg-gradient bg-opacity-75 card p-2 fw-bold text-white border-4 border my-3" value="${r}">Bilangan dari 0 - ${r}</div>
			`
		})

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

				<div class="center-center">			
					<button class="ready-btn bg-primary bg-gradient btn btn-primary mx-auto my-3 btn-lg rounded-pill" id="">Mulai Sekarang</button>
					<button class="back-to-range-btn btn text-secondary f-15px my-2 fw-bold">Kembali</button>			
    				</div>
			</div>
		`

		ElementMethods.getElement('.play-bar').set(container)
	}

	static createQuestionBar(){
		let data = this.createQuestion()

		let operator = null
		switch (this.type) {
			case 'penjumlahan':
				operator = '+';
				break;

			case 'pengurangan':
				operator = '-';
				break;
					
			case 'perkalian':
				operator = 'x';
				break;
				
			case 'pembagian':
				operator = ':';
				break;
		
			default:
				break;
		}

		let textFormat = data.fistNumber + ' ' + operator + ' ' + data.lastNumber

		let container = `
			<div class="question-bar">
				<div class="question-wrapper f-30px p-2 white my-2 between-center">
					<div class="question-box w-60pers">${textFormat} : </div>
					<div class="amount-of-question text-secondary f-20px w-40pers right">Soal Ke ${this.amountQuestion}</div>
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
	}
	static createResultBar(){
		let container = `
			<div class="result-bar">
				<h1 class="mb-3">Quiz Selesai</h1>
				<h5 class="fw-bold">Bermain quiz ${this.type}</h5>
				<h5 class="fw-bold mb-4">Dengan bilangan antara 0 - ${this.range}</h5>
    
    				<h5>Jumlah Soal : <span>${this.amountQuestion - 1 /* menampilkan pertanyaan yang dijawab */}</span></h5>
				<h5>Jawaban Benar : <span>${this.trueQuestion}</span></h5>
				<h5>Jawaban Salah : <span>${this.falseQuestion}</span></h5>

				<div class="column mt-3">					
					<button class="replay-btn bg-gradient btn btn-outline-primary mx-auto my-3 btn-lg rounded-pill">Mulai Lagi</button>
					<button class="home-btn bg-primary bg-gradient btn btn-primary mx-auto my-3 btn-lg rounded-pill">Ke Beranda</button>
				</div>
			</div>
		`	

		clearTimeout(this.inWrong)

		ElementMethods.getElement('.play-bar').set(container)
	}

	static createQuestion() {
		const a = Math.floor(Math.random() * this.range);
		const b = Math.floor(Math.random() * this.range);
		
		switch (this.type) {
			case 'penjumlahan':
				this.trueAnswer = a + b;
				break;

			case 'pengurangan':
				this.trueAnswer = a - b;
				break;
					
			case 'perkalian':
				this.trueAnswer = a * b;
				break;
				
			case 'pembagian':
				this.trueAnswer = a / b;
				break;
		
			default:
				break;
		}
 
		// Menentukan 3 angka terdekat (sebelum dan sesudah)
		const closestNumbers = [
			this.trueAnswer - 2, 
			this.trueAnswer, 
			this.trueAnswer + 3, 
			this.trueAnswer - 5, 
		];
	
		// Mengacak urutan elemen dalam array
		for (let i = closestNumbers.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[closestNumbers[i], closestNumbers[j]] = [closestNumbers[j], closestNumbers[i]];
		}
		
		// Mengambil 4 elemen secara acak dari array
		return {
			fistNumber : a,
			lastNumber : b,
			answer : closestNumbers.slice(0, 4)
		};
	}

	static checkAnswer(element){
		if(this.inWrong) return false // jika user berada di kondisi salah maka jangan biarkan menjawab soal

		let answer = element.getAttribute('value')
		this.amountQuestion += 1 //naikkan jumlah pertanyaan

		if(answer == this.trueAnswer){
			this.trueQuestion += 1
			this.createQuestionBar()
		}else{
			this.falseQuestion += 1
			ElementMethods.getElement('.wrong-answer-bar').set('Jawaban anda salah, jawaban yang benar adalah ' + this.trueAnswer + ' (tunggu 3 detik untuk soal berikutnya)')
			this.inWrong = true //masukkan user ke kondisi salah sehingga ia tidak bisa menjawab soal
			
			this.inWrong = setTimeout(() => {
				this.createQuestionBar()
				this.inWrong = false
			}, 3000)
		}
	}

	static setType(element){
		this.type = element.getAttribute('value')
	}
	static setRange(element){
		this.range = element.getAttribute('value')
	}

	static endGame(){
		this.amountQuestion = 0;
        this.trueQuestion = 0;
        this.falseQuestion = 0;
		this.trueAnswer = 0;
		this.range = 0;
		this.type = '';
	
		this.inWrong = false;
	}
	
	static endRound(){
		this.amountQuestion = 1;
        this.trueQuestion = 0;
        this.falseQuestion = 0;
		this.trueAnswer = 0;
	
		this.inWrong = false;
	}
}
