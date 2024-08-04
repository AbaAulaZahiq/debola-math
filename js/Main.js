import {ElementMethods} from './ElementMethods.js' 
import {App} from './App.js' 

// App.createQuizType()

document.addEventListener('click', function(e){
    let element = e.target
   
    ElementMethods.contains(element, 'play-btn').thenDo(function () {
        App.createQuizType()        
    })
    
    ElementMethods.contains(element, 'type-box').thenDo(function () {
        App.setType(element)
        App.createQuizRange()        
    })
	
	ElementMethods.contains(element, 'back-to-type-btn').thenDo(function () {
        App.createQuizType()        
    })
    
    
    ElementMethods.contains(element, 'range-box').thenDo(function () {
        App.setRange(element)        
        App.createPlayBar()        
        App.createReadyBar()        
    })

    ElementMethods.contains(element, 'back-to-range-btn').thenDo(function () {
        App.createQuizRange()        
    })
    
    ElementMethods.contains(element, 'ready-btn').thenDo(function () {
        App.createQuestionBar()        
    })
    
    ElementMethods.contains(element, 'stop-btn').thenDo(function () {
        App.createResultBar()        
    })
    
    ElementMethods.contains(element, 'replay-btn').thenDo(function () {
        App.createReadyBar()        
        App.endRound()
	
    })
    
    ElementMethods.contains(element, 'home-btn').thenDo(function () {
        App.createQuizType()    
        App.endGame()
    })

    ElementMethods.contains(element, 'radio-answer').thenDo(function () {
        App.checkAnswer(element)        
    })
})

document.addEventListener('keyup', (e) => {
    let key = e.key

    if (key == 1) {
        let element = document.querySelector('#radio-answer-1')
        App.checkAnswer(element)
    } else if(key == 2){
        let element = document.querySelector('#radio-answer-2')
        App.checkAnswer(element)
    } else if(key == 3){
        let element = document.querySelector('#radio-answer-3')
        App.checkAnswer(element)
    } else if(key == 4){
        let element = document.querySelector('#radio-answer-4')
        App.checkAnswer(element)
    }
})
