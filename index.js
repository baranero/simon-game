const buttonItem = document.querySelectorAll("button")
const titleItem = document.querySelector("h2")
const bodyItem = document.querySelector("body")
const numberOfButtons = buttonItem.length
let isGameStarted = false
let patternToRepeat = []
let patternToRepeatClicked = []
let numberOfClick = 0

for (let i = 0; i < numberOfButtons; i++) {
    buttonItem[i].addEventListener("click", function() {
        isGameStarted ? addSound(this.classList[0]) : null
        patternToRepeatClicked.push(buttonItem[i].classList[0])
        numberOfClick += 1
        if (checkIfMatchIsCorrect() == true) {
            firstStep()
            patternToRepeatClicked = []
            numberOfClick = 0
        } else {
            if (patternToRepeat[numberOfClick - 1] != patternToRepeatClicked[numberOfClick - 1]) {
                addSound()
                bodyItem.classList.add("game-over")
                setTimeout(function() {
                    bodyItem.classList.remove("game-over")}, 250)
                patternToRepeatClicked = []
                patternToRepeat = []
                numberOfClick = 0
                isGameStarted = false
                titleItem.textContent = `Game over! Press any key to restart`
            }
        }

        buttonItem[i].classList.add("choosen")
        setTimeout(function() {
            buttonItem[i].classList.remove("choosen")}, 150)
        })
        
    }

document.addEventListener("keydown", function(event) {
    startGame(event)
})

function addSound(key) {
    switch(key) {
        case "green":
            let greenBlock = new Audio("sounds/green.mp3")
            greenBlock.play()
            break
        case "red":
            let redBlock = new Audio("sounds/red.mp3")
            redBlock.play()
            break
        case "yellow":
            let yellowBlock = new Audio("sounds/yellow.mp3")
            yellowBlock.play()
            break
        case "blue":
            let blueBlock = new Audio("sounds/blue.mp3")
            blueBlock.play()
            break   
        default:
            let wrong = new Audio("sounds/wrong.mp3")
            wrong.play()
            break
    }
}

function startGame(event) {
    if (isGameStarted == false) {
        event.key ? isGameStarted = true : ""
        event.key ? titleItem.textContent = `Level ${patternToRepeat.length}` : ""
        firstStep()
    }  
}

function generateNumber() {
    randomBlock = Math.floor(Math.random() * numberOfButtons)
    return randomBlock
}

function displayGeneratedNumber() {
    setTimeout(function() {
        buttonItem[randomBlock].classList.add("choosen")
        addSound(buttonItem[randomBlock].classList[0])
        setTimeout(function() {
            buttonItem[randomBlock].classList.remove("choosen")}, 150)
    }, 500)
}

function addGeneratedBlocksToArray() {
    patternToRepeat.push(buttonItem[generateNumber()].classList[0])
}

function setLevel() {
    titleItem.textContent = `Level ${patternToRepeat.length}`
}

function firstStep() {
    generateNumber()
    addGeneratedBlocksToArray()
    displayGeneratedNumber()
    setLevel()
}

function checkIfMatchIsCorrect() {
    return Array.isArray(patternToRepeat) &&
        Array.isArray(patternToRepeatClicked) &&
        patternToRepeat.length === patternToRepeatClicked.length &&
        patternToRepeat.every((val, index) => val === patternToRepeatClicked[index])
}









