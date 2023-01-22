import jsonData from './world.geo.json-master/countries.geo.json' assert { type: "json" }

function pathClicked(e){
    console.log(e)
    if (e.properties.name == answer) {
        alert("win")
        score ++ 
        scoreDisplay.innerHTML = score
        generate()
    }
}
const shuffle = arr => [...arr].sort(() => 0.5 - Math.random());

var answer = ""
let prompt = document.getElementById("prompt")
let btn = document.getElementById('start')
let scoreDisplay = document.getElementById('score')
let skip = document.getElementById('skip')
let score = 0

btn.addEventListener('click',(e)=>{
    startGame()
    generate()
})

skip.addEventListener('click',(e)=>{
    generate()
})

var pays = new Array()
jsonData.features.forEach((item)=>{
    pays.push(item.properties.name)
})

function generate() {
    pays = shuffle(pays)
    answer = pays[0]
    prompt.innerHTML = answer
}

function startGame(){
    score = 0
    scoreDisplay.innerHTML = score
}

export {pathClicked}










