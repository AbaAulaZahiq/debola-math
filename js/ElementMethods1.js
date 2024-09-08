class NullElement {
    when(eventElement) {
        return this; // Mengembalikan diri sendiri untuk memungkinkan chaining
    }

    thenDo(callback) {
        return this; // Tidak melakukan apa-apa, hanya mengembalikan diri sendiri untuk chaining
    }
}

// export 
class ElementMethods{
    constructor(element) {
        this.element = element;
        this.event = null;  
    }

    //untuk mendapatkan elemen berdasarkan string selector
    static getElement(stringSelector) {
        const element = document.querySelector(stringSelector);
        
        if(!element) return new NullElement()

        return new ElementMethods(element); // Mengembalikan instance dari ElementsMethod untuk chaining
    }

    //untuk mendapatkan elemen berdasarkan string selector dan mengecek class 
    static contains(element, classTarget) {
        if(!element.classList.contains(classTarget)) return new NullElement()
        
        return new ElementMethods(element); // Mengembalikan instance dari ElementsMethod untuk chaining
    }

    //untuk memberikan event kepada element yang didapatkan dari method getElement
    when(eventElement) {
        this.event = eventElement; // Simpan event di instance
        if (this) {
            return this; // Mengembalikan instance untuk chaining
        }
    }

    //untuk memberikan tindakan  ketika element mendapatkan event
    thenDo(callback) {
        if (typeof callback === 'function') {
            if (this.event) {
                this.element.addEventListener(this.event, function () {
                    callback(this.element); // Memanggil callback dengan elemen yang ditemukan              
                })  
            } else {
                callback(this.element); // Memanggil callback dengan elemen yang ditemukan              
            }
        }
        return this; // Mengembalikan instance untuk melanjutkan chaining
    }

    set(value){
        this.element.innerHTML = value
        return this
    }

    static hide(stringSelector){
        document.querySelector(stringSelector).remove()
        return this
    }
}