let types = {
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
                    answer : this.mainProperty.algoAnswersPlacement(),
                    charForAnswer : '%',
                };
            }
        }
    }, 
    App.types[nama-tipe].[nama-tipe-content].mainProperty = App.types.[nama-tipe-content].mainProperty;
    */
    'mainProperty' : {
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
        },
        addInAnswers : function (char){
            console.log(this)
        }
    },
    'aritmatika (bilangan bulat)' : {
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
            },
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
        },
        'persen' : {
            name : 'persen',
            caption : 'Cara menghitung presentase : nilai bagian / nilai total x 100 <br> Cara menghitung hasil persen: jumlah persen / 100 x jumlah total',
            questionFormat : (type, percent, number1, number2) => {
                if(type == 1){ //untuk keliling
                    return `${percent}% dari ${number1} adalah`
                }else{//untuk luas
                    return `${number2} berapa persennya ${number1}`
                }
            },
            createQuestion: function() {
                const percent = Math.floor(Math.random() * 100);
                const number1 = Math.floor(Math.random() * App.range);
                const number2 = Math.floor(Math.random() * App.range);

                const type = Math.round(Math.random() * 2);
                if(type == 1){ //tentukan hasil persen
                    App.trueAnswer = parseFloat(percent / 100 * number1).toFixed(3);
                }else{ //tentuknan presentase
                    App.trueAnswer = parseFloat(number2 / number1 * 100).toFixed(3);
                }
                let question = this.questionFormat(type, percent, number1,number2)
                
                return {
                    question,
                    charForAnswer : '%',
                    answer : this.mainProperty.algoAnswersPlacement()
                };
            }
        }
    },
    
    'aritmatika (bilangan desimal)' : {
        'mainProperty' : {
            createNumber : function() {
                const a = parseFloat(parseFloat(Math.random() * App.range).toFixed(1));
                const b = parseFloat(parseFloat(Math.random() * App.range).toFixed(1));
                return [a,b]
            },
            algoAnswersPlacement : function() {
                // Menentukan 3 angka terdekat (sebelum dan sesudah)
                const closestNumbers = [
                    App.trueAnswer - 2.1, 
                    App.trueAnswer, 
                    App.trueAnswer + 3.3, 
                    App.trueAnswer - 5.2, 
                ];

                // Mengacak urutan elemen dalam array
                for (let i = closestNumbers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [closestNumbers[i], closestNumbers[j]] = [closestNumbers[j], closestNumbers[i]];
                }
             
                return closestNumbers.slice(0, 4)
            },
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
        },
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

let mainProperty = {
    
}
